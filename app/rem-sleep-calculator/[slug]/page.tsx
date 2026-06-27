import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generateREMSlugs, slugToREMHours } from "@/lib/programmatic";
import { calculateREMSleep } from "@/lib/sleep-engine";
import StructuredData from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return generateREMSlugs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hours = slugToREMHours(slug);
  if (!hours) return {};
  return {
    title: `REM Sleep Calculator — ${hours} Hours of Sleep`,
    description: `How much REM sleep do you get in ${hours} hours? See estimated REM time broken down by sleep cycle.`,
    alternates: { canonical: `https://sleepschedule.in/rem-sleep-calculator/${slug}` },
  };
}

export default async function REMSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hours = slugToREMHours(slug);
  if (!hours) notFound();

  const result = calculateREMSleep(hours);

  const allSlugs = generateREMSlugs();
  const idx = allSlugs.findIndex((s) => s.slug === slug);
  const neighbors = [
    allSlugs[idx - 2],
    allSlugs[idx - 1],
    allSlugs[idx + 1],
    allSlugs[idx + 2],
  ].filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much REM sleep do you get in ${hours} hours?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: result.cycles > 0
            ? `In ${hours} hours of sleep (${result.cycles} complete sleep cycles), you get approximately ${result.remMinutes} minutes of REM sleep — about ${result.remPercent}% of total sleep time.`
            : `${hours} hours is less than one 90-minute sleep cycle, so you get very little or no REM sleep.`,
        },
      },
      {
        "@type": "Question",
        name: "Why does REM sleep increase later in the night?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each sleep cycle ends with a REM period that grows longer as the night progresses. The first REM period lasts about 10 minutes; by cycles 4–5 it can last 40–50 minutes. This is why cutting sleep short — even by 1–2 hours — disproportionately reduces total REM.",
        },
      },
      {
        "@type": "Question",
        name: "Is 20% REM sleep normal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Healthy adults spend 20–25% of total sleep in REM. Lower percentages may indicate alcohol use, certain medications, or sleep disorders. Higher percentages can occur after REM deprivation (REM rebound).",
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
          <Link href="/rem-sleep-calculator" className="hover:text-white transition-colors">REM Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">{hours} Hours</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          REM Sleep in {hours} Hours of Sleep
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          {result.cycles > 0
            ? `${hours} hours of sleep gives you ${result.cycles} complete sleep cycle${result.cycles !== 1 ? "s" : ""} and approximately ${result.remMinutes} minutes of REM sleep.`
            : `${hours} hours is less than one complete 90-minute cycle. You get minimal REM sleep.`}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5">
            <p className="text-sm font-semibold text-indigo-300 mb-1">Total REM Sleep</p>
            <p className="text-white font-bold text-3xl">{result.remMinutes} min</p>
            <p className="text-slate-400 text-sm mt-1">{result.remPercent}% of total sleep</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-slate-400 mb-1">Sleep Cycles</p>
            <p className="text-white font-bold text-3xl">{result.cycles}</p>
            <p className="text-slate-400 text-sm mt-1">complete 90-min cycles</p>
          </div>
        </div>

        {result.cycles > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">REM breakdown by cycle at {hours} hours</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2 pr-6 font-medium">Cycle</th>
                    <th className="pb-2 font-medium">REM Sleep</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map(({ cycle, remMinutes: rem }) => (
                    <tr key={cycle} className="border-b border-white/5 text-slate-300">
                      <td className="py-2.5 pr-6 font-semibold text-white">Cycle {cycle}</td>
                      <td className="py-2.5 text-indigo-300 font-medium">{rem} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `How much REM sleep do you get in ${hours} hours?`,
                a: result.cycles > 0
                  ? `In ${hours} hours (${result.cycles} sleep cycles), you get approximately ${result.remMinutes} minutes of REM — ${result.remPercent}% of total sleep time.`
                  : `${hours} hours is less than one 90-minute cycle, so you get minimal REM sleep.`,
              },
              {
                q: "Why does REM increase later in the night?",
                a: "Each cycle's REM period grows longer as the night progresses — from ~10 min in cycle 1 to up to 50 min in cycles 4–5. Cutting sleep short disproportionately reduces total REM.",
              },
              {
                q: "Is 20% REM sleep normal?",
                a: "Yes. Healthy adults spend 20–25% of total sleep in REM. Lower amounts can indicate alcohol use, certain medications, or sleep disorders.",
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
          <h2 className="text-xl font-bold text-white mb-4">Other sleep durations</h2>
          <div className="flex flex-wrap gap-2">
            {neighbors.map(({ slug: s, hours: h }) => (
              <Link
                key={s}
                href={`/rem-sleep-calculator/${s}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {h}h of sleep
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Try the interactive calculator:{" "}
            <Link href="/rem-sleep-calculator" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              REM Sleep Calculator →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
