"use client";
import { useState } from "react";
import { getPregnancySleepNeeds } from "@/lib/sleep-engine";

const TRIMESTERS: { label: string; value: 1 | 2 | 3 }[] = [
  { label: "First",  value: 1 },
  { label: "Second", value: 2 },
  { label: "Third",  value: 3 },
];

export default function PregnancyTab() {
  const [trimester, setTrimester] = useState<1 | 2 | 3>(1);
  const data = getPregnancySleepNeeds(trimester);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-mist mb-3">Trimester:</p>
        <div className="flex gap-2">
          {TRIMESTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTrimester(value)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                trimester === value
                  ? "bg-ember text-ink"
                  : "bg-dusk border border-moon/8 text-mist hover:text-linen"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-ember/40 bg-ember/10 p-5">
        <p className="text-sm font-semibold text-ember mb-1">Recommended Sleep</p>
        <p className="font-serif text-4xl text-linen">{data.range.min}–{data.range.max}h</p>
        <p className="text-mist text-sm mt-1">per night · ACOG + NSF guidelines</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold text-linen mb-3">Common sleep issues</p>
          <ul className="space-y-2">
            {data.commonIssues.map((issue) => (
              <li key={issue} className="flex gap-2 text-sm text-mist">
                <span className="text-red-400 shrink-0">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-linen mb-3">Sleep tips</p>
          <ul className="space-y-2">
            {data.tips.map((tip) => (
              <li key={tip} className="flex gap-2 text-sm text-mist">
                <span className="text-ember shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-mist/70">
        Source: American College of Obstetricians and Gynecologists (ACOG), National Sleep Foundation.
      </p>
    </div>
  );
}
