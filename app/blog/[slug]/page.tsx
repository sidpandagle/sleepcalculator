import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase/server";
import BlogPost from "@/components/blog/BlogPost";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildArticleSchema } from "@/lib/seo/schemas";
import type { Post } from "@/lib/supabase/types";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!url.startsWith("http")) return [];
  // Use a cookie-free client — no request context during static build
  const supabase = createBrowserClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);
  return ((posts ?? []) as Pick<Post, "slug">[]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  const typedPost = post as unknown as Post;

  return {
    title: typedPost.title,
    description: typedPost.meta_description || typedPost.excerpt,
    openGraph: {
      title: typedPost.title,
      description: typedPost.meta_description || typedPost.excerpt,
      type: "article",
      publishedTime: typedPost.created_at,
      url: `https://sleepschedule.in/blog/${typedPost.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const typedPost = post as unknown as Post;

  const articleSchema = buildArticleSchema(typedPost);
  const breadcrumbs = [
    { name: "Home", url: "https://sleepschedule.in" },
    { name: "Blog", url: "https://sleepschedule.in/blog" },
    { name: typedPost.title, url: `https://sleepschedule.in/blog/${typedPost.slug}` },
  ];

  return (
    <>
      <StructuredData data={articleSchema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPost post={typedPost} />
    </>
  );
}
