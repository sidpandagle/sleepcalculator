"use client";
import { useState } from "react";
import { getBabySleepNeeds } from "@/lib/sleep-engine";

export default function BabyTab() {
  const [months, setMonths] = useState(6);
  const data = getBabySleepNeeds(months);
  const monthLabel = months === 0 ? "Newborn" : months === 1 ? "1 Month" : `${months} Months`;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Baby age: <span className="text-white font-bold">{monthLabel}</span>
        </label>
        <input
          type="range"
          min={0}
          max={24}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Newborn</span><span>24 months</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-4">
          <p className="text-xs font-semibold text-indigo-400 mb-1">Total Sleep</p>
          <p className="text-3xl font-extrabold text-white">{data.total}h</p>
          <p className="text-xs text-slate-400 mt-1">per 24h</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-slate-400 mb-1">Nighttime</p>
          <p className="text-3xl font-extrabold text-white">{data.nighttime}h</p>
          <p className="text-xs text-slate-400 mt-1">at night</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-slate-400 mb-1">Naps</p>
          <p className="text-3xl font-extrabold text-white">{data.naps}h</p>
          <p className="text-xs text-slate-400 mt-1">{data.napCount} nap{data.napCount !== 1 ? "s" : ""}/day</p>
        </div>
      </div>

      <p className="text-xs text-slate-500">Source: American Academy of Pediatrics (AAP) sleep guidelines.</p>
    </div>
  );
}
