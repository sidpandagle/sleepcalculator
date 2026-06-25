## SleepSchedule.in — Solo SEO Growth Plan

**Goal:** Rank SleepSchedule.in in top search results and grow to 10k–100k monthly organic visitors as a solo founder.

**Baseline:** Domain created June 2025, zero traffic, not yet submitted to Search Console.

**Target audience:** Global English speakers (US, UK, AU) — not India-first. `.in` TLD is permanent; override ccTLD bias via Search Console international targeting on day 1.

**Traffic model:** At US/UK CPM (~₹500–1,500), 10k visitors/month → ₹15k–₹45k/month from AdSense. Affiliate (mattress, supplements, sleep trackers) adds on top.

---

## Reality Check: Domain Sandbox

New domains sit in Google's sandbox for **3–6 months** before ranking competitively. "Bedtime calculator" and "sleep cycle calculator" are owned by WebMD, Healthline, Sleep Foundation (DA 70–90). **Do not target these for 3 months.**

Strategy: ultra-long-tail, zero-competition keywords for months 1–3. Ranking expectations shift to month 4+.

---

## Execution Order (Revised)

### Day 1 — Search Console Setup
- Submit site to Google Search Console, Bing Webmaster, Google Analytics
- Set international targeting → "All countries" (overrides `.in` ccTLD India bias)
- Submit sitemap.xml and verify robots.txt

### Phase 1 (Week 1) — Technical SEO Foundation
- Confirm mobile performance >90, load speed <2s
- Audit titles, meta descriptions, canonical tags
- Verify sitemap.ts dynamically includes all published pages

### Phase 2 (Week 2–4) — Programmatic SEO (Primary Focus)

Generate **500–1,000 static pages** using Next.js `generateStaticParams`:

- `/sleep-calculator/[time]-wakeup` — all 15-min intervals across 24h = 96 pages
- Cross with age group variants: `/sleep-calculator/6am-wakeup-for-adults` etc.
- Cross with profession variants: `/sleep-calculator/6am-wakeup-for-students` etc.

All pages computed from existing calculator logic — no manual content.

**Update `sitemap.ts`** to include programmatic URLs via `generateProgrammaticUrls()` — computed from same data source, always in sync.

Target keywords (ultra-long-tail, near-zero competition):
- "what time should i sleep if i wake up at 6 15 am"
- "sleep calculator 7 30 am wake up"
- "bedtime for 5am wake up"

### Phase 3 (Month 2) — New Calculator Tools

Build one tool at a time, each unlocking new programmatic URL clusters:

1. **Nap calculator** (first) — fixed durations (20min, 90min, 3hr), clean search intent, simple logic
2. Sleep debt calculator
3. Jet lag calculator
4. Caffeine cutoff calculator

Weekly cadence: 1 new tool, not 1/week — ship when ready.

### Phase 4 (Month 2+) — Blog Content

- AI-assisted drafts, manually edited and published
- Target: 1 post/week (not 3 — fewer, longer, authoritative posts win for new domains)
- Topics tied to programmatic page clusters for internal linking

### Phase 5 (Month 4) — Backlinks

Deferred until domain is out of sandbox and has indexed content to link to.

- **Reddit:** genuine answers in r/sleep, r/productivity with natural links
- **Product Hunt launch** — timed for month 4 when 500+ pages are indexed
- IndieHackers, tool directories
- Health blog guest posting outreach
- Target: 10 quality dofollow backlinks/month

---

## Revenue

**Monetization:**
- AdSense (primary)
- Affiliate: mattress, supplements, sleep trackers

**Realistic projections (global traffic, US/UK CPM):**

| Monthly Visitors | AdSense Estimate |
|-----------------|-----------------|
| 10k | ₹15k–₹45k |
| 100k | ₹1.5L–₹4.5L |

---

## Sitemap Architecture Note

`app/sitemap.ts` is already dynamic for blog posts. When programmatic pages ship, add `generateProgrammaticUrls()` that computes all `/sleep-calculator/*` URLs from the same data source used for `generateStaticParams` — no manual maintenance.
