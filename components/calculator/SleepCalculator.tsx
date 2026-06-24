"use client";
import { useState } from "react";
import WakeUpTab from "./WakeUpTab";
import BedtimeTab from "./BedtimeTab";

const TABS = [
  { id: "bedtime", label: "Wake up at" },
  { id: "wakeup", label: "Go to bed at" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SleepCalculator() {
  const [active, setActive] = useState<TabId>("bedtime");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
      <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 text-sm font-medium py-2.5 px-3 rounded-lg transition-all ${
              active === tab.id
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active === "wakeup" && <WakeUpTab />}
      {active === "bedtime" && <BedtimeTab />}
    </section>
  );
}
