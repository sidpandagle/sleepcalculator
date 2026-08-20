import type { Post } from "@/lib/supabase/types";

export default function BlogPost({ post }: { post: Post }) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <article className="max-w-[68ch] mx-auto px-4 sm:px-8 pt-14 pb-20">
      <header className="mb-9">
        <div className="flex items-center gap-3 text-[13px] text-mist/80">
          <span className="px-2.5 py-1 rounded-full border border-[#9FB2FF]/28 text-[#B6C3FF]">Sleep science</span>
          <time dateTime={post.created_at}>{date}</time>
        </div>
        <h1 className="mt-5 font-serif font-normal text-4xl sm:text-5xl leading-[1.06] tracking-tight text-linen">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-mist/90">{post.excerpt}</p>
        <div className="flex items-center gap-3 mt-7 py-4 border-t border-b border-moon/8">
          <div
            className="w-9 h-9 rounded-full shrink-0"
            style={{ background: "linear-gradient(150deg,#9FB2FF,#5C6CD8)" }}
          />
          <div>
            <div className="text-[14.5px] font-semibold text-linen">Siddhant Pandagle</div>
            <div className="text-[13px] text-mist/70">Reviewed against CDC and NSF guidance</div>
          </div>
        </div>
      </header>
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-linen
          prose-p:text-mist prose-p:leading-relaxed
          prose-a:text-ember prose-a:no-underline hover:prose-a:text-ember-light
          prose-strong:text-linen
          prose-blockquote:border-l-2 prose-blockquote:border-[#8B96FF] prose-blockquote:bg-[#9FB2FF]/6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-[#E4E9FA]
          prose-li:text-mist
          prose-code:text-ember-light prose-code:bg-moon/10 prose-code:rounded prose-code:px-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
