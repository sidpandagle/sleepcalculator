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
        <label className="block text-sm font-medium text-mist mb-2">
          Baby age: <span className="text-linen font-bold">{monthLabel}</span>
        </label>
        <input
          type="range"
          min={0}
          max={24}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full accent-ember"
        />
        <div className="flex justify-between text-xs text-mist/70 mt-1">
          <span>Newborn</span><span>24 months</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[18px] border border-ember/40 bg-ember/10 p-4">
          <p className="text-xs font-semibold text-ember mb-1">Total Sleep</p>
          <p className="font-serif text-3xl text-linen">{data.total}h</p>
          <p className="text-xs text-mist mt-1">per 24h</p>
        </div>
        <div className="rounded-[18px] border border-moon/9 bg-dusk p-4">
          <p className="text-xs font-semibold text-mist mb-1">Nighttime</p>
          <p className="font-serif text-3xl text-linen">{data.nighttime}h</p>
          <p className="text-xs text-mist mt-1">at night</p>
        </div>
        <div className="rounded-[18px] border border-moon/9 bg-dusk p-4">
          <p className="text-xs font-semibold text-mist mb-1">Naps</p>
          <p className="font-serif text-3xl text-linen">{data.naps}h</p>
          <p className="text-xs text-mist mt-1">{data.napCount} nap{data.napCount !== 1 ? "s" : ""}/day</p>
        </div>
      </div>

      <p className="text-xs text-mist/70">Source: American Academy of Pediatrics (AAP) sleep guidelines.</p>
    </div>
  );
}
