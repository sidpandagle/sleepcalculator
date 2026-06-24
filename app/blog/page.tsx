import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import BlogCard from "@/components/blog/BlogCard";
import type { Post } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Sleep Blog — Tips, Science & Guides",
  description:
    "Evidence-based articles on sleep cycles, bedtime routines, sleep calculators, and how to improve your sleep quality.",
  openGraph: {
    title: "Sleep Blog — Tips, Science & Guides",
    description:
      "Evidence-based articles on sleep cycles, bedtime routines, and improving sleep quality.",
    url: "https://thesleepcalculator.co/blog",
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const typedPosts = (posts ?? []) as unknown as Post[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">Sleep Blog</h1>
        <p className="text-slate-400 mt-3">
          Evidence-based guides on sleep science, cycles, and better rest.
        </p>
      </div>

      {typedPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {typedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          <p>No posts published yet. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
