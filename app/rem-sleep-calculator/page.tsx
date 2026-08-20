import type { Metadata } from "next";
import { Brain, TrendingUp, Moon, ChevronDown } from "lucide-react";
import REMTab from "@/components/calculator/REMTab";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildWebAppSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "REM Sleep Calculator — How Much REM Sleep Do You Get?",
  description:
    "Calculate how much REM sleep you get based on your total hours of sleep. See REM time broken down by sleep cycle, based on polysomnography averages.",
  alternates: { canonical: "https://sleepschedule.in/rem-sleep-calculator" },
  openGraph: {
    title: "REM Sleep Calculator — How Much REM Sleep Do You Get?",
    description: "Calculate how much REM sleep you get based on total hours of sleep, broken down by cycle.",
    url: "https://sleepschedule.in/rem-sleep-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much REM sleep do you need per night?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adults typically need 1.5–2 hours of REM sleep per night, which is roughly 20–25% of total sleep time. REM sleep is essential for memory consolidation, emotional processing, and learning.",
      },
    },
    {
      "@type": "Question",
      name: "When does REM sleep occur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "REM sleep occurs at the end of each 90-minute sleep cycle. The first REM period is short (about 10 minutes). Each subsequent cycle has progressively longer REM periods — the final cycles of the night have the most REM sleep, lasting up to 50 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if you don't get enough REM sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "REM deprivation impairs memory consolidation, emotional regulation, creativity, and learning. Your brain compensates by entering REM earlier and for longer in subsequent nights — a phenomenon called REM rebound.",
      },
    },
    {
      "@type": "Question",
      name: "Does alcohol affect REM sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Alcohol suppresses REM sleep in the first half of the night. As alcohol metabolizes in the second half, REM rebounds — often causing vivid dreams and fragmented sleep. Even moderate drinking reduces total REM time.",
      },
    },
    {
      "@type": "Question",
      name: "Is my REM sleep normal for my age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your age group. Per CDC and AASM guidance, healthy adults spend roughly 20–25% of total sleep in REM; teenagers and young adults tend toward the higher end of that range, while adults 65 and older typically see REM settle to around 15–20%. Compare your calculated REM percentage to the age benchmark table rather than a single fixed number.",
      },
    },
  ],
};

