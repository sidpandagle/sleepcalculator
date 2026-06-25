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
