"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Moon, BedDouble, Clock, TrendingDown, Brain, Heart, Baby } from "lucide-react";

const CALCULATORS = [
  { href: "/",                            label: "Sleep Calculator",         desc: "Bedtime & wake-up times",          Icon: Moon },
  { href: "/nap-calculator",              label: "Nap Calculator",           desc: "Power nap & full cycle",           Icon: BedDouble },
  { href: "/sleep-duration-calculator",   label: "Duration Calculator",      desc: "How much sleep you need",          Icon: Clock },
  { href: "/sleep-debt-calculator",       label: "Sleep Debt Calculator",    desc: "How much sleep you've lost",       Icon: TrendingDown },
  { href: "/rem-sleep-calculator",        label: "REM Sleep Calculator",     desc: "REM time by sleep hours",          Icon: Brain },
  { href: "/pregnancy-sleep-calculator",  label: "Pregnancy Calculator",     desc: "Sleep needs by trimester",         Icon: Heart },
  { href: "/baby-sleep-calculator",       label: "Baby Sleep Calculator",    desc: "Sleep schedule by baby age",       Icon: Baby },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isCalcActive = CALCULATORS.some((c) => c.href === pathname);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/72 border-b border-moon/7">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-4 flex items-center gap-6 sm:gap-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity"
        >
          <span
            className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(150deg,#9FB2FF,#5C6CD8)" }}
          >
            <Moon className="w-3.5 h-3.5 text-ink" fill="currentColor" aria-hidden="true" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-linen">Sleep Schedule</span>
        </Link>

        <nav className="flex items-center gap-1 flex-1">
          {/* Calculators dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-[14.5px] px-3.5 py-2 rounded-[11px] transition-all cursor-pointer ${
                isCalcActive
                  ? "text-linen bg-moon/8"
                  : "text-mist hover:text-linen hover:bg-moon/5"
              }`}
            >
              Calculators
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""} ${
                  isCalcActive ? "text-mist" : "text-mist/70"
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
              <div className="bg-[#0D111F] border border-moon/10 rounded-xl shadow-2xl shadow-black/40 min-w-[240px] overflow-hidden">
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[10px] font-medium tracking-widest text-mist/70 uppercase">
                    Tools
                  </span>
                </div>
                {CALCULATORS.map(({ href, label, desc, Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3 px-3 py-2.5 mx-1.5 mb-1 rounded-lg transition-colors ${
                        active
                          ? "bg-[#9FB2FF]/15 text-linen"
                          : "hover:bg-moon/5 text-mist"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${active ? "text-[#9FB2FF]" : "text-mist/70"}`} aria-hidden="true" />
                      <span className="flex flex-col min-w-0">
                        <span className={`text-sm font-medium leading-tight ${active ? "text-[#B6C3FF]" : "text-linen"}`}>
                          {label}
                        </span>
                        <span className="text-xs text-mist mt-0.5 leading-tight">{desc}</span>
                      </span>
                      {active && (
                        <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-[#9FB2FF] mt-1.5" />
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
            className={`text-[14.5px] px-3.5 py-2 rounded-[11px] transition-all ${
              pathname === "/blog" || pathname?.startsWith("/blog/")
                ? "text-linen bg-moon/8"
                : "text-mist hover:text-linen hover:bg-moon/5"
            }`}
          >
            Blog
          </Link>
        </nav>

        <span className="hidden sm:block text-[13px] text-mist/80 shrink-0">CDC-aligned · Free</span>
      </div>
    </header>
  );
}
