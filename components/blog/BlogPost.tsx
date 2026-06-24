import type { Post } from "@/lib/supabase/types";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <time className="text-sm text-slate-500" dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-3 text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-400">{post.excerpt}</p>
      </header>
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
          prose-strong:text-white
          prose-li:text-slate-300
          prose-code:text-indigo-300 prose-code:bg-white/10 prose-code:rounded prose-code:px-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
