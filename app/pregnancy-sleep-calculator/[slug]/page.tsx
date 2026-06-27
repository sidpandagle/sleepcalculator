import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <Link href="/pregnancy-sleep-calculator" className="hover:text-white transition-colors">Pregnancy Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">{label} Trimester</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          {label} Trimester Sleep: How Much Do You Need?
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          ACOG and NSF guidelines recommend {data.range.min}–{data.range.max} hours of sleep per night during the {label.toLowerCase()} trimester.
        </p>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 mb-10">
          <p className="text-sm font-semibold text-indigo-300 mb-1">{label} trimester recommendation</p>
          <p className="text-white font-bold text-3xl">{data.range.min}–{data.range.max} hours</p>
          <p className="text-slate-400 text-sm mt-1">per night · ACOG + NSF guidelines</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Common sleep issues</h2>
            <ul className="space-y-3">
              {data.commonIssues.map((issue) => (
                <li key={issue} className="flex gap-3 text-sm text-slate-400">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Sleep tips</h2>
            <ul className="space-y-3">
              {data.tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm text-slate-400">
                  <span className="text-indigo-400 shrink-0 mt-0.5">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Frequently asked questions</h2>
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
              <details key={q} className="group rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                <summary className="font-medium text-white list-none flex justify-between items-center p-5">
                  {q}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Other trimesters</h2>
          <div className="flex flex-wrap gap-2">
            {otherSlugs.map(({ slug: s, trimester: t }) => (
              <Link
                key={s}
                href={`/pregnancy-sleep-calculator/${s}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {TRIMESTER_LABELS[t]} trimester
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <Link href="/pregnancy-sleep-calculator" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              ← Back to Pregnancy Sleep Calculator
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
