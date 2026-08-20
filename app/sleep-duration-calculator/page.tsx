import type { Metadata } from "next";
import { ChevronDown, Link2 } from "lucide-react";
import DurationTab from "@/components/calculator/DurationTab";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
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
    "Find out exactly how much sleep you need based on your age. Uses CDC sleep recommendations for children, teenagers, adults, and older adults.",
    { dateModified: "2026-08-17" }
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://sleepschedule.in" },
          { name: "Sleep Duration Calculator", url: "https://sleepschedule.in/sleep-duration-calculator" },
        ]}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif font-normal text-5xl sm:text-6xl text-linen mb-4 leading-tight">
            Sleep Duration Calculator
          </h1>
          <p className="text-lg text-mist max-w-2xl mx-auto">
            How much sleep do you actually need? Enter your age and see the CDC-recommended
            sleep duration for your age group — and whether your current sleep hits the target.
          </p>
          <p className="text-xs text-mist/70 mt-3">
            Written by{" "}
            <a href="/about" className="underline hover:text-mist transition-colors">
              Siddhant Pandagle
            </a>
            {" "}&middot; <time dateTime="2026-08-17">Last reviewed: August 2026</time>
          </p>
        </div>

        <section className="rounded-[26px] border border-moon/10 bg-dusk p-6 md:p-8 mb-12">
          <DurationTab />
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Sleep needs by age group</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-moon/8 text-mist">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">Age range</th>
                  <th className="pb-2 font-medium">Hours needed</th>
                </tr>
              </thead>
              <tbody className="text-mist">
                {[
                  ["Toddler", "1–3 years", "11–14 hours"],
                  ["Preschool", "3–5 years", "10–13 hours"],
                  ["School-age", "6–12 years", "9–11 hours"],
                  ["Teenager", "13–17 years", "8–10 hours"],
                  ["Adult", "18–64 years", "7–9 hours"],
                  ["Older Adult", "65+ years", "7–8 hours"],
                ].map(([group, range, hours]) => (
                  <tr key={group} className="border-b border-moon/5">
                    <td className="py-2.5 pr-6 font-semibold text-linen">{group}</td>
                    <td className="py-2.5 pr-6">{range}</td>
                    <td className="py-2.5 text-ember-light font-medium">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-mist/70 mt-3">
            Source:{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              CDC Sleep Recommendations 2023
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">How this calculator works</h2>
          <p className="text-mist leading-relaxed mb-4">
            Enter your age and the hours you slept last night. The calculator compares your sleep to the CDC-recommended range for your age group and tells you whether you met, exceeded, or fell short of the target. The recommendation shown is the published range — not a single number — because sleep need varies within each age group.
          </p>
          <p className="text-mist leading-relaxed">
            Adults aged 18–64 are the most undersleeping demographic: the{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">CDC</a>{" "}
            estimates roughly 1 in 3 U.S. adults regularly fall short of 7 hours — the low end of the recommended range, and a pattern linked to higher risk of chronic health conditions over time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Why sleep needs change with age</h2>
          <p className="text-mist leading-relaxed mb-4">
            Look at the{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">CDC</a>{" "}
            table above and a clear pattern emerges: recommended sleep duration is highest at birth and declines, in broad steps, across the lifespan — from newborns needing far more than adults, through the school-age and teenage years, down to the 7–9 hour range most adults settle into, and the slightly narrower 7–8 hour range typical of older adults. This isn&apos;t arbitrary. It tracks the underlying biology of what sleep is doing at each life stage.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Sleep requirements are highest in early life because sleep drives brain development, myelination, and growth hormone secretion. School-age children consolidate learning during slow-wave sleep — skimping on sleep measurably impairs academic performance and emotional regulation.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Teenagers need more sleep than adults (8–10 hours) partly because of the pubertal shift in circadian phase — their biology pushes bedtime later and wake time later. Early school start times force most teens into chronic sleep deprivation. The{" "}
            <a href="https://aasm.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">AASM</a>{" "}
            advocates for middle and high school start times no earlier than 8:30 AM.
          </p>
          <p className="text-mist leading-relaxed">
            Older adults (65+) need slightly less sleep (7–8 hours) and experience structural changes: less deep slow-wave sleep, more fragmentation, and earlier natural wake times. This is normal aging, not insomnia — though the two often coexist. Across the whole lifespan, the general trend the{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">CDC</a>{" "}
            guidance reflects is one of gradually declining total sleep need as the brain finishes the heavy construction work of childhood and adolescence and shifts into maintenance mode in adulthood.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Individual variation within the guidelines</h2>
          <p className="text-mist leading-relaxed mb-4">
            The ranges published by the{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">CDC</a>{" "}
            and the{" "}
            <a href="https://www.thensf.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">National Sleep Foundation (NSF)</a>{" "}
            are population guidelines, not a strict personal prescription. They describe what&apos;s appropriate for most healthy people in an age group — not a number that applies identically to every individual within it. Some healthy adults consistently function well at the low end of the 7–9 hour range; others genuinely need the high end to feel rested and perform well. Genetics, activity level, general health, and even how demanding a given day was all shift where an individual sits within the range.
          </p>
          <p className="text-mist leading-relaxed">
            Duration is also only one part of the picture. Consistency — going to bed and waking at similar times most days — and sleep quality — falling asleep reasonably quickly and staying asleep with minimal disruption — matter alongside raw hours. Someone who sleeps 7.5 hours on a stable schedule with few awakenings is often better rested than someone who sleeps 8.5 fragmented hours at irregular times. Use the range this calculator shows as a starting reference point, then pay attention to how you actually feel and function.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Interpreting your result</h2>
          <div className="space-y-4">
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">Within the recommended range</p>
              <p className="text-sm text-mist">Your sleep duration is meeting the population-level recommendation. If you still feel tired, consider sleep quality factors: timing relative to your chronotype, sleep debt from previous nights, or sleep-disordered breathing.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">Below the recommendation</p>
              <p className="text-sm text-mist">A single night below target is not concerning — a pattern of 5+ nights per week is. Track your weekly average and aim to close the gap by going to bed earlier rather than sleeping later.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">Above the recommendation</p>
              <p className="text-sm text-mist">Occasionally sleeping more (e.g., after sleep deprivation) is normal recovery. Consistently sleeping 10+ hours and still feeling unrefreshed can indicate sleep apnea, depression, or thyroid dysfunction — worth mentioning to a doctor.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-xl border border-ember/30 bg-ember/10 p-6 flex items-start gap-4">
            <Link2 className="w-5 h-5 text-ember shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ember-light mb-1">Related tool</p>
              <p className="text-mist text-sm mb-3">Not hitting your target range consistently? See how much sleep debt you&apos;ve built up over the past week and what it takes to pay it back.</p>
              <a href="/sleep-debt-calculator" className="text-sm text-ember font-medium hover:text-ember-light transition-colors">Sleep Debt Calculator →</a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Limitations</h2>
          <p className="text-mist leading-relaxed">
            This tool estimates a target sleep range for your age group — it is not a diagnosis and not a substitute for medical advice. CDC recommendations are population-level guidelines, not individually calibrated targets: your personal sleep need may reasonably fall outside the typical range. Sleep quality, sleep disorder presence, and accumulated sleep debt all affect how refreshed you feel at any given duration. If you consistently struggle to meet these ranges despite giving yourself adequate opportunity to sleep — enough time in bed, a reasonably dark and quiet environment, no late caffeine — that pattern may warrant talking to a doctor rather than just trying to sleep more.
          </p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Frequently asked questions</h2>
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
      </div>
    </>
  );
}
