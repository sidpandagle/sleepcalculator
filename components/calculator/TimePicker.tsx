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
    <div className="space-y-3 min-w-0">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => nudge(-15)}
          aria-label="Subtract 15 minutes"
          className="w-11 h-11 shrink-0 rounded-[14px] border border-moon/14 flex items-center justify-center text-xl text-linen/80 hover:bg-moon/8 transition-all cursor-pointer select-none"
        >
          −
        </button>
        <div aria-live="polite" className="text-center flex-1 min-w-0">
          <div className="font-serif text-5xl sm:text-[60px] leading-none tracking-tight text-linen">
            {display12h(value)}
          </div>
        </div>
        <button
          onClick={() => nudge(15)}
          aria-label="Add 15 minutes"
          className="w-11 h-11 shrink-0 rounded-[14px] border border-moon/14 flex items-center justify-center text-xl text-linen/80 hover:bg-moon/8 transition-all cursor-pointer select-none"
        >
          +
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
              className={`shrink-0 min-h-[42px] px-3.5 py-2.5 rounded-[11px] text-[13.5px] font-medium transition-all whitespace-nowrap border ${
                active
                  ? "border-[#9FB2FF]/50 bg-[#9FB2FF]/16 text-[#DDE4FF]"
                  : "border-moon/10 bg-moon/3 text-mist hover:bg-moon/8"
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
