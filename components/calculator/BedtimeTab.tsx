"use client";
import { useState } from "react";
import { calculateBedtimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";
import TimePicker from "./TimePicker";

const WAKE_PRESETS = [
  "05:00","05:30","06:00","06:30","07:00","07:30",
  "08:00","08:30","09:00","09:30",
];

export default function BedtimeTab() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const results = calculateBedtimes(wakeTime);

  return (
    <div>
      <fieldset className="border-0 p-0 m-0 w-full min-w-0">
        <legend className="block text-[12.5px] tracking-widest uppercase text-mist/80 mb-1 text-center w-full">
          I need to wake up at
        </legend>
        <TimePicker value={wakeTime} onChange={setWakeTime} presets={WAKE_PRESETS} />
      </fieldset>
      <div className="h-px bg-moon/8 my-[26px]" />
      <div>
        <p className="text-sm text-mist mb-3.5">
          To wake up feeling refreshed, go to sleep at one of these times:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[...results].reverse().map((r) => (
            <ResultCard key={r.cycles} {...r} />
          ))}
        </div>
      </div>
      <p className="text-xs text-mist/70 leading-relaxed mt-4">
        Based on 90-minute sleep cycles + 15-minute average fall-asleep time (National Sleep Foundation).
      </p>
    </div>
  );
}
