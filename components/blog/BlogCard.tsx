import Link from "next/link";
import type { Post } from "@/lib/supabase/types";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-[20px] border border-moon/9 bg-moon/3 p-6 hover:bg-moon/5 hover:border-ember/45 transition-all">
        <time className="text-xs text-mist/70" dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h2 className="mt-2.5 text-[19px] font-semibold text-linen group-hover:text-ember transition-colors">
          {post.title}
        </h2>
        <p className="mt-2.5 text-sm text-mist leading-relaxed line-clamp-3">{post.excerpt}</p>
        <span className="inline-block mt-4 text-sm text-ember font-medium group-hover:text-ember-light">
          Read more →
        </span>
      </article>
    </Link>
  );
}
