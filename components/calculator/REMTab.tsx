"use client";
import { useState } from "react";
import { calculateREMSleep } from "@/lib/sleep-engine";

export default function REMTab() {
  const [hours, setHours] = useState(7.5);
  const result = calculateREMSleep(hours);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-mist mb-2">
          Total sleep: <span className="text-linen font-bold">{hours}h</span>
        </label>
        <input
          type="range"
          min={1}
          max={12}
          step={0.5}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full accent-ember"
        />
        <div className="flex justify-between text-xs text-mist/70 mt-1">
          <span>1h</span><span>12h</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[18px] border border-ember/40 bg-ember/10 p-5">
          <p className="text-sm font-semibold text-ember mb-1">REM Sleep</p>
          <p className="font-serif text-4xl text-linen">{result.remMinutes}m</p>
          <p className="text-mist text-sm mt-1">{result.remPercent}% of total sleep</p>
        </div>
        <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
          <p className="text-sm font-semibold text-mist mb-1">Sleep Cycles</p>
          <p className="font-serif text-4xl text-linen">{result.cycles}</p>
          <p className="text-mist text-sm mt-1">90-min cycles</p>
        </div>
      </div>

      {result.cycles > 0 && (
        <div>
          <p className="text-sm font-medium text-mist mb-3">REM by cycle:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-moon/8 text-mist">
                  <th className="pb-2 pr-6 font-medium">Cycle</th>
                  <th className="pb-2 font-medium">REM Sleep</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map(({ cycle, remMinutes: rem }) => (
                  <tr key={cycle} className="border-b border-moon/5 text-mist">
                    <td className="py-2 pr-6">Cycle {cycle}</td>
                    <td className="py-2 text-ember-light font-mono font-medium">{rem} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="text-xs text-mist/70">REM duration increases across cycles. Based on polysomnography averages.</p>
    </div>
  );
}
