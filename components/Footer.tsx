import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} The Sleep Calculator. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
        </nav>
      </div>
    </footer>
  );
}
