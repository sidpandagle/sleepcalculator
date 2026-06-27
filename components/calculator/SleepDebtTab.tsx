"use client";
import { useState } from "react";
import { calculateSleepDebt } from "@/lib/sleep-engine";

export default function SleepDebtTab() {
  const [hoursSlept, setHoursSlept] = useState(7);
  const [age, setAge] = useState(30);
  const result = calculateSleepDebt(hoursSlept, age);
  const status = result.debt > 0 ? "debt" : result.surplus > 0 ? "surplus" : "on-target";

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Hours slept last night: <span className="text-white font-bold">{hoursSlept}h</span>
          </label>
          <input
            type="range"
            min={1}
            max={12}
            step={0.5}
            value={hoursSlept}
            onChange={(e) => setHoursSlept(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>1h</span><span>12h</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Your age: <span className="text-white font-bold">{age}</span>
          </label>
          <input
            type="range"
            min={4}
            max={85}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>4</span><span>85</span>
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl border p-5 ${
          status === "debt"
            ? "border-red-500/40 bg-red-500/10"
            : status === "surplus"
            ? "border-amber-500/40 bg-amber-500/10"
            : "border-indigo-500/40 bg-indigo-500/10"
        }`}
      >
        {status === "debt" ? (
          <>
            <p className="text-sm font-semibold text-red-400 mb-1">Sleep Debt</p>
            <p className="text-4xl font-extrabold text-white">{result.debt}h short</p>
            <p className="text-slate-400 text-sm mt-2">
              {result.label}s need {result.recommended.min}–{result.recommended.max}h · you slept {hoursSlept}h
            </p>
          </>
        ) : status === "surplus" ? (
          <>
            <p className="text-sm font-semibold text-amber-400 mb-1">Over Recommended</p>
            <p className="text-4xl font-extrabold text-white">+{result.surplus}h over max</p>
            <p className="text-slate-400 text-sm mt-2">
              {result.label}s need {result.recommended.min}–{result.recommended.max}h · you slept {hoursSlept}h
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-indigo-400 mb-1">On Target</p>
            <p className="text-4xl font-extrabold text-white">{hoursSlept}h</p>
            <p className="text-slate-400 text-sm mt-2">
              Within the {result.recommended.min}–{result.recommended.max}h CDC recommendation for {result.label}s
            </p>
          </>
        )}
      </div>
      <p className="text-xs text-slate-500">Source: CDC Sleep Recommendations 2023.</p>
    </div>
  );
}
