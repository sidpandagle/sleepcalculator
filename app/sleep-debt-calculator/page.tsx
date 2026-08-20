import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import SleepDebtTab from "@/components/calculator/SleepDebtTab";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildWebAppSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Sleep Debt Calculator — How Much Sleep Have You Lost?",
  description:
    "Calculate your sleep debt based on last night's sleep and your age. See how many hours short you are of CDC recommendations and what it means for your health.",
  alternates: { canonical: "https://sleepschedule.in/sleep-debt-calculator" },
  openGraph: {
    title: "Sleep Debt Calculator — How Much Sleep Have You Lost?",
    description: "Calculate your sleep debt based on last night's sleep and your age.",
    url: "https://sleepschedule.in/sleep-debt-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is sleep debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sleep debt is the cumulative deficit that builds when you sleep less than your body needs. If you need 8 hours but sleep 6, you accumulate 2 hours of sleep debt. Chronic sleep debt impairs cognition, weakens immunity, and increases disease risk.",
      },
    },
    {
      "@type": "Question",
      name: "Can you recover from sleep debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but not instantly. Short-term debt (1–2 nights) can be recovered with a few nights of adequate sleep. Chronic sleep debt may require weeks of consistent, adequate sleep to fully recover.",
      },
    },
    {
      "@type": "Question",
      name: "How much sleep debt is dangerous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cutting a couple of hours short of your target measurably impairs alertness and reaction time, even if you feel fine. Debt is cumulative — the more you build up without recovery, the more physical and mental performance suffers, per CDC guidance on chronic sleep deprivation.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pay back sleep debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add 1–2 extra hours per night until fully rested. Avoid recovering all at once — sleeping 12 hours disrupts your circadian rhythm. Weekend recovery sleep helps but does not fully compensate for weekday debt.",
      },
    },
  ],
};

