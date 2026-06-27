export const CYCLE_MINUTES = 90;
export const FALL_ASLEEP_BUFFER = 15;

export interface WakeUpResult {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export interface BedtimeResult {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export interface SleepDebtWarning {
  deficit: number;
  message: string;
}

function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function calculateWakeUpTimes(bedtime: string): WakeUpResult[] {
  const bedMinutes = parseTime(bedtime);
  return Array.from({ length: 6 }, (_, i) => {
    const cycles = i + 1;
    const totalSleep = FALL_ASLEEP_BUFFER + cycles * CYCLE_MINUTES;
    const wakeMinutes = bedMinutes + totalSleep;
    return {
      time: formatTime(wakeMinutes),
      cycles,
      hours: parseFloat((cycles * CYCLE_MINUTES / 60).toFixed(1)),
      recommended: cycles >= 5,
    };
  });
}

export function calculateBedtimes(wakeTime: string): BedtimeResult[] {
  const wakeMinutes = parseTime(wakeTime);
  return Array.from({ length: 6 }, (_, i) => {
    const cycles = i + 1;
    const totalSleep = FALL_ASLEEP_BUFFER + cycles * CYCLE_MINUTES;
    const bedMinutes = wakeMinutes - totalSleep;
    return {
      time: formatTime(bedMinutes),
      cycles,
      hours: parseFloat((cycles * CYCLE_MINUTES / 60).toFixed(1)),
      recommended: cycles >= 5,
    };
  });
}

interface AgeGroup {
  label: string;
  min: number;
  max: number;
}

export function getRecommendedHours(age: number): AgeGroup & { label: string } {
  if (age <= 3) return { label: "Toddler", min: 11, max: 14 };
  if (age <= 5) return { label: "Preschool", min: 10, max: 13 };
  if (age <= 12) return { label: "School-age", min: 9, max: 11 };
  if (age <= 17) return { label: "Teenager", min: 8, max: 10 };
  if (age <= 64) return { label: "Adult", min: 7, max: 9 };
  return { label: "Older Adult", min: 7, max: 8 };
}

export interface NapResult {
  label: string;
  minutes: number;
  wakeTime: string;
  benefit: string;
  warning: string | null;
}

export function calculateNapTimes(napStart: string): NapResult[] {
  const start = parseTime(napStart);
  return [
    {
      label: "Power Nap",
      minutes: 20,
      wakeTime: formatTime(start + 20),
      benefit: "Boosts alertness without entering deep sleep",
      warning: null,
    },
    {
      label: "Full Cycle Nap",
      minutes: 90,
      wakeTime: formatTime(start + 90),
      benefit: "Completes a full sleep cycle including REM",
      warning: null,
    },
    {
      label: "30-min Nap",
      minutes: 30,
      wakeTime: formatTime(start + 30),
      benefit: "More rest than a power nap",
      warning: "Often causes grogginess — you may wake mid-cycle",
    },
  ];
}

export function detectSleepDebt(hoursPlanned: number, age: number): SleepDebtWarning | null {
  const rec = getRecommendedHours(age);
  const deficit = rec.min - hoursPlanned;
  if (deficit <= 0) return null;
  return {
    deficit,
    message: `You're planning ${deficit} hour${deficit !== 1 ? "s" : ""} less sleep than the CDC recommends for your age group (${rec.min}–${rec.max} hours).`,
  };
}

// --- Sleep Debt ---

export interface SleepDebtResult {
  debt: number;
  surplus: number;
  recommended: { min: number; max: number };
  label: string;
}

export function calculateSleepDebt(hoursSlept: number, age: number): SleepDebtResult {
  const rec = getRecommendedHours(age);
  const debt = Math.max(0, Math.round((rec.min - hoursSlept) * 10) / 10);
  const surplus = Math.max(0, Math.round((hoursSlept - rec.max) * 10) / 10);
  return { debt, surplus, recommended: { min: rec.min, max: rec.max }, label: rec.label };
}

// --- REM Sleep ---

export interface REMBreakdown {
  cycle: number;
  remMinutes: number;
}

export interface REMSleepResult {
  remMinutes: number;
  remPercent: number;
  cycles: number;
  breakdown: REMBreakdown[];
}

const REM_PER_CYCLE = [10, 20, 30, 40, 50];

export function calculateREMSleep(totalHours: number): REMSleepResult {
  const cycles = Math.floor((totalHours * 60) / CYCLE_MINUTES);
  const breakdown: REMBreakdown[] = Array.from({ length: cycles }, (_, i) => ({
    cycle: i + 1,
    remMinutes: REM_PER_CYCLE[Math.min(i, REM_PER_CYCLE.length - 1)],
  }));
  const remMinutes = breakdown.reduce((sum, c) => sum + c.remMinutes, 0);
  const remPercent = totalHours > 0 ? Math.round((remMinutes / (totalHours * 60)) * 100) : 0;
  return { remMinutes, remPercent, cycles, breakdown };
}

// --- Pregnancy Sleep ---

export interface PregnancySleepNeeds {
  recommended: number;
  range: { min: number; max: number };
  commonIssues: string[];
  tips: string[];
}

const PREGNANCY_DATA: Record<1 | 2 | 3, PregnancySleepNeeds> = {
  1: {
    recommended: 9,
    range: { min: 8, max: 10 },
    commonIssues: [
      "Fatigue and excessive daytime sleepiness",
      "Nausea disrupting rest",
      "Frequent urination at night",
      "Vivid dreams",
    ],
    tips: [
      "Nap during the day to offset fatigue",
      "Eat small meals to reduce nausea before bed",
      "Keep a consistent sleep schedule",
      "Use extra pillows for comfort",
    ],
  },
  2: {
    recommended: 8,
    range: { min: 7, max: 9 },
    commonIssues: [
      "Back pain beginning to develop",
      "Leg cramps at night",
      "Heartburn and indigestion",
      "Baby movement starting to be felt",
    ],
    tips: [
      "Sleep on your left side to improve circulation",
      "Use a pregnancy pillow for back support",
      "Avoid large meals within 2 hours of bed",
      "Gentle stretching before sleep",
    ],
  },
  3: {
    recommended: 9,
    range: { min: 8, max: 10 },
    commonIssues: [
      "Difficulty finding a comfortable position",
      "Frequent urination throughout the night",
      "Restless leg syndrome",
      "Anxiety about labor and delivery",
    ],
    tips: [
      "Use a full-body pregnancy pillow",
      "Elevate your head to reduce heartburn",
      "Practice relaxation techniques before bed",
      "Limit fluid intake 2 hours before bed",
    ],
  },
};

export function getPregnancySleepNeeds(trimester: 1 | 2 | 3): PregnancySleepNeeds {
  return PREGNANCY_DATA[trimester];
}

// --- Baby Sleep ---

export interface BabySleepNeeds {
  total: number;
  nighttime: number;
  naps: number;
  napCount: number;
  ageLabel: string;
}

const BABY_SLEEP_RANGES: { maxMonths: number; total: number; nighttime: number; naps: number; napCount: number }[] = [
  { maxMonths: 1,  total: 16, nighttime: 8.5, naps: 7.5, napCount: 4 },
  { maxMonths: 3,  total: 15, nighttime: 9,   naps: 6,   napCount: 4 },
  { maxMonths: 11, total: 14, nighttime: 10,  naps: 4,   napCount: 3 },
  { maxMonths: 23, total: 13, nighttime: 11,  naps: 2,   napCount: 1 },
  { maxMonths: 24, total: 12, nighttime: 11,  naps: 1,   napCount: 1 },
];

export function getBabySleepNeeds(months: number): BabySleepNeeds {
  const entry = BABY_SLEEP_RANGES.find((r) => months <= r.maxMonths) ?? BABY_SLEEP_RANGES[BABY_SLEEP_RANGES.length - 1];
  const ageLabel = months === 0 ? "Newborn" : months === 1 ? "1-Month-Old" : `${months}-Month-Old`;
  return { total: entry.total, nighttime: entry.nighttime, naps: entry.naps, napCount: entry.napCount, ageLabel };
}
