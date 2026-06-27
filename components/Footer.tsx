import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4 pb-6 text-xs text-slate-500 text-center border-b border-white/5 mb-6">
        This tool provides general health information only and is not a substitute for professional medical advice. Always consult your doctor or healthcare provider.
      </div>
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4 text-sm text-slate-400 text-center">
        <p>© {new Date().getFullYear()} sleepschedule.in. All rights reserved.</p>
        <div className="flex flex-col items-center gap-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-white transition-colors">Sleep Calculator</Link>
            <Link href="/nap-calculator" className="hover:text-white transition-colors">Nap Calculator</Link>
            <Link href="/rem-sleep-calculator" className="hover:text-white transition-colors">REM Calculator</Link>
            <Link href="/sleep-debt-calculator" className="hover:text-white transition-colors">Sleep Debt</Link>
            <Link href="/sleep-duration-calculator" className="hover:text-white transition-colors">Duration Calculator</Link>
            <Link href="/pregnancy-sleep-calculator" className="hover:text-white transition-colors">Pregnancy</Link>
            <Link href="/baby-sleep-calculator" className="hover:text-white transition-colors">Baby Sleep</Link>
          </nav>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
