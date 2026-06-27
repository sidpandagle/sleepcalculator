import type { MetadataRoute } from "next";
import { createBrowserClient } from "@supabase/ssr";
import type { Post } from "@/lib/supabase/types";
import {
  generateAllWakeUpTimes,
  generateSleepDebtSlugs,
  generateREMSlugs,
  generatePregnancySlugs,
  generateBabySlugs,
  generateSleepDurationSlugs,
} from "@/lib/programmatic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    { url: "https://sleepschedule.in",                            lastModified: new Date("2026-06-27"), changeFrequency: "weekly",  priority: 1   },
    { url: "https://sleepschedule.in/nap-calculator",             lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://sleepschedule.in/sleep-duration-calculator",  lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://sleepschedule.in/sleep-debt-calculator",      lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://sleepschedule.in/rem-sleep-calculator",       lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://sleepschedule.in/pregnancy-sleep-calculator", lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://sleepschedule.in/baby-sleep-calculator",      lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://sleepschedule.in/about",                      lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://sleepschedule.in/blog",                       lastModified: new Date("2026-06-27"), changeFrequency: "weekly",  priority: 0.7 },
    { url: "https://sleepschedule.in/terms",                      lastModified: new Date("2026-06-27"), changeFrequency: "yearly",  priority: 0.4 },
    { url: "https://sleepschedule.in/contact",                    lastModified: new Date("2026-06-27"), changeFrequency: "yearly",  priority: 0.4 },
  ];

  const programmaticUrls: MetadataRoute.Sitemap = [
    ...generateAllWakeUpTimes().map(({ slug }) => ({
      url: `https://sleepschedule.in/sleep-calculator/${slug}`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...generateSleepDebtSlugs().map(({ slug }) => ({
      url: `https://sleepschedule.in/sleep-debt-calculator/${slug}`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...generateREMSlugs().map(({ slug }) => ({
      url: `https://sleepschedule.in/rem-sleep-calculator/${slug}`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...generatePregnancySlugs().map(({ slug }) => ({
      url: `https://sleepschedule.in/pregnancy-sleep-calculator/${slug}`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...generateBabySlugs().map(({ slug }) => ({
      url: `https://sleepschedule.in/baby-sleep-calculator/${slug}`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...generateSleepDurationSlugs().map(({ slug }) => ({
      url: `https://sleepschedule.in/sleep-duration-calculator/${slug}`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!supabaseUrl.startsWith("http")) return [...staticUrls, ...programmaticUrls];

  const supabase = createBrowserClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  const blogUrls: MetadataRoute.Sitemap = ((posts ?? []) as Pick<Post, "slug" | "updated_at">[]).map((post) => ({
    url: `https://sleepschedule.in/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...programmaticUrls, ...blogUrls];
}
