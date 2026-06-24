import Link from "next/link";
import type { Post } from "@/lib/supabase/types";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
        <time className="text-xs text-slate-500" dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 text-sm text-slate-400 line-clamp-3">{post.excerpt}</p>
        <span className="inline-block mt-4 text-sm text-indigo-400 font-medium group-hover:text-indigo-300">
          Read more →
        </span>
      </article>
    </Link>
  );
}
