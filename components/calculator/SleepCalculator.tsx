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
    <section
      className="min-w-0 rounded-[26px] border border-moon/10 p-6 sm:p-[34px]"
      style={{
        background: "linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))",
        boxShadow: "0 40px 90px -40px rgba(0,0,0,0.9)",
      }}
    >
      <div className="grid grid-cols-2 gap-1 p-1 rounded-[14px] bg-black/32">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`text-[14.5px] font-medium py-[11px] px-3 rounded-[11px] transition-all cursor-pointer ${
              active === tab.id
                ? "bg-white/10 text-linen"
                : "text-mist hover:text-linen"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-[34px]">
        {active === "wakeup" && <WakeUpTab />}
        {active === "bedtime" && <BedtimeTab />}
      </div>
    </section>
  );
}
