import type { Metadata } from "next";
import REMTab from "@/components/calculator/REMTab";
import StructuredData from "@/components/seo/StructuredData";
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
  ],
};

export default function REMSleepCalculatorPage() {
  const webAppSchema = buildWebAppSchema(
    "REM Sleep Calculator",
    "https://sleepschedule.in/rem-sleep-calculator",
    "Calculate how much REM sleep you get based on your total hours of sleep, broken down by sleep cycle."
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            REM Sleep Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Enter how many hours you sleep to see how much REM sleep you get, broken down cycle by cycle.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            <time dateTime="2026-06-27">Last reviewed: June 2026</time>
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <REMTab />
        </section>

        <section className="mb-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🧠",
              title: "Memory & Learning",
              body: "REM sleep consolidates memories and skills learned during the day. Missing REM impairs recall and learning speed.",
            },
            {
              icon: "📈",
              title: "Increases Per Cycle",
              body: "Each cycle has more REM than the last. Cycle 1 has ~10 min; cycles 4–5 have up to 50 min. Cutting sleep short loses the most REM.",
            },
            {
              icon: "😴",
              title: "20–25% of Sleep",
              body: "Healthy adults spend 20–25% of total sleep in REM. At 8 hours, that's 96–120 minutes of REM per night.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How this calculator estimates REM</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            This calculator applies polysomnography-based percentages to your total sleep time. REM sleep is not evenly distributed — it concentrates in later cycles. The first 90-minute cycle produces roughly 10 minutes of REM; cycles 4 and 5 produce 45–60 minutes each. The calculator weights these proportions across the number of cycles your sleep duration covers.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The 20–25% figure comes from population-level polysomnography studies. Your actual REM may vary by 5–10% based on age, alcohol intake, medications, and individual sleep architecture. Use this as a directional estimate, not a clinical measurement.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">REM benchmarks by age</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">Total sleep needed</th>
                  <th className="pb-2 pr-6 font-medium">REM %</th>
                  <th className="pb-2 font-medium">REM target</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Teenagers (14–17)",    "8–10 hrs", "20–25%", "96–150 min"],
                  ["Young adults (18–25)", "7–9 hrs",  "20–25%", "84–135 min"],
                  ["Adults (26–64)",       "7–9 hrs",  "20–25%", "84–135 min"],
                  ["Older adults (65+)",   "7–8 hrs",  "15–20%", "63–96 min"],
                ].map(([age, total, pct, target]) => (
                  <tr key={age} className="border-b border-white/5">
                    <td className="py-2.5 pr-6 font-semibold text-white">{age}</td>
                    <td className="py-2.5 pr-6">{total}</td>
                    <td className="py-2.5 pr-6">{pct}</td>
                    <td className="py-2.5 text-indigo-300 font-medium">{target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Source:{" "}
            <a href="https://aasm.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              American Academy of Sleep Medicine (AASM)
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Interpreting your results</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white mb-1">REM within target range</p>
              <p className="text-sm text-slate-400">Your sleep duration is supporting healthy REM. Continue current habits. If you still feel cognitively sluggish, check total sleep debt first — REM quality matters as much as quantity.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white mb-1">REM below target</p>
              <p className="text-sm text-slate-400">Most commonly caused by insufficient total sleep. Adding one full 90-minute cycle (sleeping 7.5 hrs instead of 6) disproportionately increases REM because REM concentrates in later cycles. Alcohol within 3 hours of bed is the next most common suppressant.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white mb-1">REM well above target</p>
              <p className="text-sm text-slate-400">REM above 30% can indicate REM rebound — your brain compensating for prior REM deprivation. This is normal during recovery. It typically normalizes within 1–2 weeks of consistent adequate sleep.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-6 flex items-start gap-4">
            <div className="text-2xl">🔗</div>
            <div>
              <p className="text-sm font-semibold text-indigo-300 mb-1">Related tool</p>
              <p className="text-slate-300 text-sm mb-3">Low REM is often a symptom of accumulated sleep debt. See how much sleep you&apos;ve lost this week.</p>
              <a href="/sleep-debt-calculator" className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors">Sleep Debt Calculator →</a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
          <p className="text-slate-400 leading-relaxed">
            This calculator uses population-average REM percentages derived from polysomnography studies. It does not account for individual variation in sleep architecture, sleep disorders (apnea, insomnia, narcolepsy), medications (SSRIs, benzodiazepines, beta-blockers all suppress REM), or night-to-night variability. Consumer wearables estimate REM at 70–80% accuracy versus clinical polysomnography. If you suspect a sleep disorder, consult a sleep medicine physician — this tool cannot diagnose one.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
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

        <section className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-slate-500">
            Sources:{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              CDC — Sleep and Sleep Disorders
            </a>
            {" "}·{" "}
            <a href="https://www.aasm.org/resources/clinicalguidelines/adult-sleep.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              American Academy of Sleep Medicine (AASM)
            </a>
            {" "}·{" "}
            <a href="https://www.thensf.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              National Sleep Foundation
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
