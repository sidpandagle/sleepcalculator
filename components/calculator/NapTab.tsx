"use client";
import { useState, useEffect } from "react";
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
  const [napStart, setNapStart] = useState("14:00");
  useEffect(() => { setNapStart(getCurrentHHMM()); }, []);
  const results = calculateNapTimes(napStart);

  return (
    <div>
      <fieldset className="border-0 p-0 m-0 w-full min-w-0">
        <legend className="block text-[12.5px] tracking-widest uppercase text-mist/80 mb-1 text-center w-full">
          I want to start napping at
        </legend>
        <TimePicker value={napStart} onChange={setNapStart} presets={NAP_PRESETS} />
      </fieldset>

      <div className="flex flex-col gap-2.5 mt-6">
        {results.map((r) => (
          <div
            key={r.label}
            className={`rounded-[18px] border p-4 flex items-center justify-between gap-4 transition-all ${
              r.warning
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-ember/30 bg-ember/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="font-serif text-[32px] leading-none text-linen w-[58px] shrink-0">{r.minutes}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span>{NAP_ICONS[r.label]}</span>
                  <span className="font-semibold text-[15.5px] text-linen">{r.label}</span>
                </div>
                <p className="text-[13px] text-mist mt-0.5">{r.benefit}</p>
                {r.warning && (
                  <p className="text-xs text-amber-400 mt-1">⚠ {r.warning}</p>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[11px] uppercase tracking-wide text-mist/70">Wake at</div>
              <div className="text-[19px] font-semibold text-linen tabular-nums mt-0.5 whitespace-nowrap">
                {display12h(r.wakeTime)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-mist/70 leading-relaxed mt-4">
        Power naps (10–20 min) keep you in light sleep — no grogginess on waking. Full cycle naps (90 min) complete all sleep stages including REM. Avoid 30–60 min naps if you need to be alert immediately after.
      </p>
    </div>
  );
}
