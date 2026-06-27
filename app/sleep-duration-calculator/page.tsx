import type { Metadata } from "next";
import DurationTab from "@/components/calculator/DurationTab";
import StructuredData from "@/components/seo/StructuredData";
import { buildWebAppSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Sleep Duration Calculator — How Much Sleep Do You Need by Age?",
  description:
    "Find out exactly how much sleep you need based on your age. Uses CDC sleep recommendations for children, teenagers, adults, and older adults. Check if you're meeting your sleep target.",
  alternates: { canonical: "https://sleepschedule.in/sleep-duration-calculator" },
  openGraph: {
    title: "Sleep Duration Calculator — How Much Sleep Do You Need by Age?",
    description:
      "Find out exactly how much sleep you need based on your age using CDC recommendations.",
    url: "https://sleepschedule.in/sleep-duration-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much sleep do adults need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CDC recommends adults aged 18–64 get 7–9 hours of sleep per night. Adults 65 and older need 7–8 hours. Getting less than 7 hours regularly is linked to increased risk of obesity, heart disease, and impaired cognitive function.",
      },
    },
    {
      "@type": "Question",
      name: "How much sleep do teenagers need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Teenagers aged 13–17 need 8–10 hours of sleep per night according to the CDC. Teens are biologically wired to fall asleep later and wake up later — early school start times often conflict with their natural sleep cycle.",
      },
    },
    {
      "@type": "Question",
      name: "How much sleep do children need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "School-age children (6–12) need 9–11 hours. Preschoolers (3–5) need 10–13 hours including naps. Toddlers (1–2) need 11–14 hours including naps. Sleep is critical for growth hormone release and memory consolidation in children.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I don't get enough sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chronic sleep deprivation is linked to impaired memory, reduced immune function, increased risk of type 2 diabetes, heart disease, obesity, and mood disorders. Even one night of less than 6 hours measurably impairs reaction time and decision-making.",
      },
    },
  ],
};

export default function SleepDurationCalculatorPage() {
  const webAppSchema = buildWebAppSchema(
    "Sleep Duration Calculator",
    "https://sleepschedule.in/sleep-duration-calculator",
    "Find out exactly how much sleep you need based on your age. Uses CDC sleep recommendations for children, teenagers, adults, and older adults."
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Sleep Duration Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            How much sleep do you actually need? Enter your age and see the CDC-recommended
            sleep duration for your age group — and whether your current sleep hits the target.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            <time dateTime="2026-06-27">Last reviewed: June 2026</time>
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <DurationTab />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sleep needs by age group</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">Age range</th>
                  <th className="pb-2 font-medium">Hours needed</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Toddler", "1–3 years", "11–14 hours"],
                  ["Preschool", "3–5 years", "10–13 hours"],
                  ["School-age", "6–12 years", "9–11 hours"],
                  ["Teenager", "13–17 years", "8–10 hours"],
                  ["Adult", "18–64 years", "7–9 hours"],
                  ["Older Adult", "65+ years", "7–8 hours"],
                ].map(([group, range, hours]) => (
                  <tr key={group} className="border-b border-white/5">
                    <td className="py-2.5 pr-6 font-semibold text-white">{group}</td>
                    <td className="py-2.5 pr-6">{range}</td>
                    <td className="py-2.5 text-indigo-300 font-medium">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Source:{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              CDC Sleep Recommendations 2023
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How this calculator works</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Enter your age and the hours you slept last night. The calculator compares your sleep to the CDC-recommended range for your age group and tells you whether you met, exceeded, or fell short of the target. The recommendation shown is the published range — not a single number — because sleep need varies within each age group.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Adults aged 18–64 are the most undersleeping demographic: the{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">CDC</a>{" "}
            estimates 35% of U.S. adults regularly fall short of 7 hours. For reference, sleeping 6 hours per night for 10 days produces cognitive impairment equivalent to 24 hours of total sleep deprivation, per University of Pennsylvania research.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why sleep needs change with age</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Sleep requirements are highest in early life because sleep drives brain development, myelination, and growth hormone secretion. School-age children consolidate learning during slow-wave sleep — skimping on sleep measurably impairs academic performance and emotional regulation.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            Teenagers need more sleep than adults (8–10 hours) partly because of the pubertal shift in circadian phase — their biology pushes bedtime later and wake time later. Early school start times force most teens into chronic sleep deprivation. The{" "}
            <a href="https://aasm.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">AASM</a>{" "}
            advocates for middle and high school start times no earlier than 8:30 AM.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Older adults (65+) need slightly less sleep (7–8 hours) and experience structural changes: less deep slow-wave sleep, more fragmentation, and earlier natural wake times. This is normal aging, not insomnia — though the two often coexist.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Interpreting your result</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white mb-1">Within the recommended range</p>
              <p className="text-sm text-slate-400">Your sleep duration is meeting the population-level recommendation. If you still feel tired, consider sleep quality factors: timing relative to your chronotype, sleep debt from previous nights, or sleep-disordered breathing.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white mb-1">Below the recommendation</p>
              <p className="text-sm text-slate-400">A single night below target is not concerning — a pattern of 5+ nights per week is. Track your weekly average and aim to close the gap by going to bed earlier rather than sleeping later.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white mb-1">Above the recommendation</p>
              <p className="text-sm text-slate-400">Occasionally sleeping more (e.g., after sleep deprivation) is normal recovery. Consistently sleeping 10+ hours and still feeling unrefreshed can indicate sleep apnea, depression, or thyroid dysfunction — worth mentioning to a doctor.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
          <p className="text-slate-400 leading-relaxed">
            CDC recommendations are population-level guidelines, not individually calibrated targets. Your personal sleep need may fall outside the typical range — some adults function well on 6 hours; others need 9. Sleep quality, sleep disorder presence, and accumulated sleep debt all affect how refreshed you feel at any given duration. This tool provides a reference point, not a diagnosis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "How much sleep do adults need?",
                a: "The CDC recommends adults aged 18–64 get 7–9 hours per night. Adults 65+ need 7–8 hours. Less than 7 hours regularly is linked to obesity, heart disease, and impaired cognition.",
              },
              {
                q: "How much sleep do teenagers need?",
                a: "Teenagers aged 13–17 need 8–10 hours per night. Teens are biologically wired to fall asleep later — early school start times often conflict with their natural sleep cycle.",
              },
              {
                q: "How much sleep do children need?",
                a: "School-age children (6–12) need 9–11 hours. Preschoolers (3–5) need 10–13 hours including naps. Sleep is critical for growth hormone release and memory consolidation in children.",
              },
              {
                q: "What happens if I don't get enough sleep?",
                a: "Chronic sleep deprivation impairs memory, reduces immune function, and increases risk of type 2 diabetes, heart disease, and mood disorders. Even one night under 6 hours measurably impairs reaction time.",
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
      </div>
    </>
  );
}
