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
