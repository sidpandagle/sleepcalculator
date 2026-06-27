#!/usr/bin/env node
/**
 * SEO drift baseline tool.
 *
 * Usage:
 *   node scripts/drift-baseline.mjs              — capture a new snapshot
 *   node scripts/drift-baseline.mjs --compare    — compare live site vs. latest snapshot
 *   node scripts/drift-baseline.mjs --url <url>  — snapshot a single URL
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_DIR = path.join(__dirname, "drift-snapshots");
const BASE_URL = "https://sleepschedule.in";

const STATIC_URLS = [
  "/",
  "/nap-calculator",
  "/sleep-duration-calculator",
  "/sleep-debt-calculator",
  "/rem-sleep-calculator",
  "/pregnancy-sleep-calculator",
  "/baby-sleep-calculator",
  "/about",
  "/blog",
  "/terms",
  "/contact",
];

// One representative from each programmatic group
const SAMPLE_PROGRAMMATIC = [
  "/sleep-calculator/7am-wakeup",
  "/sleep-debt-calculator/6h-sleep",
  "/rem-sleep-calculator/7h",
  "/pregnancy-sleep-calculator/first-trimester",
  "/baby-sleep-calculator/3-months",
  "/sleep-duration-calculator/adult",
];

const ALL_URLS = [...STATIC_URLS, ...SAMPLE_PROGRAMMATIC];

function extract(html, pattern, group = 1) {
  const m = html.match(pattern);
  return m ? m[group].trim() : null;
}

async function snapshotUrl(url) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  let status, html;
  try {
    const res = await fetch(fullUrl, {
      headers: { "User-Agent": "SleepSchedule-DriftBot/1.0" },
      redirect: "follow",
    });
    status = res.status;
    html = await res.text();
  } catch (e) {
    return { url: fullUrl, error: e.message };
  }

  const title = extract(html, /<title[^>]*>([^<]+)<\/title>/i);
  const description = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    ?? extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const h1 = extract(html, /<h1[^>]*>([^<]+)<\/h1>/i);
  const canonical = extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    ?? extract(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const robots = extract(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
    ?? extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i)
    ?? "index, follow";
  const ogTitle = extract(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
    ?? extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
  const ogDescription = extract(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
    ?? extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i);
  const ogUrl = extract(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i)
    ?? extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["']/i);
  const ogImage = extract(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    ?? extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

  const ldTypes = [...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);

  return {
    url: fullUrl,
    capturedAt: new Date().toISOString(),
    status,
    title,
    description,
    h1,
    canonical,
    robots,
    og: { title: ogTitle, description: ogDescription, url: ogUrl, image: ogImage },
    structuredDataTypes: [...new Set(ldTypes)],
  };
}

function diff(baseline, live) {
  const changes = [];
  const fields = ["status", "title", "description", "h1", "canonical", "robots"];
  for (const f of fields) {
    if (baseline[f] !== live[f]) {
      changes.push({ field: f, was: baseline[f], now: live[f] });
    }
  }
  for (const f of ["title", "description", "url", "image"]) {
    if (baseline.og?.[f] !== live.og?.[f]) {
      changes.push({ field: `og.${f}`, was: baseline.og?.[f], now: live.og?.[f] });
    }
  }
  const baseTypes = new Set(baseline.structuredDataTypes ?? []);
  const liveTypes = new Set(live.structuredDataTypes ?? []);
  const removed = [...baseTypes].filter((t) => !liveTypes.has(t));
  const added = [...liveTypes].filter((t) => !baseTypes.has(t));
  if (removed.length) changes.push({ field: "structuredData.removed", was: removed, now: null });
  if (added.length) changes.push({ field: "structuredData.added", was: null, now: added });
  return changes;
}

async function capture(urls) {
  console.log(`Capturing ${urls.length} URLs…`);
  const results = [];
  for (const url of urls) {
    process.stdout.write(`  ${url} … `);
    const snap = await snapshotUrl(url);
    results.push(snap);
    console.log(snap.error ? `ERROR: ${snap.error}` : `${snap.status}`);
  }
  fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(SNAPSHOTS_DIR, `snapshot-${ts}.json`);
  fs.writeFileSync(file, JSON.stringify(results, null, 2));
  console.log(`\nSnapshot saved: ${file}`);
  return file;
}

async function compare() {
  const files = fs
    .readdirSync(SNAPSHOTS_DIR)
    .filter((f) => f.startsWith("snapshot-"))
    .sort();
  if (!files.length) {
    console.error("No baseline snapshot found. Run without --compare first.");
    process.exit(1);
  }
  const latest = path.join(SNAPSHOTS_DIR, files[files.length - 1]);
  console.log(`Comparing against: ${latest}\n`);
  const baseline = JSON.parse(fs.readFileSync(latest, "utf8"));

  let totalChanges = 0;
  for (const base of baseline) {
    process.stdout.write(`  ${base.url} … `);
    const live = await snapshotUrl(base.url);
    const changes = diff(base, live);
    if (changes.length === 0) {
      console.log("OK");
    } else {
      console.log(`${changes.length} change(s):`);
      for (const c of changes) {
        console.log(`    [${c.field}]`);
        console.log(`      was: ${JSON.stringify(c.was)}`);
        console.log(`      now: ${JSON.stringify(c.now)}`);
      }
      totalChanges += changes.length;
    }
  }
  console.log(`\n${totalChanges === 0 ? "No regressions detected." : `${totalChanges} total change(s) detected.`}`);
}

// ── main ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.includes("--compare")) {
  await compare();
} else if (args.includes("--url")) {
  const idx = args.indexOf("--url");
  const url = args[idx + 1];
  if (!url) { console.error("Provide a URL after --url"); process.exit(1); }
  const snap = await snapshotUrl(url);
  console.log(JSON.stringify(snap, null, 2));
} else {
  await capture(ALL_URLS);
}
