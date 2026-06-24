import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white dark:text-white">
          <span className="text-2xl">🌙</span>
          <span className="text-white dark:text-white text-slate-900">The Sleep Calculator</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors">
            Calculator
          </Link>
          <Link href="/blog" className="text-sm text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors">
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
