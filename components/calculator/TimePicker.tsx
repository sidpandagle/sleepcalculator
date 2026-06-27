"use client";
import { useEffect, useRef } from "react";
import { toMinutes, fromMinutes, display12h } from "@/lib/time-utils";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  presets: string[];
}

export default function TimePicker({ value, onChange, presets }: TimePickerProps) {
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  function nudge(delta: number) {
    onChange(fromMinutes(toMinutes(value) + delta));
  }

  useEffect(() => {
    const el = chipRefs.current.get(value);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [value]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => nudge(-15)}
          aria-label="Subtract 15 minutes"
          className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          − 15 min
        </button>
        <div
          aria-live="polite"
          className="text-2xl font-bold text-white tabular-nums min-w-[110px] text-center"
        >
          {display12h(value)}
        </div>
        <button
          onClick={() => nudge(15)}
          aria-label="Add 15 minutes"
          className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          + 15 min
        </button>
      </div>
      <div className="flex flex-nowrap overflow-x-auto gap-2 px-1 py-1 [&::-webkit-scrollbar]:hidden" style={{scrollbarWidth: "none"}}>
        {presets.map((preset) => {
          const active = preset === value;
          return (
            <button
              key={preset}
              ref={(el) => {
                if (el) chipRefs.current.set(preset, el);
                else chipRefs.current.delete(preset);
              }}
              onClick={() => onChange(preset)}
              aria-pressed={active}
              className={`shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                active
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {display12h(preset)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
