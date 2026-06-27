import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generateAllWakeUpTimes, slugToHhmm, getNeighborSlugs } from "@/lib/programmatic";
import { calculateBedtimes } from "@/lib/sleep-engine";
import { display12h } from "@/lib/time-utils";
import ResultCard from "@/components/calculator/ResultCard";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildWebAppSchema } from "@/lib/seo/schemas";

export function generateStaticParams() {
  return generateAllWakeUpTimes().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hhmm = slugToHhmm(slug);
  if (!hhmm) return {};
  const display = display12h(hhmm);
  return {
    title: `Bedtime Calculator for ${display} Wake Up`,
    description: `If you want to wake up at ${display}, find the best time to go to sleep based on 90-minute sleep cycles. Avoid grogginess with perfectly timed bedtimes.`,
    alternates: { canonical: `https://sleepschedule.in/sleep-calculator/${slug}` },
    openGraph: { url: `https://sleepschedule.in/sleep-calculator/${slug}` },
  };
}

export default async function WakeUpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hhmm = slugToHhmm(slug);
  if (!hhmm) notFound();

  const display = display12h(hhmm);
  const bedtimes = calculateBedtimes(hhmm);
  const recommended = bedtimes.filter((b) => b.recommended);
  const neighbors = getNeighborSlugs(hhmm, 4);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What time should I go to sleep if I wake up at ${display}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `To wake up at ${display} feeling refreshed, go to bed at ${recommended.map((b) => display12h(b.time)).join(" or ")}. These times align with complete 90-minute sleep cycles (5–6 cycles, 7.5–9 hours).`,
        },
      },
      {
        "@type": "Question",
        name: "Why are sleep times based on 90-minute cycles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your brain cycles through light sleep, deep sleep, and REM roughly every 90 minutes. Waking at the end of a cycle instead of mid-cycle dramatically reduces grogginess (sleep inertia).",
        },
      },
      {
        "@type": "Question",
        name: "Why is a 15-minute buffer added to bedtimes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The average person takes 10–20 minutes to fall asleep. This calculator adds 15 minutes to your target bedtime so your cycles are calculated from when you actually fall asleep, not when you lie down.",
        },
      },
    ],
  };

  const webAppSchema = buildWebAppSchema(
    `Bedtime Calculator for ${display} Wake Up`,
    `https://sleepschedule.in/sleep-calculator/${slug}`,
    `Find the best time to go to sleep to wake up at ${display} feeling refreshed, based on 90-minute sleep cycles.`
  );

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <BreadcrumbSchema items={[
        { name: "Sleep Calculator", url: "https://sleepschedule.in" },
        { name: `Wake up at ${display}`, url: `https://sleepschedule.in/sleep-calculator/${slug}` },
      ]} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">Wake up at {display}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          What time should I go to sleep to wake up at {display}?
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          Based on 90-minute sleep cycles. Go to bed at one of these times to wake up at {display} feeling refreshed.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {[...bedtimes].reverse().map((b) => (
            <ResultCard key={b.cycles} {...b} />
          ))}
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 mb-12">
          <p className="text-sm font-semibold text-indigo-300 mb-1">Best bedtimes for {display} wake-up</p>
          <p className="text-white font-bold text-lg">
            {recommended.map((b) => display12h(b.time)).join(" or ")}
          </p>
          <p className="text-slate-400 text-sm mt-1">5–6 sleep cycles · 7.5–9 hours · CDC recommended for adults</p>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">How this is calculated</h2>
          <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
            <p>
              Your body moves through 90-minute sleep cycles — each one contains light sleep, deep sleep, and REM. Waking up at the <strong className="text-slate-200">end</strong> of a cycle means less grogginess.
            </p>
            <p>
              This calculator works backwards from your {display} wake time. It subtracts complete 90-minute cycles, then adds a 15-minute fall-asleep buffer so your timing is accurate from when you actually fall asleep.
            </p>
            <p>
              Most adults need 5–6 cycles (7.5–9 hours) per the CDC. The bedtimes highlighted as &ldquo;Recommended&rdquo; hit that range.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">All bedtimes if you wake at {display}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-6 font-medium">Bedtime</th>
                  <th className="pb-2 pr-6 font-medium">Sleep cycles</th>
                  <th className="pb-2 pr-6 font-medium">Hours of sleep</th>
                  <th className="pb-2 font-medium">Quality</th>
                </tr>
              </thead>
              <tbody>
                {[...bedtimes].reverse().map((b) => (
                  <tr key={b.cycles} className="border-b border-white/5 text-slate-300">
                    <td className="py-2.5 pr-6 font-semibold text-white">{display12h(b.time)}</td>
                    <td className="py-2.5 pr-6">{b.cycles}</td>
                    <td className="py-2.5 pr-6">{b.hours}h</td>
                    <td className="py-2.5">
                      {b.recommended
                        ? <span className="text-indigo-400 font-medium">Recommended</span>
                        : <span className="text-slate-500">Minimum</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `What time should I go to sleep if I wake up at ${display}?`,
                a: `Go to bed at ${recommended.map((b) => display12h(b.time)).join(" or ")} to wake up at ${display} after 5–6 complete sleep cycles (7.5–9 hours). These are the CDC-recommended amounts for adults.`,
              },
              {
                q: "Why are sleep times based on 90-minute cycles?",
                a: "Your brain cycles through light sleep, deep sleep, and REM roughly every 90 minutes. Waking at the end of a cycle instead of the middle dramatically reduces grogginess (sleep inertia).",
              },
              {
                q: "Why is a 15-minute buffer added to bedtimes?",
                a: "The average person takes 10–20 minutes to fall asleep. Adding 15 minutes ensures your cycles are timed from when you actually fall asleep, not just when you get into bed.",
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
          <h2 className="text-xl font-bold text-white mb-4">Similar wake-up times</h2>
          <div className="flex flex-wrap gap-2">
            {neighbors.map(({ slug: s, display: d }) => (
              <Link
                key={s}
                href={`/sleep-calculator/${s}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Wake up at {d}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Want to calculate from a different time?{" "}
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Use the full sleep calculator →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
