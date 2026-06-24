# Time Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the native `<input type="time">` in WakeUpTab and BedtimeTab with a custom TimePicker showing preset chips and ±15 min nudge buttons.

**Architecture:** A single reusable `TimePicker` component consumes pure helper functions from `lib/time-utils.ts`. Both tabs swap their `<input>` for `<TimePicker>` with tab-specific preset arrays. No new dependencies.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Vitest + jsdom

## Global Constraints

- No new npm dependencies — use only what's already in package.json
- All times stored and passed as `"HH:MM"` 24-hour strings (matches existing `sleep-engine.ts` interface)
- Dark theme: indigo-600 accent, white/5 backgrounds, slate-300/400 text — match existing component styles exactly
- TypeScript strict mode — no `any`, no `as` casts

---

### Task 1: Time utility helpers + tests

**Files:**
- Create: `lib/time-utils.ts`
- Create: `lib/time-utils.test.ts`

**Interfaces:**
- Produces:
  - `toMinutes(hhmm: string): number` — "22:30" → 1350
  - `fromMinutes(mins: number): string` — 1350 → "22:30", wraps mod 1440, handles negatives
  - `display12h(hhmm: string): string` — "22:30" → "10:30 PM", "00:00" → "12:00 AM"

- [ ] **Step 1: Write the failing tests**

Create `lib/time-utils.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { toMinutes, fromMinutes, display12h } from "./time-utils";

describe("toMinutes", () => {
  it("converts HH:MM to total minutes", () => {
    expect(toMinutes("00:00")).toBe(0);
    expect(toMinutes("01:30")).toBe(90);
    expect(toMinutes("22:30")).toBe(1350);
    expect(toMinutes("23:59")).toBe(1439);
  });
});

describe("fromMinutes", () => {
  it("converts total minutes to HH:MM", () => {
    expect(fromMinutes(0)).toBe("00:00");
    expect(fromMinutes(90)).toBe("01:30");
    expect(fromMinutes(1350)).toBe("22:30");
  });

  it("wraps forward past midnight", () => {
    expect(fromMinutes(1440)).toBe("00:00");
    expect(fromMinutes(1455)).toBe("00:15");
  });

  it("wraps backward past midnight", () => {
    expect(fromMinutes(-15)).toBe("23:45");
    expect(fromMinutes(-60)).toBe("23:00");
  });
});

describe("display12h", () => {
  it("renders midnight as 12:00 AM", () => {
    expect(display12h("00:00")).toBe("12:00 AM");
  });

  it("renders noon as 12:00 PM", () => {
    expect(display12h("12:00")).toBe("12:00 PM");
  });

  it("renders AM times correctly", () => {
    expect(display12h("07:00")).toBe("7:00 AM");
    expect(display12h("09:30")).toBe("9:30 AM");
  });

  it("renders PM times correctly", () => {
    expect(display12h("22:30")).toBe("10:30 PM");
    expect(display12h("23:45")).toBe("11:45 PM");
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```
npx vitest run lib/time-utils.test.ts
```

Expected: FAIL — "Cannot find module './time-utils'"

- [ ] **Step 3: Implement the helpers**

Create `lib/time-utils.ts`:

```ts
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(mins: number): string {
  const normalized = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function display12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```
npx vitest run lib/time-utils.test.ts
```

Expected: all 8 tests PASS

- [ ] **Step 5: Commit**

```bash
git add lib/time-utils.ts lib/time-utils.test.ts
git commit -m "feat: add time utility helpers (toMinutes, fromMinutes, display12h)"
```

---

### Task 2: TimePicker component

**Files:**
- Create: `components/calculator/TimePicker.tsx`

**Interfaces:**
- Consumes: `toMinutes`, `fromMinutes`, `display12h` from `@/lib/time-utils`
- Produces:
  ```ts
  interface TimePickerProps {
    value: string;       // "HH:MM" 24-hour
    onChange: (value: string) => void;
    presets: string[];   // ordered array of "HH:MM" strings
  }
  export default function TimePicker(props: TimePickerProps): JSX.Element
  ```

- [ ] **Step 1: Create the component**

Create `components/calculator/TimePicker.tsx`:

```tsx
"use client";
import { toMinutes, fromMinutes, display12h } from "@/lib/time-utils";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  presets: string[];
}

export default function TimePicker({ value, onChange, presets }: TimePickerProps) {
  function nudge(delta: number) {
    onChange(fromMinutes(toMinutes(value) + delta));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => nudge(-15)}
          aria-label="Subtract 15 minutes"
          className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          − 15 min
        </button>
        <div
          aria-live="polite"
          className="text-2xl font-bold text-white tabular-nums min-w-[110px] text-center"
        >
          {display12h(value)}
        </div>
        <button
          onClick={() => nudge(15)}
          aria-label="Add 15 minutes"
          className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          + 15 min
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {presets.map((preset) => {
          const active = preset === value;
          return (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              aria-pressed={active}
              className={`shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                active
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {display12h(preset)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/calculator/TimePicker.tsx
git commit -m "feat: add TimePicker component with preset chips and nudge buttons"
```

---

### Task 3: Wire TimePicker into WakeUpTab and BedtimeTab

**Files:**
- Modify: `components/calculator/WakeUpTab.tsx`
- Modify: `components/calculator/BedtimeTab.tsx`

**Interfaces:**
- Consumes: `TimePicker` from `./TimePicker` with `value`, `onChange`, `presets` props

- [ ] **Step 1: Update WakeUpTab**

Replace the entire contents of `components/calculator/WakeUpTab.tsx`:

```tsx
"use client";
import { useState } from "react";
import { calculateWakeUpTimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";
import TimePicker from "./TimePicker";

const BEDTIME_PRESETS = [
  "20:00","20:30","21:00","21:30","22:00","22:30",
  "23:00","23:30","00:00","00:30","01:00","01:30",
];

export default function WakeUpTab() {
  const [bedtime, setBedtime] = useState("22:30");
  const results = calculateWakeUpTimes(bedtime);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          I plan to go to bed at:
        </label>
        <TimePicker value={bedtime} onChange={setBedtime} presets={BEDTIME_PRESETS} />
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-4">
          If you fall asleep now, wake up at one of these times to feel refreshed:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {results.map((r) => (
            <ResultCard key={r.cycles} {...r} />
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Based on 90-minute sleep cycles + 15-minute average fall-asleep time (National Sleep Foundation).
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Update BedtimeTab**

Replace the entire contents of `components/calculator/BedtimeTab.tsx`:

```tsx
"use client";
import { useState } from "react";
import { calculateBedtimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";
import TimePicker from "./TimePicker";

const WAKE_PRESETS = [
  "05:00","05:30","06:00","06:30","07:00","07:30",
  "08:00","08:30","09:00","09:30",
];

export default function BedtimeTab() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const results = calculateBedtimes(wakeTime);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          I need to wake up at:
        </label>
        <TimePicker value={wakeTime} onChange={setWakeTime} presets={WAKE_PRESETS} />
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-4">
          To wake up feeling refreshed, go to sleep at one of these times:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {results.map((r) => (
            <ResultCard key={r.cycles} {...r} />
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Based on 90-minute sleep cycles + 15-minute average fall-asleep time (National Sleep Foundation).
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Run full test suite**

```
npx vitest run
```

Expected: all existing tests pass (sleep-engine tests untouched), plus new time-utils tests pass

- [ ] **Step 5: Commit**

```bash
git add components/calculator/WakeUpTab.tsx components/calculator/BedtimeTab.tsx
git commit -m "feat: replace native time input with TimePicker in WakeUpTab and BedtimeTab"
```
