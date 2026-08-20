"use client";
import { useState } from "react";
import { getRecommendedHours, detectSleepDebt } from "@/lib/sleep-engine";

const CYCLES = [
  { cycles: 3, hours: 4.5 },
  { cycles: 4, hours: 6 },
  { cycles: 5, hours: 7.5 },
  { cycles: 6, hours: 9 },
];

export default function DurationTab({ initialAge = 30 }: { initialAge?: number }) {
  const [age, setAge] = useState(initialAge);
  const rec = getRecommendedHours(age);
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-mist mb-2">
          Your age: <span className="text-linen font-bold">{age}</span>
        </label>
        <input
          id="age"
          type="range"
          min={4}
          max={85}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full max-w-xs accent-ember"
        />
        <div className="flex justify-between text-xs text-mist/70 max-w-xs mt-1">
          <span>4</span><span>85</span>
        </div>
      </div>

      <div className="rounded-[18px] border border-ember/30 bg-ember/10 p-4">
        <p className="text-sm text-mist">
          CDC recommends <span className="font-bold text-linen">{rec.label}s</span> get:
        </p>
        <p className="font-serif text-3xl text-linen mt-1">
          {rec.min}–{rec.max} hours
        </p>
        <p className="text-xs text-mist mt-2">per night</p>
      </div>

      <div>
        <p className="text-sm font-medium text-mist mb-3">Sleep by complete cycles:</p>
        <div className="grid grid-cols-2 gap-3">
          {CYCLES.map(({ cycles, hours }) => {
            const w = detectSleepDebt(hours, age);
            return (
              <div
                key={cycles}
                className={`rounded-[18px] p-4 border ${
                  !w ? "border-ember bg-ember/10" : "border-moon/9 bg-dusk"
                }`}
              >
                <div className="font-serif text-2xl text-linen">{hours}h</div>
                <div className="text-xs text-mist mt-1">{cycles} cycles</div>
                {w && <div className="text-xs text-amber-400 mt-1">⚠ {w.deficit}h short</div>}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-mist/70">
        Source: CDC Sleep Recommendations 2023.
      </p>
    </div>
  );
}
