import type { MetadataRoute } from "next";
import { createBrowserClient } from "@supabase/ssr";
import type { Post } from "@/lib/supabase/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: "https://thesleepcalculator.co",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://thesleepcalculator.co/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!supabaseUrl.startsWith("http")) return staticUrls;

  const supabase = createBrowserClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  const blogUrls: MetadataRoute.Sitemap = ((posts ?? []) as Pick<Post, "slug" | "updated_at">[]).map((post) => ({
    url: `https://thesleepcalculator.co/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls];
}
