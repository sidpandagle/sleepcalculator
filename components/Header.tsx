import Link from "next/link";

const CALCULATORS = [
  { href: "/", label: "Sleep Calculator", desc: "Bedtime & wake-up times" },
  { href: "/nap-calculator", label: "Nap Calculator", desc: "Power nap & full cycle" },
  { href: "/sleep-duration-calculator", label: "Duration Calculator", desc: "How much sleep you need" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="text-2xl">🌙</span>
          <span>Sleep Schedule</span>
        </Link>
        <nav className="flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors py-1">
              Calculators
              <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">▾</span>
            </button>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block">
              <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[220px]">
                {CALCULATORS.map(({ href, label, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <span className="text-sm font-medium text-white">{label}</span>
                    <span className="text-xs text-slate-400 mt-0.5">{desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/blog" className="text-sm text-slate-300 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
