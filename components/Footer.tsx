import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p>© {new Date().getFullYear()} sleepschedule.in. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="mailto:siddhant.pandagle1998@gmail.com" className="hover:text-white transition-colors">siddhant.pandagle1998@gmail.com</a>
            <a href="tel:+919146178765" className="hover:text-white transition-colors">+91 9146178765</a>
          </div>
        </div>
        <nav className="flex flex-wrap gap-6">
          <Link href="/" className="hover:text-white transition-colors">Sleep Calculator</Link>
          <Link href="/nap-calculator" className="hover:text-white transition-colors">Nap Calculator</Link>
          <Link href="/sleep-duration-calculator" className="hover:text-white transition-colors">Duration Calculator</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
