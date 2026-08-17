import type { Post } from "@/lib/supabase/types";

const SITE_URL = "https://sleepschedule.in";
const SITE_NAME = "Sleep Schedule";
const SITE_AUTHOR = "Siddhant Pandagle";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.ico`,
      width: 48,
      height: 48,
    },
    contactPoint: {
      "@type": "ContactPoint",
      url: `${SITE_URL}/contact`,
      contactType: "customer support",
    },
  };
}

export function buildWebAppSchema(
  name: string,
  url: string,
  description: string,
  options?: { dateModified?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    ...(options?.dateModified && { dateModified: options.dateModified }),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildArticleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.cover_image && {
      image: { "@type": "ImageObject", url: post.cover_image, width: 1200, height: 630 },
    }),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
        width: 48,
        height: 48,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR,
    url: `${SITE_URL}/about`,
    jobTitle: "Software Developer",
    knowsAbout: ["Sleep science", "Sleep cycles", "Circadian rhythm"],
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
