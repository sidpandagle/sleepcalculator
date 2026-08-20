import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
    openGraph: { url: `https://sleepschedule.in/rem-sleep-calculator/${slug}` },
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
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
        <nav className="text-sm text-mist mb-8">
          <Link href="/" className="hover:text-linen transition-colors">Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <Link href="/rem-sleep-calculator" className="hover:text-linen transition-colors">REM Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-mist">{hours} Hours</span>
        </nav>

        <h1 className="font-serif font-normal text-4xl md:text-5xl text-linen mb-3 leading-tight">
          REM Sleep in {hours} Hours of Sleep
        </h1>
        <p className="text-mist mb-10 text-lg">
          {result.cycles > 0
            ? `${hours} hours of sleep gives you ${result.cycles} complete sleep cycle${result.cycles !== 1 ? "s" : ""} and approximately ${result.remMinutes} minutes of REM sleep.`
            : `${hours} hours is less than one complete 90-minute cycle. You get minimal REM sleep.`}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-ember/30 bg-ember/10 p-5">
            <p className="text-sm font-semibold text-ember-light mb-1">Total REM Sleep</p>
            <p className="text-linen font-bold text-3xl">{result.remMinutes} min</p>
            <p className="text-mist text-sm mt-1">{result.remPercent}% of total sleep</p>
          </div>
          <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
            <p className="text-sm font-semibold text-mist mb-1">Sleep Cycles</p>
            <p className="text-linen font-bold text-3xl">{result.cycles}</p>
            <p className="text-mist text-sm mt-1">complete 90-min cycles</p>
          </div>
        </div>

        {result.cycles > 0 && (
          <section className="mb-12">
            <h2 className="font-serif font-normal text-2xl text-linen mb-4">REM breakdown by cycle at {hours} hours</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-moon/8 text-mist">
                    <th className="pb-2 pr-6 font-medium">Cycle</th>
                    <th className="pb-2 font-medium">REM Sleep</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map(({ cycle, remMinutes: rem }) => (
                    <tr key={cycle} className="border-b border-moon/5 text-mist">
                      <td className="py-2.5 pr-6 font-semibold text-linen">Cycle {cycle}</td>
                      <td className="py-2.5 text-ember-light font-medium">{rem} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="font-serif font-normal text-2xl text-linen mb-4">Frequently asked questions</h2>
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
          <h2 className="font-serif font-normal text-2xl text-linen mb-4">Other sleep durations</h2>
          <div className="flex flex-wrap gap-2">
            {neighbors.map(({ slug: s, hours: h }) => (
              <Link
                key={s}
                href={`/rem-sleep-calculator/${s}`}
                className="px-3.5 py-1.5 rounded-full border border-moon/8 bg-dusk text-sm text-mist hover:text-linen hover:bg-moon/5 transition-colors"
              >
                {h}h of sleep
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-mist/70">
            Try the interactive calculator:{" "}
            <Link href="/rem-sleep-calculator" className="text-ember hover:text-ember-light transition-colors">
              REM Sleep Calculator →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
