import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generateBabySlugs, slugToBabyMonths } from "@/lib/programmatic";
import { getBabySleepNeeds } from "@/lib/sleep-engine";
import StructuredData from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return generateBabySlugs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const months = slugToBabyMonths(slug);
  if (months === null) return {};
  const data = getBabySleepNeeds(months);
  return {
    title: `Baby Sleep Calculator — ${data.ageLabel} Sleep Schedule`,
    description: `How much sleep does a ${data.ageLabel.toLowerCase()} need? See total sleep, nighttime hours, and nap count based on AAP guidelines.`,
    alternates: { canonical: `https://sleepschedule.in/baby-sleep-calculator/${slug}` },
  };
}

export default async function BabySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const months = slugToBabyMonths(slug);
  if (months === null) notFound();

  const data = getBabySleepNeeds(months);

  const allSlugs = generateBabySlugs();
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
        name: `How much sleep does a ${data.ageLabel.toLowerCase()} need?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${data.ageLabel.toLowerCase()} needs approximately ${data.total} hours of sleep per 24 hours — about ${data.nighttime} hours at night and ${data.naps} hours across ${data.napCount} daytime nap${data.napCount !== 1 ? "s" : ""}, according to AAP guidelines.`,
        },
      },
      {
        "@type": "Question",
        name: `How many naps should a ${data.ageLabel.toLowerCase()} take?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${data.ageLabel.toLowerCase()} typically takes ${data.napCount} nap${data.napCount !== 1 ? "s" : ""} per day for a total of about ${data.naps} hours of daytime sleep.`,
        },
      },
      {
        "@type": "Question",
        name: "How do I know if my baby is getting enough sleep?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Signs of adequate sleep include: waking up naturally (not crying), good mood and engagement during wake windows, age-appropriate alertness, and normal weight gain. Overtiredness shows as fussiness, difficulty settling, and early waking.",
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
          <Link href="/baby-sleep-calculator" className="hover:text-white transition-colors">Baby Sleep Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">{data.ageLabel}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          {data.ageLabel} Sleep: How Much Does Your Baby Need?
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          AAP guidelines recommend {data.total} hours of sleep per 24 hours for a {data.ageLabel.toLowerCase()} — {data.nighttime}h at night and {data.naps}h across {data.napCount} nap{data.napCount !== 1 ? "s" : ""}.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-5">
            <p className="text-xs font-semibold text-indigo-400 mb-1">Total Sleep</p>
            <p className="text-4xl font-extrabold text-white">{data.total}h</p>
            <p className="text-xs text-slate-400 mt-1">per 24 hours</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-1">Nighttime</p>
            <p className="text-4xl font-extrabold text-white">{data.nighttime}h</p>
            <p className="text-xs text-slate-400 mt-1">at night</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-1">Naps</p>
            <p className="text-4xl font-extrabold text-white">{data.naps}h</p>
            <p className="text-xs text-slate-400 mt-1">{data.napCount} nap{data.napCount !== 1 ? "s" : ""}/day</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `How much sleep does a ${data.ageLabel.toLowerCase()} need?`,
                a: `A ${data.ageLabel.toLowerCase()} needs approximately ${data.total} hours per 24 hours — ${data.nighttime}h at night and ${data.naps}h across ${data.napCount} daytime nap${data.napCount !== 1 ? "s" : ""} (AAP guidelines).`,
              },
              {
                q: `How many naps should a ${data.ageLabel.toLowerCase()} take?`,
                a: `A ${data.ageLabel.toLowerCase()} typically takes ${data.napCount} nap${data.napCount !== 1 ? "s" : ""} per day for about ${data.naps} hours of daytime sleep.`,
              },
              {
                q: "How do I know if my baby is getting enough sleep?",
                a: "Signs of adequate sleep: waking naturally (not crying), good mood during wake windows, normal weight gain, age-appropriate alertness. Overtiredness shows as fussiness, difficulty settling, and early waking.",
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
          <h2 className="text-xl font-bold text-white mb-4">Other ages</h2>
          <div className="flex flex-wrap gap-2">
            {neighbors.map(({ slug: s, months: m }) => {
              const neighborData = getBabySleepNeeds(m);
              return (
                <Link
                  key={s}
                  href={`/baby-sleep-calculator/${s}`}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {neighborData.ageLabel}
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <Link href="/baby-sleep-calculator" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              ← Back to Baby Sleep Calculator
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
