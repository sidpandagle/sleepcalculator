import type { Metadata } from "next";
import REMTab from "@/components/calculator/REMTab";
import StructuredData from "@/components/seo/StructuredData";

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
  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            REM Sleep Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Enter how many hours you sleep to see how much REM sleep you get, broken down cycle by cycle.
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
      </div>
    </>
  );
}
