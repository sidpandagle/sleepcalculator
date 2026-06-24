import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="text-2xl">🌙</span>
          <span>Sleep Schedule</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors">
            Calculator
          </Link>
          <Link href="/blog" className="text-sm text-slate-300 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
