"use client";
import { useState } from "react";
import { getRecommendedHours, detectSleepDebt } from "@/lib/sleep-engine";

const CYCLES = [
  { cycles: 3, hours: 4.5 },
  { cycles: 4, hours: 6 },
  { cycles: 5, hours: 7.5 },
  { cycles: 6, hours: 9 },
];

export default function DurationTab() {
  const [age, setAge] = useState(30);
  const rec = getRecommendedHours(age);
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">
          Your age: <span className="text-white font-bold">{age}</span>
        </label>
        <input
          id="age"
          type="range"
          min={4}
          max={85}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full max-w-xs accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-slate-500 max-w-xs mt-1">
          <span>4</span><span>85</span>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
        <p className="text-sm text-slate-300">
          CDC recommends <span className="font-bold text-white">{rec.label}s</span> get:
        </p>
        <p className="text-3xl font-bold text-white mt-1">
          {rec.min}–{rec.max} hours
        </p>
        <p className="text-xs text-slate-400 mt-2">per night</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-300 mb-3">Sleep by complete cycles:</p>
        <div className="grid grid-cols-2 gap-3">
          {CYCLES.map(({ cycles, hours }) => {
            const w = detectSleepDebt(hours, age);
            return (
              <div
                key={cycles}
                className={`rounded-xl p-4 border ${
                  !w ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-white/5"
                }`}
              >
                <div className="text-2xl font-bold text-white">{hours}h</div>
                <div className="text-xs text-slate-400 mt-1">{cycles} cycles</div>
                {w && <div className="text-xs text-amber-400 mt-1">⚠ {w.deficit}h short</div>}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Source: CDC Sleep Recommendations 2023.
      </p>
    </div>
  );
}
