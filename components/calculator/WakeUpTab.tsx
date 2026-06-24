"use client";
import { useState } from "react";
import { calculateWakeUpTimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";

export default function WakeUpTab() {
  const [bedtime, setBedtime] = useState("22:30");
  const results = calculateWakeUpTimes(bedtime);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="bedtime" className="block text-sm font-medium text-slate-300 mb-2">
          I plan to go to bed at:
        </label>
        <input
          id="bedtime"
          type="time"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          className="w-full max-w-xs px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
        />
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-4">
          If you fall asleep at <span className="text-white font-medium">{bedtime}</span>, you should wake up at one of these times to feel refreshed:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {results.map((r) => (
            <ResultCard key={r.cycles} {...r} />
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Based on 90-minute sleep cycles + 14-minute average fall-asleep time (National Sleep Foundation).
      </p>
    </div>
  );
}
