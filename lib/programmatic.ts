import { display12h } from "@/lib/time-utils";

export interface ProgrammaticTime {
  slug: string;
  hhmm: string;
  display: string;
}

export function generateAllWakeUpTimes(): ProgrammaticTime[] {
  const times: ProgrammaticTime[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 15, 30, 45]) {
      const hhmm = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      times.push({ slug: hhmmToSlug(hhmm), hhmm, display: display12h(hhmm) });
    }
  }
  return times;
}

export function hhmmToSlug(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "am" : "pm";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const minPart = m === 0 ? "" : String(m).padStart(2, "0");
  return `${hour12}${minPart}${period}-wakeup`;
}

export function slugToHhmm(slug: string): string | null {
  const match = slug.match(/^(\d+)(am|pm)-wakeup$/);
  if (!match) return null;
  const [, timePart, period] = match;
  let hour: number;
  let min: number;
  if (timePart.length <= 2) {
    hour = parseInt(timePart, 10);
    min = 0;
  } else {
    min = parseInt(timePart.slice(-2), 10);
    hour = parseInt(timePart.slice(0, -2), 10);
  }
  if (period === "am") {
    hour = hour === 12 ? 0 : hour;
  } else {
    hour = hour === 12 ? 12 : hour + 12;
  }
  if (min < 0 || min > 59 || hour < 0 || hour > 23) return null;
  return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function getNeighborSlugs(hhmm: string, count = 4): ProgrammaticTime[] {
  const all = generateAllWakeUpTimes();
  const idx = all.findIndex((t) => t.hhmm === hhmm);
  if (idx === -1) return [];
  const neighbors: ProgrammaticTime[] = [];
  for (let i = 1; i <= count / 2; i++) {
    neighbors.push(all[(idx - i + all.length) % all.length]);
    neighbors.push(all[(idx + i) % all.length]);
  }
  return neighbors;
}

// --- Sleep Debt slugs (1h–12h) ---

export function generateSleepDebtSlugs(): { slug: string; hours: number }[] {
  return Array.from({ length: 12 }, (_, i) => ({ slug: `${i + 1}h-sleep`, hours: i + 1 }));
}

export function slugToSleepDebtHours(slug: string): number | null {
  const match = slug.match(/^(\d+)h-sleep$/);
  if (!match) return null;
  const hours = parseInt(match[1], 10);
  if (hours < 1 || hours > 12) return null;
  return hours;
}

// --- REM Sleep slugs (3h–10h in 0.5h steps, 15 total) ---

export function generateREMSlugs(): { slug: string; hours: number }[] {
  const results: { slug: string; hours: number }[] = [];
  for (let i = 0; i <= 14; i++) {
    const hours = 3 + i * 0.5;
    const whole = Math.floor(hours);
    const slug = hours % 1 !== 0 ? `${whole}h30` : `${whole}h`;
    results.push({ slug, hours });
  }
  return results;
}

export function slugToREMHours(slug: string): number | null {
  const half = slug.match(/^(\d+)h30$/);
  if (half) {
    const h = parseInt(half[1], 10) + 0.5;
    if (h < 3 || h > 10) return null;
    return h;
  }
  const whole = slug.match(/^(\d+)h$/);
  if (whole) {
    const h = parseInt(whole[1], 10);
    if (h < 3 || h > 10) return null;
    return h;
  }
  return null;
}

// --- Pregnancy slugs ---

export function generatePregnancySlugs(): { slug: string; trimester: 1 | 2 | 3 }[] {
  return [
    { slug: "first-trimester", trimester: 1 },
    { slug: "second-trimester", trimester: 2 },
    { slug: "third-trimester", trimester: 3 },
  ];
}

export function slugToTrimester(slug: string): 1 | 2 | 3 | null {
  if (slug === "first-trimester") return 1;
  if (slug === "second-trimester") return 2;
  if (slug === "third-trimester") return 3;
  return null;
}

// --- Baby slugs ---

const BABY_SLUGS: { slug: string; months: number }[] = [
  { slug: "newborn",    months: 0  },
  { slug: "1-month",   months: 1  },
  { slug: "2-months",  months: 2  },
  { slug: "3-months",  months: 3  },
  { slug: "4-months",  months: 4  },
  { slug: "5-months",  months: 5  },
  { slug: "6-months",  months: 6  },
  { slug: "9-months",  months: 9  },
  { slug: "12-months", months: 12 },
  { slug: "15-months", months: 15 },
  { slug: "18-months", months: 18 },
  { slug: "21-months", months: 21 },
  { slug: "24-months", months: 24 },
];

export function generateBabySlugs(): { slug: string; months: number }[] {
  return BABY_SLUGS;
}

export function slugToBabyMonths(slug: string): number | null {
  return BABY_SLUGS.find((s) => s.slug === slug)?.months ?? null;
}

// --- Sleep Duration slugs ---

export interface SleepDurationSlug {
  slug: string;
  ageLabel: string;
  representativeAge: number;
  min: number;
  max: number;
}

const SLEEP_DURATION_SLUGS: SleepDurationSlug[] = [
  { slug: "toddler",      ageLabel: "Toddler",          representativeAge: 2,  min: 11, max: 14 },
  { slug: "preschool",    ageLabel: "Preschool",         representativeAge: 4,  min: 10, max: 13 },
  { slug: "school-age",   ageLabel: "School-Age Child",  representativeAge: 9,  min: 9,  max: 11 },
  { slug: "teenager",     ageLabel: "Teenager",          representativeAge: 15, min: 8,  max: 10 },
  { slug: "adult",        ageLabel: "Adult",             representativeAge: 30, min: 7,  max: 9  },
  { slug: "older-adult",  ageLabel: "Older Adult",       representativeAge: 68, min: 7,  max: 8  },
];

export function generateSleepDurationSlugs(): SleepDurationSlug[] {
  return SLEEP_DURATION_SLUGS;
}

export function slugToSleepDurationGroup(slug: string): SleepDurationSlug | null {
  return SLEEP_DURATION_SLUGS.find((s) => s.slug === slug) ?? null;
}
