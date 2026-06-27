import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generateSleepDurationSlugs, slugToSleepDurationGroup } from "@/lib/programmatic";
import { getRecommendedHours } from "@/lib/sleep-engine";
import DurationTab from "@/components/calculator/DurationTab";
import StructuredData from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return generateSleepDurationSlugs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const group = slugToSleepDurationGroup(slug);
  if (!group) return {};
  return {
    title: `Sleep Duration for ${group.ageLabel}s — How Much Sleep You Need`,
    description: `How much sleep do ${group.ageLabel.toLowerCase()}s need? CDC recommends ${group.min}–${group.max} hours per night. See sleep by cycles and whether you're hitting your target.`,
    alternates: { canonical: `https://sleepschedule.in/sleep-duration-calculator/${slug}` },
  };
}

export default async function SleepDurationSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = slugToSleepDurationGroup(slug);
  if (!group) notFound();

  const rec = getRecommendedHours(group.representativeAge);

  const allGroups = generateSleepDurationSlugs();
  const otherGroups = allGroups.filter((g) => g.slug !== slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much sleep do ${group.ageLabel.toLowerCase()}s need?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The CDC recommends ${group.ageLabel.toLowerCase()}s get ${group.min}–${group.max} hours of sleep per night. Consistently getting less than ${group.min} hours is linked to impaired cognition, weakened immunity, and increased disease risk.`,
        },
      },
      {
        "@type": "Question",
        name: `What happens if a ${group.ageLabel.toLowerCase()} doesn't get enough sleep?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chronic sleep deprivation impairs memory, reduces immune function, increases risk of type 2 diabetes, cardiovascular disease, obesity, and mood disorders. Even one night under the recommended amount measurably impairs reaction time.",
        },
      },
      {
        "@type": "Question",
        name: "How many sleep cycles do I need to hit the recommendation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `To reach ${group.min} hours (the CDC minimum for ${group.ageLabel.toLowerCase()}s), you need approximately ${Math.ceil((group.min * 60) / 90)} complete 90-minute sleep cycles. For the full ${group.max}-hour recommendation, aim for ${Math.ceil((group.max * 60) / 90)} cycles.`,
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
          <Link href="/sleep-duration-calculator" className="hover:text-white transition-colors">Sleep Duration Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">{group.ageLabel}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          How Much Sleep Do {group.ageLabel}s Need?
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          The CDC recommends {group.ageLabel.toLowerCase()}s get {group.min}–{group.max} hours of sleep per night. Use the calculator below to check your cycles.
        </p>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 mb-10">
          <p className="text-sm font-semibold text-indigo-300 mb-1">CDC recommendation for {group.ageLabel.toLowerCase()}s</p>
          <p className="text-white font-bold text-3xl">{group.min}–{group.max} hours</p>
          <p className="text-slate-400 text-sm mt-1">per night</p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <DurationTab initialAge={group.representativeAge} />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `How much sleep do ${group.ageLabel.toLowerCase()}s need?`,
                a: `The CDC recommends ${group.ageLabel.toLowerCase()}s get ${group.min}–${group.max} hours per night. Getting less than ${group.min} hours consistently is linked to impaired cognition, weakened immunity, and increased disease risk.`,
              },
              {
                q: `What happens if a ${group.ageLabel.toLowerCase()} doesn't get enough sleep?`,
                a: "Chronic sleep deprivation impairs memory, reduces immune function, and increases risk of type 2 diabetes, cardiovascular disease, obesity, and mood disorders.",
              },
              {
                q: "How many sleep cycles do I need to hit the recommendation?",
                a: `To reach ${group.min} hours, you need approximately ${Math.ceil((group.min * 60) / 90)} complete 90-minute sleep cycles. For the full ${group.max} hours, aim for ${Math.ceil((group.max * 60) / 90)} cycles.`,
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
          <h2 className="text-xl font-bold text-white mb-4">Other age groups</h2>
          <div className="flex flex-wrap gap-2">
            {otherGroups.map(({ slug: s, ageLabel }) => (
              <Link
                key={s}
                href={`/sleep-duration-calculator/${s}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {ageLabel}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <Link href="/sleep-duration-calculator" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              ← Back to Sleep Duration Calculator
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
