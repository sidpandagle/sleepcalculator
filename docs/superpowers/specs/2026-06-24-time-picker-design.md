# Time Picker — UX Design Spec
_Date: 2026-06-24_

## Problem

Both `WakeUpTab` and `BedtimeTab` use a native `<input type="time">` which renders inconsistently across browsers, looks jarring against the polished dark UI, and offers a poor desktop experience.

## Solution

Replace the native input with a custom `TimePicker` component: a row of quick-select preset chips covering the typical sleep/wake range, plus ±15 min nudge buttons flanking a current-time display.

## Component: `TimePicker`

**File:** `components/calculator/TimePicker.tsx`

### Props

```ts
interface TimePickerProps {
  value: string;          // "HH:MM" 24-hour format
  onChange: (value: string) => void;
  presets: string[];      // ordered array of "HH:MM" strings
}
```

### Layout

```
[ − 15 min ]   [ 10:30 PM ]   [ + 15 min ]

[ 8:00 PM ] [ 8:30 PM ] [ 9:00 PM ] [ 9:30 PM ] [ 10:00 PM ] [ 10:30 PM ] ... (scrollable)
```

- Top row: nudge buttons on either side of the current time displayed in 12-hour format with AM/PM
- Bottom row: horizontally scrollable chip strip
- Active chip (value matches a preset exactly): indigo background (`bg-indigo-600 text-white`)
- Inactive chips: `bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10`
- Nudge buttons: ghost style, `text-slate-400 hover:text-white`

### Behavior

- Clicking a chip sets `value` to that preset and highlights it
- ±15 min nudge adjusts the current value by 15 minutes; wraps at midnight
- If value no longer matches any preset after nudging, no chip is highlighted (valid state)
- Nudge wraps: 11:45 PM + 15 → 12:00 AM; 12:00 AM − 15 → 11:45 PM

### Time format helpers (internal)

- `toMinutes(hhmm: string): number` — converts "HH:MM" to total minutes
- `fromMinutes(mins: number): string` — converts total minutes (mod 1440) to "HH:MM"
- `display12h(hhmm: string): string` — converts "HH:MM" to "10:30 PM" for display

## Preset Ranges

### WakeUpTab (user selects their bedtime)

8:00 PM → 1:30 AM in 30-min steps (12 chips):
`["20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","00:00","00:30","01:00","01:30"]`

Default value: `"22:30"` (unchanged from current default)

### BedtimeTab (user selects their wake time)

5:00 AM → 9:30 AM in 30-min steps (10 chips):
`["05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30"]`

Default value: `"07:00"` (unchanged from current default)

## Integration

Replace the `<input type="time">` block in both tabs with `<TimePicker>`. The `value`/`onChange` wiring stays identical — both tabs already use `useState` string state in "HH:MM" format, so the interface matches exactly.

## What Does NOT Change

- `sleep-engine.ts` — no changes needed, already consumes "HH:MM" strings
- `ResultCard.tsx` — untouched
- `SleepCalculator.tsx` — untouched
- `DurationTab.tsx` — untouched (has no time picker)

## Accessibility

- Nudge buttons have `aria-label="Subtract 15 minutes"` / `"Add 15 minutes"`
- Chip buttons have `aria-pressed` set based on active state
- Current time region has `aria-live="polite"` so screen readers announce changes
