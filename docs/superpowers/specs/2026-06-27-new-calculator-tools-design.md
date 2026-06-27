# New Calculator Tools — Design Spec
**Date:** 2026-06-27  
**Status:** Approved

## Goal

Add 5 new sleep calculator tools to sleepschedule.in, each with a static landing page and programmatic SEO slug variants. Follow the existing pattern established by `/nap-calculator`, `/sleep-duration-calculator`, and `/sleep-calculator/[slug]`.

## Tools

| Tool | Static route | Programmatic route | Pages |
|---|---|---|---|
| Sleep Debt Calculator | `/sleep-debt-calculator` | `/sleep-debt-calculator/[N]h-sleep` | 12 (1h–12h) |
| REM Sleep Calculator | `/rem-sleep-calculator` | `/rem-sleep-calculator/[N]h` | 8 (3h–10h) |
| Pregnancy Sleep Calculator | `/pregnancy-sleep-calculator` | `/pregnancy-sleep-calculator/[trimester]` | 3 |
| Baby Sleep Calculator | `/baby-sleep-calculator` | `/baby-sleep-calculator/[N]-months` | 13 |
| Sleep Duration Calculator (existing) | `/sleep-duration-calculator` (unchanged) | `/sleep-duration-calculator/[age-group]` | 6 |

**Total new static pages:** 42

---

## Architecture

Approach A: one route + component per tool, mirroring existing patterns. No shared wrapper abstraction.

### New files

```
app/
  sleep-debt-calculator/
    page.tsx                          # static landing page
    [slug]/page.tsx                   # programmatic: [N]h-sleep
  rem-sleep-calculator/
    page.tsx
    [slug]/page.tsx                   # programmatic: [N]h
  pregnancy-sleep-calculator/
    page.tsx
    [slug]/page.tsx                   # programmatic: first-trimester | second-trimester | third-trimester
  baby-sleep-calculator/
    page.tsx
    [slug]/page.tsx                   # programmatic: newborn | [N]-months
  sleep-duration-calculator/
    [slug]/page.tsx                   # NEW: toddler | preschool | school-age | teenager | adult | older-adult
    page.tsx                          # UNCHANGED

components/calculator/
  SleepDebtTab.tsx
  REMTab.tsx
  PregnancyTab.tsx
  BabyTab.tsx
  # DurationTab.tsx — unchanged, reused by sleep-duration [slug] pages

lib/
  sleep-engine.ts                     # 4 new exported functions added
  programmatic.ts                     # 4 new slug generators added
```

---

## Calculator Logic

### Sleep Debt (`calculateSleepDebt`)

```ts
calculateSleepDebt(hoursSlept: number, age: number): {
  debt: number;        // positive = deficit, 0 if met
  surplus: number;     // positive = slept more than minimum
  recommended: { min: number; max: number };
  label: string;       // age group label
}
```

- Reuses `getRecommendedHours(age)` already in `lib/sleep-engine.ts`
- `debt = Math.max(0, recommended.min - hoursSlept)`
- `surplus = Math.max(0, hoursSlept - recommended.max)`

### REM Sleep (`calculateREMSleep`)

```ts
calculateREMSleep(totalHours: number): {
  remMinutes: number;
  remPercent: number;
  cycles: number;
  breakdown: { cycle: number; remMinutes: number }[];
}
```

- cycles = Math.floor(totalHours * 60 / 90)
- REM per cycle increases across the night: cycle 1 ≈ 10 min, cycle 2 ≈ 20 min, cycle 3 ≈ 30 min, cycle 4+ ≈ 40–50 min
- remPercent = remMinutes / (totalHours * 60) * 100

### Pregnancy Sleep (`getPregnancySleepNeeds`)

```ts
getPregnancySleepNeeds(trimester: 1 | 2 | 3): {
  recommended: number;          // hours (e.g., 9)
  range: { min: number; max: number };
  commonIssues: string[];
  tips: string[];
}
```

- Trimester 1: 8–10h (fatigue, nausea disrupts sleep)
- Trimester 2: 7–9h (most comfortable trimester)
- Trimester 3: 8–10h (discomfort, frequent waking, RLS)
- Source: ACOG + NSF guidelines

### Baby Sleep (`getBabySleepNeeds`)

```ts
getBabySleepNeeds(months: number): {
  total: number;          // hours per 24h
  nighttime: number;      // hours
  naps: number;           // hours
  napCount: number;
  ageLabel: string;       // e.g., "3-Month-Old"
}
```

- Source: AAP sleep guidelines by age range
- Age ranges: 0–1mo (newborn), 2–3mo, 4–11mo, 12–23mo

---

## UI Components

All components: `"use client"`, dark Tailwind styling matching existing tabs.

### SleepDebtTab
- Inputs: hours-slept number input (0.5 step, 1–12) + age slider (reuse DurationTab pattern)
- Output: colored result card (red = debt, green = surplus, indigo = on target) + debt amount in hours

