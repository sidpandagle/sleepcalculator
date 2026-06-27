#!/usr/bin/env node
/**
 * IndexNow bulk submission — pings Bing (and Google via IndexNow) with all site URLs.
 *
 * Requires env var: INDEXNOW_KEY
 *
 * Usage:
 *   INDEXNOW_KEY=abc123 node scripts/indexnow-submit.mjs           — submit all URLs
 *   INDEXNOW_KEY=abc123 node scripts/indexnow-submit.mjs --static  — static URLs only
 *   INDEXNOW_KEY=abc123 node scripts/indexnow-submit.mjs --dry-run — print payload, no submit
 */

const KEY = process.env.INDEXNOW_KEY;
const HOST = "sleepschedule.in";
const BASE = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// ── URL lists ────────────────────────────────────────────────────────────────

const STATIC_PATHS = [
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

// Mirrors generateAllWakeUpTimes() in lib/programmatic.ts
function generateWakeUpSlugs() {
  const slugs = [];
  for (let totalMins = 4 * 60; totalMins <= 23 * 60; totalMins += 30) {
    const h24 = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const ampm = h24 < 12 ? "am" : "pm";
    const slug = m === 0 ? `${h12}${ampm}-wakeup` : `${h12}-${m}${ampm}-wakeup`;
    slugs.push(`/sleep-calculator/${slug}`);
  }
  return slugs;
}

// Mirrors generateSleepDebtSlugs(): 1h-sleep … 12h-sleep
function generateDebtSlugs() {
  return Array.from({ length: 12 }, (_, i) => `/sleep-debt-calculator/${i + 1}h-sleep`);
}

// Mirrors generateREMSlugs(): 3h, 3h30, 4h, … 10h
function generateREMSlugs() {
  const slugs = [];
  for (let i = 0; i <= 14; i++) {
    const hours = 3 + i * 0.5;
    const whole = Math.floor(hours);
    const slug = hours % 1 !== 0 ? `${whole}h30` : `${whole}h`;
    slugs.push(`/rem-sleep-calculator/${slug}`);
  }
  return slugs;
}

const PREGNANCY_PATHS = [
  "/pregnancy-sleep-calculator/first-trimester",
  "/pregnancy-sleep-calculator/second-trimester",
  "/pregnancy-sleep-calculator/third-trimester",
];

// Mirrors BABY_SLUGS in lib/programmatic.ts
function generateBabySlugs() {
  const labels = [
    "newborn", "1-month", "2-months", "3-months", "4-months",
    "5-months", "6-months", "9-months", "12-months",
    "15-months", "18-months", "21-months", "24-months",
  ];
  return labels.map((l) => `/baby-sleep-calculator/${l}`);
}

// Mirrors SLEEP_DURATION_SLUGS in lib/programmatic.ts
function generateDurationSlugs() {
  return [
    "toddler", "preschool", "school-age",
    "teenager", "adult", "older-adult",
  ].map((s) => `/sleep-duration-calculator/${s}`);
}

// ── main ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const staticOnly = args.includes("--static");

if (!KEY && !dryRun) {
  console.error("INDEXNOW_KEY env var is required. Get your key from https://www.bing.com/webmasters/");
  process.exit(1);
}

const paths = staticOnly
  ? STATIC_PATHS
  : [
      ...STATIC_PATHS,
      ...generateWakeUpSlugs(),
      ...generateDebtSlugs(),
      ...generateREMSlugs(),
      ...PREGNANCY_PATHS,
      ...generateBabySlugs(),
      ...generateDurationSlugs(),
    ];

const urlList = paths.map((p) => `${BASE}${p}`);

const payload = {
  host: HOST,
  key: KEY ?? "YOUR_KEY_HERE",
  keyLocation: `${BASE}/${KEY ?? "YOUR_KEY_HERE"}.txt`,
  urlList,
};

if (dryRun) {
  console.log("Dry run — payload that would be submitted:");
  console.log(JSON.stringify(payload, null, 2));
  console.log(`\nTotal URLs: ${urlList.length}`);
  process.exit(0);
}

console.log(`Submitting ${urlList.length} URLs to IndexNow…`);
const res = await fetch(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (res.ok || res.status === 202) {
  console.log(`Done. Status: ${res.status}`);
} else {
  const body = await res.text();
  console.error(`Failed. Status: ${res.status}\n${body}`);
  process.exit(1);
}
