"use client";
import { useState } from "react";
import { calculateNapTimes } from "@/lib/sleep-engine";
import { display12h } from "@/lib/time-utils";
import TimePicker from "./TimePicker";

const NAP_PRESETS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "14:30", "15:00", "15:30", "16:00", "16:30",
];

function getCurrentHHMM(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = now.getMinutes() < 30 ? "00" : "30";
  return `${h}:${m}`;
}

const NAP_ICONS: Record<string, string> = {
  "Power Nap": "⚡",
  "Full Cycle Nap": "🔄",
  "30-min Nap": "😵",
};

export default function NapTab() {
  const [napStart, setNapStart] = useState(getCurrentHHMM);
  const results = calculateNapTimes(napStart);

  return (
    <div className="space-y-6">
      <fieldset className="border-0 p-0 m-0">
        <legend className="block text-sm font-medium text-slate-300 mb-3">
          I want to start napping at:
        </legend>
        <TimePicker value={napStart} onChange={setNapStart} presets={NAP_PRESETS} />
      </fieldset>

      <div className="space-y-3">
        {results.map((r) => (
          <div
            key={r.label}
            className={`rounded-xl border p-4 transition-all ${
              r.warning
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-indigo-500/30 bg-indigo-500/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{NAP_ICONS[r.label]}</span>
                  <span className="font-semibold text-white">{r.label}</span>
                  <span className="text-xs text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                    {r.minutes} min
                  </span>
                </div>
                <p className="text-sm text-slate-400">{r.benefit}</p>
                {r.warning && (
                  <p className="text-xs text-amber-400 mt-1">⚠ {r.warning}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400 mb-0.5">Wake up at</div>
                <div className="text-2xl font-bold text-white tabular-nums">
                  {display12h(r.wakeTime)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Power naps (10–20 min) keep you in light sleep — no grogginess on waking. Full cycle naps (90 min) complete all sleep stages including REM. Avoid 30–60 min naps if you need to be alert immediately after.
      </p>
    </div>
  );
}
