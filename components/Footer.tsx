import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-moon/8 mt-24 bg-black/25">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-12 pb-9 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2.5">
            <span
              className="w-[26px] h-[26px] rounded-[9px] shrink-0"
              style={{ background: "linear-gradient(150deg,#9FB2FF,#5C6CD8)" }}
            />
            <span className="text-[15.5px] font-semibold text-linen">Sleep Schedule</span>
          </div>
          <p className="text-[13.5px] leading-relaxed text-mist mt-3.5 max-w-[34ch]">
            Science-based sleep calculators. Free, no account required.
          </p>
        </div>

        <div>
          <div className="text-[12.5px] tracking-widest uppercase text-mist/70 mb-3.5">Calculators</div>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/" className="text-mist hover:text-linen transition-colors">Sleep</Link>
            <Link href="/nap-calculator" className="text-mist hover:text-linen transition-colors">Nap</Link>
            <Link href="/rem-sleep-calculator" className="text-mist hover:text-linen transition-colors">REM</Link>
            <Link href="/sleep-debt-calculator" className="text-mist hover:text-linen transition-colors">Sleep debt</Link>
          </nav>
        </div>

        <div>
          <div className="text-[12.5px] tracking-widest uppercase text-mist/70 mb-3.5">More tools</div>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/sleep-duration-calculator" className="text-mist hover:text-linen transition-colors">Duration</Link>
            <Link href="/pregnancy-sleep-calculator" className="text-mist hover:text-linen transition-colors">Pregnancy</Link>
            <Link href="/baby-sleep-calculator" className="text-mist hover:text-linen transition-colors">Baby sleep</Link>
          </nav>
        </div>

        <div>
          <div className="text-[12.5px] tracking-widest uppercase text-mist/70 mb-3.5">Site</div>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="text-mist hover:text-linen transition-colors">About</Link>
            <Link href="/blog" className="text-mist hover:text-linen transition-colors">Blog</Link>
            <Link href="/privacy" className="text-mist hover:text-linen transition-colors">Privacy</Link>
            <Link href="/terms" className="text-mist hover:text-linen transition-colors">Terms</Link>
            <Link href="/contact" className="text-mist hover:text-linen transition-colors">Contact</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-6 text-[12px] leading-relaxed text-mist/70 border-t border-moon/5 pt-6">
        This tool provides general health information only and is not a substitute for professional medical advice. Always consult your doctor or healthcare provider.
      </div>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-9 text-[12.5px] text-mist/60">
        © {new Date().getFullYear()} sleepschedule.in · General health information, not medical advice.
      </div>
    </footer>
  );
}