export default function SleepDebtCalculatorPage() {
  const webAppSchema = buildWebAppSchema(
    "Sleep Debt Calculator",
    "https://sleepschedule.in/sleep-debt-calculator",
    "Calculate your sleep debt based on last night's sleep and your age. See how many hours short you are of CDC recommendations.",
    { dateModified: "2026-08-17" }
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://sleepschedule.in" },
        { name: "Sleep Debt Calculator", url: "https://sleepschedule.in/sleep-debt-calculator" },
      ]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif font-normal text-5xl sm:text-6xl text-linen mb-4 leading-tight">
            Sleep Debt Calculator
          </h1>
          <p className="text-lg text-mist max-w-2xl mx-auto">
            Enter how many hours you slept and your age to see your sleep debt versus CDC recommendations.
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
          <SleepDebtTab />
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Sleep requirements by age group</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-moon/8 text-mist">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">Age range</th>
                  <th className="pb-2 font-medium">CDC recommended</th>
                </tr>
              </thead>
              <tbody className="text-mist">
                {[
                  ["Toddler",      "1–3 years",   "11–14 hours"],
                  ["Preschool",    "3–5 years",   "10–13 hours"],
                  ["School-age",   "6–12 years",  "9–11 hours"],
                  ["Teenager",     "13–17 years", "8–10 hours"],
                  ["Adult",        "18–64 years", "7–9 hours"],
                  ["Older Adult",  "65+ years",   "7–8 hours"],
                ].map(([group, range, rec]) => (
                  <tr key={group} className="border-b border-moon/5">
                    <td className="py-2.5 pr-6 font-semibold text-linen">{group}</td>
                    <td className="py-2.5 pr-6">{range}</td>
                    <td className="py-2.5 text-ember-light font-medium">{rec}</td>
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
            The calculator compares your actual sleep hours against the CDC-recommended minimum for your age group. The deficit shown is a single-night estimate. For a 7-day rolling total, enter each night&apos;s sleep and sum the deficits — a week of 6-hour nights when you need 8 accumulates 14 hours of debt.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Sleep need is used as the midpoint of the CDC range for your age (e.g., 8 hours for adults 18–64, where the range is 7–9). If you know your personal sleep need differs from the midpoint, adjust accordingly.
          </p>
          <p className="text-mist leading-relaxed">
            Treat the single-night number as a starting point rather than the whole picture. The most useful way to read your result is in the context of the week that led up to it: a 2-hour deficit after a run of short nights means something different than a 2-hour deficit after weeks of consistent, adequate sleep, even though the calculator shows the same figure for both.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">How sleep debt accumulates</h2>
          <p className="text-mist leading-relaxed mb-4">
            Sleep debt is not something a single bad night creates in isolation — it is cumulative. Each night you sleep less than your body&apos;s need, the shortfall carries forward and adds to whatever deficit already exists. Sleep two hours short on Monday and you carry a two-hour debt into Tuesday. Repeat that pattern through the work week and the deficit does not reset each morning — it stacks, night after night, into a much larger total than any single night suggests.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            This is different from ordinary tiredness. The{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline transition-colors">
              CDC
            </a>{" "}
            treats insufficient sleep as a chronic public health issue precisely because its effects compound over days and weeks rather than washing out overnight. A person who consistently sleeps 6 hours instead of 8 does not simply feel the effects of &quot;one short night&quot; on repeat — each additional night of shortfall builds on the unresolved debt from before, so the cumulative impact on alertness, mood, and physical health grows faster than the raw number of missed hours would imply.
          </p>
          <p className="text-mist leading-relaxed">
            That compounding is also why sleep debt can feel deceptively manageable in the moment. Caffeine, adrenaline, and routine can mask the accumulating deficit for a while, but the underlying debt does not disappear — it continues to build in the background until enough recovery sleep is banked to pay it down.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Understanding your sleep debt score</h2>
          <p className="text-mist leading-relaxed mb-4">
            The number your result shows is only useful once it&apos;s put in context. A one-hour shortfall after a single late night carries a very different meaning than the same one-hour figure after two weeks of accumulating debt. Use the ranges below as a rough guide to what your current deficit typically means, not as a precise medical threshold.
          </p>
          <div className="space-y-4">
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">0–1 hour deficit</p>
              <p className="text-sm text-mist">Within normal variation. Minor fatigue may be felt but cognitive performance is largely intact. One full night&apos;s sleep restores baseline.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">1–3 hours deficit</p>
              <p className="text-sm text-mist">Measurable impairment in reaction time, working memory, and emotional regulation. If this level of shortfall repeats night after night, the deficit keeps stacking rather than resetting, so the cumulative effect grows the longer the pattern continues.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">3+ hours deficit</p>
              <p className="text-sm text-mist">Significant impairment. Prefrontal cortex function — governing decision-making and impulse control — is most affected. People at this level consistently underestimate their own impairment. Address the root cause before attempting recovery.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">How to recover from sleep debt</h2>
          <p className="text-mist leading-relaxed mb-4">
            Because sleep debt builds gradually, it also has to come down gradually. Add 30–60 minutes per night above your normal sleep need until the deficit is repaid, rather than trying to erase it in one long session. Going to bed earlier is generally more effective than sleeping in later, since it protects your regular wake time and keeps your circadian rhythm — your body&apos;s internal clock — from drifting.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            A consistent sleep schedule is the foundation of repayment. Waking up and going to bed at roughly the same time every day, including weekends, helps your body settle into a stable rhythm instead of lurching between short weekday nights and long weekend catch-up sleep. That lurching pattern — sometimes called &quot;social jet lag&quot; — is itself disruptive.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Avoid the trap of trying to repay a large debt in a single marathon night of sleep. Sleeping 11 or 12 hours to make up for a week of short nights overshoots what your body can use in one session, disrupts your sleep architecture, and can leave you groggier rather than restored. According to the{" "}
            <a href="https://www.thensf.org" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline transition-colors">
              National Sleep Foundation
            </a>
            , sleeping in on weekends can help offset some of the debt built up during the week, but it only partially compensates — it does not fully reverse the cumulative effects of repeated short nights, and it does not fix the underlying schedule that created the debt in the first place.
          </p>
          <p className="text-mist leading-relaxed">
            Short-term debt (2–5 hours total) generally resolves within a few nights of adequate, consistent sleep. Debt accumulated over weeks takes longer and responds best to steady, moderate extra sleep sustained over time rather than any single large correction.
          </p>
        </section>

        <div className="rounded-[18px] border border-moon/9 bg-dusk p-6 mb-12">
          <p className="text-mist leading-relaxed">
            Not sure what your actual target should be? Sleep need varies by age, so your personal baseline may differ from the general CDC range used here.{" "}
            <Link href="/sleep-duration-calculator" className="text-ember hover:text-ember-light underline transition-colors">
              Check age-based sleep recommendations →
            </Link>
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Limitations</h2>
          <p className="text-mist leading-relaxed">
            This calculator estimates your sleep debt against the CDC-recommended range for your age group, not your personal ideal — some people genuinely need more or less sleep than the general guideline. It also uses a single-night snapshot: it does not automatically track cumulative weekly debt, sleep quality (fragmented sleep of 8 hours differs from consolidated 8 hours), or pre-existing sleep disorders. The CDC midpoint is used as the reference point; your own need may sit anywhere within the published range. This tool does not diagnose sleep deprivation or any health condition — if you consistently struggle to get adequate sleep, consult a healthcare provider.
          </p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "What is sleep debt?",
                a: "Sleep debt is the cumulative deficit that builds when you sleep less than your body needs. If you need 8 hours but sleep 6, you accumulate 2 hours of sleep debt. Chronic sleep debt impairs cognition, weakens immunity, and increases disease risk.",
              },
              {
                q: "Can you recover from sleep debt?",
                a: "Yes, but not instantly. Short-term debt (1–2 nights) can be recovered with a few nights of adequate sleep. Chronic sleep debt may require weeks of consistent, adequate sleep to fully recover.",
              },
              {
                q: "How much sleep debt is dangerous?",
                a: "Cutting a couple of hours short of your target measurably impairs alertness and reaction time, even if you feel fine. Debt is cumulative — the more you build up without recovery, the more physical and mental performance suffers, per CDC guidance on chronic sleep deprivation.",
              },
              {
                q: "How do I pay back sleep debt?",
                a: "Add 1–2 extra hours per night until fully rested. Avoid recovering all at once — sleeping 12 hours disrupts your circadian rhythm. Weekend recovery sleep helps but does not fully compensate for weekday debt.",
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