### REMTab
- Input: total sleep hours slider (1h–12h, 0.5 step)
- Output: REM total highlight card + per-cycle breakdown table

### PregnancyTab
- Input: trimester selector (3 pill buttons: First / Second / Third)
- Output: recommended hours card + common issues list + tips list

### BabyTab
- Input: age in months slider (0–24)
- Output: three cards — Total Sleep / Nighttime Sleep / Naps — + nap count badge

### Sleep Duration programmatic pages
- Reuse `DurationTab` component as-is (it's already interactive)
- Page pre-seeds age-group context in copy only; DurationTab remains fully interactive

---

## Programmatic Slug Patterns

### Sleep Debt: `[N]h-sleep`
- Values: `1h-sleep`, `2h-sleep`, ..., `12h-sleep`
- Generator: `generateSleepDebtSlugs()` → 12 items
- Extractor: `slugToSleepDebtHours(slug)` → number | null

### REM Sleep: `[N]h`
- Values: `3h`, `3h30`, `4h`, ..., `10h` (0.5h steps)
- Generator: `generateREMSlugs()` → 15 items (3h to 10h in 0.5h steps)
- Extractor: `slugToREMHours(slug)` → number | null

### Pregnancy: `[trimester]`
- Values: `first-trimester`, `second-trimester`, `third-trimester`
- Generator: `generatePregnancySlugs()` → 3 items
- Extractor: `slugToTrimester(slug)` → 1 | 2 | 3 | null

### Baby: `[N]-months`
- Values: `newborn`, `1-month`, `2-months`, `3-months`, `4-months`, `5-months`, `6-months`, `9-months`, `12-months`, `15-months`, `18-months`, `21-months`, `24-months`
- Generator: `generateBabySlugs()` → 13 items
- Extractor: `slugToBabyMonths(slug)` → number | null (newborn = 0)

### Sleep Duration: `[age-group]`
- Values: `toddler`, `preschool`, `school-age`, `teenager`, `adult`, `older-adult`
- Generator: `generateSleepDurationSlugs()` → 6 items
- Extractor: `slugToAgeGroup(slug)` → age representative number | null (used to pre-label content)

---

## SEO

### Metadata per slug page

**Sleep Debt:**
- Title: `Sleep Debt Calculator — You Slept {N} Hours`
- Description: `Find out how much sleep debt you've accumulated after {N} hours of sleep. See your deficit vs CDC recommendations and how to recover.`
- Canonical: `https://sleepschedule.in/sleep-debt-calculator/{slug}`

**REM Sleep:**
- Title: `REM Sleep Calculator — {N} Hours of Sleep`
- Description: `How much REM sleep do you get in {N} hours? See your estimated REM time broken down by sleep cycle.`
- Canonical: `https://sleepschedule.in/rem-sleep-calculator/{slug}`

**Pregnancy:**
- Title: `Pregnancy Sleep Calculator — {Trimester} Trimester`
- Description: `How much sleep do you need in your {trimester} trimester? Get recommendations, common issues, and tips for better pregnancy sleep.`
- Canonical: `https://sleepschedule.in/pregnancy-sleep-calculator/{slug}`

**Baby:**
- Title: `Baby Sleep Calculator — {N}-Month-Old Sleep Schedule`
- Description: `How much sleep does a {N}-month-old need? See total sleep, nighttime hours, and nap count based on AAP guidelines.`
- Canonical: `https://sleepschedule.in/baby-sleep-calculator/{slug}`

**Sleep Duration:**
- Title: `Sleep Duration for {Age Group}s — How Much Sleep You Need`
- Description: `How much sleep do {age group}s need? CDC recommends {min}–{max} hours. See sleep by cycles and whether you're hitting your target.`
- Canonical: `https://sleepschedule.in/sleep-duration-calculator/{slug}`

### Structured data
- FAQSchema on every page (3 FAQs per tool, unique per slug where relevant)
- BreadcrumbList on all `[slug]` pages
- Static landing pages get FAQSchema + tool-level WebPage schema

### Sitemap
`app/sitemap.ts` extended to include all 42 new URLs.

### Internal linking
- Each `[slug]` page links to neighboring slugs (±2) same as `/sleep-calculator/[slug]`
- Each `[slug]` page links back to the tool's static landing page
- Static landing page links to all its slug variants

### Header nav
Add all 5 tool links (including existing sleep-duration) to `components/Header.tsx`. Use a "Tools" dropdown or expand the nav row with all calculator links.

---

## Constraints

- All new pages: Next.js App Router, TypeScript strict, Tailwind dark styling
- No inline styles, no CSS modules
- Canonical URLs use `sleepschedule.in` domain (matching existing)
- `generateStaticParams` on every `[slug]/page.tsx`
- All new engine functions: pure, no side effects, tested where logic is non-trivial
- DurationTab component: no changes
- `app/sleep-duration-calculator/page.tsx`: no changes
