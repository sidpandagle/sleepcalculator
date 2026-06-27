import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generateSleepDebtSlugs, slugToSleepDebtHours } from "@/lib/programmatic";
import { calculateSleepDebt, getRecommendedHours } from "@/lib/sleep-engine";
import StructuredData from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return generateSleepDebtSlugs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hours = slugToSleepDebtHours(slug);
  if (!hours) return {};
  return {
    title: `Sleep Debt Calculator — You Slept ${hours} Hour${hours !== 1 ? "s" : ""}`,
    description: `Find out how much sleep debt you've accumulated after ${hours} hour${hours !== 1 ? "s" : ""} of sleep. See your deficit vs CDC recommendations by age group.`,
    alternates: { canonical: `https://sleepschedule.in/sleep-debt-calculator/${slug}` },
    openGraph: { url: `https://sleepschedule.in/sleep-debt-calculator/${slug}` },
  };
}

export default async function SleepDebtSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hours = slugToSleepDebtHours(slug);
  if (!hours) notFound();

  const AGE_GROUPS = [
    { label: "Toddler",     age: 2  },
    { label: "Preschool",   age: 4  },
    { label: "School-age",  age: 9  },
    { label: "Teenager",    age: 15 },
    { label: "Adult",       age: 30 },
    { label: "Older Adult", age: 68 },
  ];

  const results = AGE_GROUPS.map(({ label, age }) => ({
    ...calculateSleepDebt(hours, age),
    label,
  }));

  const adultResult = calculateSleepDebt(hours, 30);
  const rec = getRecommendedHours(30);

  const neighbors = generateSleepDebtSlugs().filter(
    ({ hours: h }) => Math.abs(h - hours) <= 2 && h !== hours
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${hours} hour${hours !== 1 ? "s" : ""} of sleep enough for adults?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: adultResult.debt > 0
            ? `No. Adults need 7–9 hours per night (CDC). ${hours} hours leaves you ${adultResult.debt} hour${adultResult.debt !== 1 ? "s" : ""} short.`
            : `${hours} hours meets the CDC recommendation of 7–9 hours for adults. You are within a healthy sleep range.`,
        },
      },
      {
        "@type": "Question",
        name: "What are the effects of sleep debt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sleep debt impairs memory consolidation, reaction time, immune function, and mood regulation. Chronic sleep debt increases risk of obesity, type 2 diabetes, cardiovascular disease, and depression.",
        },
      },
      {
        "@type": "Question",
        name: "How do I recover from sleep debt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Add 1–2 extra hours per night for several days. Avoid oversleeping in one session as it disrupts circadian rhythm. Consistent adequate sleep over 1–2 weeks restores most cognitive function.",
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
          <Link href="/sleep-debt-calculator" className="hover:text-white transition-colors">Sleep Debt Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">{hours} Hour{hours !== 1 ? "s" : ""} of Sleep</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          Sleep Debt After {hours} Hour{hours !== 1 ? "s" : ""} of Sleep
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          {adultResult.debt > 0
            ? `Sleeping ${hours} hours leaves adults ${adultResult.debt}h short of the CDC minimum. Here's the full breakdown by age group.`
            : `${hours} hours meets or exceeds CDC recommendations for adults. Here's the breakdown by age group.`}
        </p>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 mb-10">
          <p className="text-sm font-semibold text-indigo-300 mb-1">Adult result at {hours}h sleep</p>
          {adultResult.debt > 0 ? (
            <>
              <p className="text-white font-bold text-3xl">{adultResult.debt}h deficit</p>
              <p className="text-slate-400 text-sm mt-1">vs {rec.min}–{rec.max}h CDC recommendation</p>
            </>
          ) : (
            <>
              <p className="text-white font-bold text-3xl">On target</p>
              <p className="text-slate-400 text-sm mt-1">Within {rec.min}–{rec.max}h CDC recommendation</p>
            </>
          )}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Sleep debt by age group at {hours} hours</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">CDC recommended</th>
                  <th className="pb-2 font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map(({ label, debt, surplus, recommended }) => (
                  <tr key={label} className="border-b border-white/5 text-slate-300">
                    <td className="py-2.5 pr-6 font-semibold text-white">{label}</td>
                    <td className="py-2.5 pr-6">{recommended.min}–{recommended.max}h</td>
                    <td className="py-2.5">
                      {debt > 0 ? (
                        <span className="text-red-400 font-medium">{debt}h short</span>
                      ) : surplus > 0 ? (
                        <span className="text-amber-400 font-medium">{surplus}h over max</span>
                      ) : (
                        <span className="text-indigo-400 font-medium">On target</span>
                      )}
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
                q: `Is ${hours} hour${hours !== 1 ? "s" : ""} of sleep enough for adults?`,
                a: adultResult.debt > 0
                  ? `No. Adults need 7–9 hours per night (CDC). ${hours} hours leaves you ${adultResult.debt} hour${adultResult.debt !== 1 ? "s" : ""} short, which accumulates as sleep debt.`
                  : `${hours} hours meets the CDC recommendation of 7–9 hours for adults.`,
              },
              {
                q: "What are the effects of sleep debt?",
                a: "Sleep debt impairs memory consolidation, reaction time, immune function, and mood regulation. Chronic sleep debt increases risk of obesity, type 2 diabetes, cardiovascular disease, and depression.",
              },
              {
                q: "How do I recover from sleep debt?",
                a: "Add 1–2 extra hours per night for several days. Avoid oversleeping in one session as it disrupts circadian rhythm. Consistent adequate sleep over 1–2 weeks restores most cognitive function.",
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
          <h2 className="text-xl font-bold text-white mb-4">Other sleep amounts</h2>
          <div className="flex flex-wrap gap-2">
            {neighbors.map(({ slug: s, hours: h }) => (
              <Link
                key={s}
                href={`/sleep-debt-calculator/${s}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {h} hour{h !== 1 ? "s" : ""} of sleep
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Want to calculate your exact debt?{" "}
            <Link href="/sleep-debt-calculator" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Use the Sleep Debt Calculator →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
