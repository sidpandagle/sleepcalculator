"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

const CALCULATORS = [
  { href: "/",                            label: "Sleep Calculator",         desc: "Bedtime & wake-up times",          icon: "🌙" },
  { href: "/nap-calculator",              label: "Nap Calculator",           desc: "Power nap & full cycle",           icon: "💤" },
  { href: "/sleep-duration-calculator",   label: "Duration Calculator",      desc: "How much sleep you need",          icon: "⏱️" },
  { href: "/sleep-debt-calculator",       label: "Sleep Debt Calculator",    desc: "How much sleep you've lost",       icon: "📉" },
  { href: "/rem-sleep-calculator",        label: "REM Sleep Calculator",     desc: "REM time by sleep hours",          icon: "🧠" },
  { href: "/pregnancy-sleep-calculator",  label: "Pregnancy Calculator",     desc: "Sleep needs by trimester",         icon: "🤰" },
  { href: "/baby-sleep-calculator",       label: "Baby Sleep Calculator",    desc: "Sleep schedule by baby age",       icon: "👶" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  };

  const isCalcActive = CALCULATORS.some((c) => c.href === pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-base text-white hover:opacity-80 transition-opacity"
        >
          <span className="text-xl leading-none">🌙</span>
          <span className="tracking-tight">Sleep Schedule</span>
        </Link>

        <nav className="flex items-center gap-1">
          {/* Calculators dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              aria-haspopup="true"
              aria-expanded={open}
              className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-all ${
                isCalcActive
                  ? "text-white bg-white/8"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Calculators
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""} ${
                  isCalcActive ? "text-slate-300" : "text-slate-500"
                }`}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Invisible bridge to fill gap between button and dropdown */}
            <div className="absolute left-0 right-0 h-2 top-full" />

            <div
              className={`absolute right-0 top-[calc(100%+6px)] transition-all duration-150 origin-top ${
                open
                  ? "opacity-100 scale-y-100 pointer-events-auto"
                  : "opacity-0 scale-y-95 pointer-events-none"
              }`}
              style={{ transformOrigin: "top right" }}
            >
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/40 min-w-[240px] overflow-hidden">
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[10px] font-medium tracking-widest text-slate-500 uppercase">
                    Tools
                  </span>
                </div>
                {CALCULATORS.map(({ href, label, desc, icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3 px-3 py-2.5 mx-1.5 mb-1 rounded-lg transition-colors ${
                        active
                          ? "bg-indigo-500/15 text-white"
                          : "hover:bg-white/5 text-slate-200"
                      }`}
                    >
                      <span className="text-base leading-none mt-0.5 shrink-0">{icon}</span>
                      <span className="flex flex-col min-w-0">
                        <span className={`text-sm font-medium leading-tight ${active ? "text-indigo-300" : "text-white"}`}>
                          {label}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5 leading-tight">{desc}</span>
                      </span>
                      {active && (
                        <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                      )}
                    </Link>
                  );
                })}
                <div className="h-2" />
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            className={`text-sm px-3 py-2 rounded-lg transition-all ${
              pathname === "/blog" || pathname?.startsWith("/blog/")
                ? "text-white bg-white/8"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