export default function REMSleepCalculatorPage() {
  const webAppSchema = buildWebAppSchema(
    "REM Sleep Calculator",
    "https://sleepschedule.in/rem-sleep-calculator",
    "Calculate how much REM sleep you get based on your total hours of sleep, broken down by sleep cycle.",
    { dateModified: "2026-08-17" }
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://sleepschedule.in" },
        { name: "REM Sleep Calculator", url: "https://sleepschedule.in/rem-sleep-calculator" },
      ]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif font-normal text-5xl sm:text-6xl text-linen mb-4 leading-tight">
            REM Sleep Calculator
          </h1>
          <p className="text-lg text-mist max-w-2xl mx-auto">
            Enter how many hours you sleep to see how much REM sleep you get, broken down cycle by cycle.
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
          <REMTab />
        </section>

        <section className="mb-12 grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: Brain,
              title: "Memory & Learning",
              body: "REM sleep consolidates memories and skills learned during the day. Missing REM impairs recall and learning speed.",
            },
            {
              Icon: TrendingUp,
              title: "Increases Per Cycle",
              body: "Each cycle has more REM than the last. Cycle 1 has ~10 min; cycles 4–5 have up to 50 min. Cutting sleep short loses the most REM.",
            },
            {
              Icon: Moon,
              title: "20–25% of Sleep",
              body: "Healthy adults spend 20–25% of total sleep in REM. At 8 hours, that's 96–120 minutes of REM per night.",
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-[18px] border border-moon/9 bg-dusk p-6">
              <div className="mb-3 text-ember"><Icon className="w-7 h-7" aria-hidden="true" /></div>
              <h3 className="font-semibold text-linen mb-2">{title}</h3>
              <p className="text-sm text-mist">{body}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">How this calculator estimates REM</h2>
          <p className="text-mist leading-relaxed mb-4">
            This calculator applies polysomnography-based percentages to your total sleep time. REM sleep is not evenly distributed — it concentrates in later cycles. The first 90-minute cycle produces roughly 10 minutes of REM; cycles 4 and 5 produce 45–60 minutes each. The calculator weights these proportions across the number of cycles your sleep duration covers.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Across a full night, most adults move through four to six of these 90-minute cycles. Cycle one typically produces only 5–10 minutes of REM, because the body prioritizes deep, slow-wave sleep early on for physical recovery. From there, the balance shifts with every cycle: slow-wave sleep gets shorter and REM periods get longer, so the cycles in the second half of the night contribute the bulk of your total REM time. This is why REM is disproportionately lost when sleep is cut short from the end — skipping the final 90 minutes removes far more REM than skipping the first 90 minutes, even though both are the same length.
          </p>
          <p className="text-mist leading-relaxed">
            The 20–25% figure comes from population-level polysomnography studies. Your actual REM may vary by 5–10% based on age, alcohol intake, medications, and individual sleep architecture. Use this as a directional estimate, not a clinical measurement.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Is your REM sleep normal for your age?</h2>
          <p className="text-mist leading-relaxed mb-6">
            REM need isn&apos;t a single fixed number — it shifts across the lifespan alongside total sleep need. Per CDC and AASM guidance, REM is best understood as a share of total sleep rather than a fixed minute count, which is why the ranges below scale to age-appropriate sleep duration. Teenagers and young adults tend to sit toward the higher end of the 20–25% range, while adults 65 and older typically see REM percentage settle lower even when total sleep duration holds steady — a normal age-related shift, not on its own a sign of poor sleep quality. Compare your calculated REM percentage above to your age group below before assuming something is wrong.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-moon/8 text-mist">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">Total sleep needed</th>
                  <th className="pb-2 pr-6 font-medium">REM %</th>
                  <th className="pb-2 font-medium">REM target</th>
                </tr>
              </thead>
              <tbody className="text-mist">
                {[
                  ["Teenagers (14–17)",    "8–10 hrs", "20–25%", "96–150 min"],
                  ["Young adults (18–25)", "7–9 hrs",  "20–25%", "84–135 min"],
                  ["Adults (26–64)",       "7–9 hrs",  "20–25%", "84–135 min"],
                  ["Older adults (65+)",   "7–8 hrs",  "15–20%", "63–96 min"],
                ].map(([age, total, pct, target]) => (
                  <tr key={age} className="border-b border-moon/5">
                    <td className="py-2.5 pr-6 font-semibold text-linen">{age}</td>
                    <td className="py-2.5 pr-6">{total}</td>
                    <td className="py-2.5 pr-6">{pct}</td>
                    <td className="py-2.5 text-ember-light font-medium">{target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-mist/70 mt-3">
            Source:{" "}
            <a href="https://aasm.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              American Academy of Sleep Medicine (AASM)
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Interpreting your results</h2>
          <div className="space-y-4">
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">REM within target range</p>
              <p className="text-sm text-mist">Your sleep duration is supporting healthy REM. Continue current habits. If you still feel cognitively sluggish, check total sleep debt first — REM quality matters as much as quantity.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">REM below target</p>
              <p className="text-sm text-mist">Most commonly caused by insufficient total sleep. Adding one full 90-minute cycle (sleeping 7.5 hrs instead of 6) disproportionately increases REM because REM concentrates in later cycles. Alcohol within 3 hours of bed is the next most common suppressant.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">REM well above target</p>
              <p className="text-sm text-mist">REM well above your typical range can indicate REM rebound — your brain compensating for prior REM deprivation, often after a stretch of short or disrupted sleep. This is normal during recovery and tends to settle back down once you return to a consistent, adequate sleep schedule.</p>
            </div>
            <div className="rounded-[18px] border border-moon/9 bg-dusk p-5">
              <p className="font-semibold text-linen mb-1">Not sure if it&apos;s normal for you</p>
              <p className="text-sm text-mist">The 20–25% target applies to most working-age adults. If you&apos;re a teenager, a young adult, or over 65, check the age-specific range in the table above — REM percentage that looks &quot;low&quot; against the general adult figure can be entirely normal for your age group.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-xl border border-ember/30 bg-ember/10 p-6 flex items-start gap-4">
            <div className="text-2xl">🔗</div>
            <div>
              <p className="text-sm font-semibold text-ember-light mb-1">Related tool</p>
              <p className="text-mist text-sm mb-3">Low REM is often a symptom of accumulated sleep debt. See how much sleep you&apos;ve lost this week.</p>
              <a href="/sleep-debt-calculator" className="text-sm text-ember font-medium hover:text-ember-light transition-colors">Sleep Debt Calculator →</a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Limitations</h2>
          <p className="text-mist leading-relaxed mb-4">
            This calculator uses population-average REM percentages derived from polysomnography studies. It does not account for individual variation in sleep architecture, sleep disorders (apnea, insomnia, narcolepsy), medications (SSRIs, benzodiazepines, beta-blockers all suppress REM), or night-to-night variability. Consumer wearables also estimate sleep stages from movement and heart-rate signals, not brain waves, so they&apos;re a rough proxy at best — not a substitute for a clinical measurement. If you suspect a sleep disorder, consult a sleep medicine physician — this tool cannot diagnose one.
          </p>
          <p className="text-mist leading-relaxed">
            In short: this is an approximation, not a diagnosis. Polysomnography — an overnight, in-lab or in-home sleep study that records brain waves, eye movement, and muscle activity — remains the only precise way to measure your actual REM stages. Treat the numbers here as a starting point for noticing patterns, not as a substitute for a real sleep study if you have persistent concerns.
          </p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "How much REM sleep do you need per night?",
                a: "Adults typically need 1.5–2 hours of REM sleep per night (20–25% of total sleep). REM is essential for memory consolidation, emotional processing, and learning.",
              },
              {
                q: "When does REM sleep occur?",
                a: "REM occurs at the end of each 90-minute cycle. Cycle 1 has ~10 min of REM; later cycles have up to 50 min. The last 2 cycles of the night have the most REM — cutting sleep short significantly reduces total REM.",
              },
              {
                q: "What happens if you don't get enough REM sleep?",
                a: "REM deprivation impairs memory consolidation, emotional regulation, creativity, and learning. Your brain compensates by entering REM earlier and longer in subsequent nights (REM rebound).",
              },
              {
                q: "Does alcohol affect REM sleep?",
                a: "Yes. Alcohol suppresses REM in the first half of the night and causes REM rebound in the second half — leading to vivid dreams and fragmented sleep. Even moderate drinking reduces total REM time.",
              },
              {
                q: "Is my REM sleep normal for my age?",
                a: "It depends on your age group. Per CDC and AASM guidance, healthy adults spend roughly 20–25% of total sleep in REM; teenagers and young adults tend toward the higher end of that range, while adults 65 and older typically see REM settle to around 15–20%. Compare your calculated REM percentage to the age benchmark table above rather than a single fixed number.",
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

        <section className="mt-8 pt-6 border-t border-moon/5">
          <p className="text-xs text-mist/70">
            Sources:{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              CDC — Sleep and Sleep Disorders
            </a>
            {" "}·{" "}
            <a href="https://aasm.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              American Academy of Sleep Medicine (AASM)
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
