import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { generatePregnancySlugs, slugToTrimester } from "@/lib/programmatic";
import { getPregnancySleepNeeds } from "@/lib/sleep-engine";
import StructuredData from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return generatePregnancySlugs().map(({ slug }) => ({ slug }));
}

const TRIMESTER_LABELS: Record<1 | 2 | 3, string> = {
  1: "First",
  2: "Second",
  3: "Third",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trimester = slugToTrimester(slug);
  if (!trimester) return {};
  const label = TRIMESTER_LABELS[trimester];
  return {
    title: `Pregnancy Sleep Calculator — ${label} Trimester`,
    description: `How much sleep do you need in your ${label.toLowerCase()} trimester? Get recommendations, common sleep issues, and tips for better pregnancy sleep.`,
    alternates: { canonical: `https://sleepschedule.in/pregnancy-sleep-calculator/${slug}` },
    openGraph: { url: `https://sleepschedule.in/pregnancy-sleep-calculator/${slug}` },
  };
}

export default async function PregnancySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trimester = slugToTrimester(slug);
  if (!trimester) notFound();

  const data = getPregnancySleepNeeds(trimester);
  const label = TRIMESTER_LABELS[trimester];

  const otherSlugs = generatePregnancySlugs().filter((s) => s.trimester !== trimester);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much sleep do you need in the ${label.toLowerCase()} trimester?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `During the ${label.toLowerCase()} trimester, most healthcare guidelines recommend ${data.range.min}–${data.range.max} hours of sleep per night. ${trimester === 1 ? "Fatigue and rising progesterone make extra rest especially important." : trimester === 2 ? "The second trimester is typically the most comfortable for sleep." : "Discomfort, frequent urination, and restless leg syndrome make sleep more challenging."}`,
        },
      },
      {
        "@type": "Question",
        name: `What are the most common sleep problems in the ${label.toLowerCase()} trimester?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: data.commonIssues.join(". ") + ".",
        },
      },
      {
        "@type": "Question",
        name: `How can I sleep better in the ${label.toLowerCase()} trimester?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: data.tips.join(". ") + ".",
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
        <nav className="text-sm text-mist mb-8">
          <Link href="/" className="hover:text-linen transition-colors">Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <Link href="/pregnancy-sleep-calculator" className="hover:text-linen transition-colors">Pregnancy Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-mist">{label} Trimester</span>
        </nav>

        <h1 className="font-serif font-normal text-4xl md:text-5xl text-linen mb-3 leading-tight">
          {label} Trimester Sleep: How Much Do You Need?
        </h1>
        <p className="text-mist mb-10 text-lg">
          ACOG and NSF guidelines recommend {data.range.min}–{data.range.max} hours of sleep per night during the {label.toLowerCase()} trimester.
        </p>

        <div className="rounded-xl border border-ember/30 bg-ember/10 p-5 mb-10">
          <p className="text-sm font-semibold text-ember-light mb-1">{label} trimester recommendation</p>
          <p className="text-linen font-bold text-3xl">{data.range.min}–{data.range.max} hours</p>
          <p className="text-mist text-sm mt-1">per night · ACOG + NSF guidelines</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <section>
            <h2 className="font-serif font-normal text-2xl text-linen mb-4">Common sleep issues</h2>
            <ul className="space-y-3">
              {data.commonIssues.map((issue) => (
                <li key={issue} className="flex gap-3 text-sm text-mist">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif font-normal text-2xl text-linen mb-4">Sleep tips</h2>
            <ul className="space-y-3">
              {data.tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm text-mist">
                  <span className="text-ember shrink-0 mt-0.5">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-2xl text-linen mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `How much sleep do you need in the ${label.toLowerCase()} trimester?`,
                a: `During the ${label.toLowerCase()} trimester, ACOG and NSF recommend ${data.range.min}–${data.range.max} hours per night.`,
              },
              {
                q: `What are the most common sleep problems in the ${label.toLowerCase()} trimester?`,
                a: data.commonIssues.join(". ") + ".",
              },
              {
                q: `How can I sleep better in the ${label.toLowerCase()} trimester?`,
                a: data.tips.join(". ") + ".",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-[18px] border border-moon/9 bg-dusk cursor-pointer">
                <summary className="font-medium text-linen list-none flex justify-between items-center p-5">
                  {q}
                  <ChevronDown className="w-4 h-4 text-mist group-open:rotate-180 transition-transform shrink-0" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 text-sm text-mist leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-4">Other trimesters</h2>
          <div className="flex flex-wrap gap-2">
            {otherSlugs.map(({ slug: s, trimester: t }) => (
              <Link
                key={s}
                href={`/pregnancy-sleep-calculator/${s}`}
                className="px-3.5 py-1.5 rounded-full border border-moon/8 bg-dusk text-sm text-mist hover:text-linen hover:bg-moon/5 transition-colors"
              >
                {TRIMESTER_LABELS[t]} trimester
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-mist/70">
            <Link href="/pregnancy-sleep-calculator" className="text-ember hover:text-ember-light transition-colors">
              ← Back to Pregnancy Sleep Calculator
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
