"use client";
import { useState } from "react";
import { calculateWakeUpTimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";
import TimePicker from "./TimePicker";

const BEDTIME_PRESETS = [
  "20:00","20:30","21:00","21:30","22:00","22:30",
  "23:00","23:30","00:00","00:30",
];

export default function WakeUpTab() {
  const [bedtime, setBedtime] = useState("22:30");
  const results = calculateWakeUpTimes(bedtime);

  return (
    <div className="space-y-6">
      <fieldset className="border-0 p-0 m-0 w-full min-w-0">
        <legend className="block text-sm font-medium text-slate-300 mb-3">
          I plan to go to bed at:
        </legend>
        <TimePicker value={bedtime} onChange={setBedtime} presets={BEDTIME_PRESETS} />
      </fieldset>
      <div>
        <p className="text-sm text-slate-400 mb-4">
          If you fall asleep at this time, wake up at one of these times to feel refreshed:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[...results].reverse().map((r) => (
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
