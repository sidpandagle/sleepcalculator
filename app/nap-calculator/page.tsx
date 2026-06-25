import type { Metadata } from "next";
import NapTab from "@/components/calculator/NapTab";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Nap Calculator — Best Nap Duration & Wake Up Time",
  description:
    "Find the perfect nap duration. A 20-minute power nap boosts alertness without grogginess. A 90-minute nap completes a full sleep cycle. Pick your nap start time and get your ideal wake-up alarm.",
  alternates: { canonical: "https://sleepschedule.in/nap-calculator" },
  openGraph: {
    title: "Nap Calculator — Best Nap Duration & Wake Up Time",
    description:
      "Find the perfect nap duration. A 20-minute power nap boosts alertness without grogginess. A 90-minute nap completes a full sleep cycle.",
    url: "https://sleepschedule.in/nap-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a nap be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two best nap durations are 20 minutes (power nap) and 90 minutes (full sleep cycle). A 20-minute nap keeps you in light sleep so you wake up alert. A 90-minute nap completes a full cycle including REM and leaves you feeling refreshed. Avoid 30–60 minute naps — they drop you into deep sleep mid-cycle, causing grogginess.",
      },
    },
    {
      "@type": "Question",
      name: "What is a power nap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A power nap is a short 10–20 minute nap that keeps you in the lighter stages of sleep (stage 1 and 2). Because you never enter deep sleep, you wake up feeling alert rather than groggy. NASA research found a 26-minute nap improved pilot alertness by 54%.",
      },
    },
    {
      "@type": "Question",
      name: "Why do I feel groggy after a 30-minute nap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grogginess after a nap — called sleep inertia — happens when you wake up in the middle of a deep sleep stage. At around 30 minutes you have entered deep sleep (stage 3) but haven't completed the full cycle. Either cut the nap to 20 minutes or extend it to 90 minutes so you wake at the end of a cycle.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time of day to nap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ideal nap window is between 1 PM and 3 PM, which aligns with the natural post-lunch dip in alertness caused by circadian rhythms. Napping after 4 PM can interfere with night-time sleep.",
      },
    },
  ],
};

export default function NapCalculatorPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Nap Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Pick your nap start time and get the perfect alarm. A 20-minute power nap or a
            90-minute full cycle — both wake you up without grogginess.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <NapTab />
        </section>

        <section className="mb-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "20-Min Power Nap",
              body: "Stays in light sleep (stage 1–2). You wake up sharp with no grogginess. Best for a quick midday recharge.",
            },
            {
              icon: "🔄",
              title: "90-Min Full Cycle",
              body: "Completes light sleep, deep sleep, and REM. Feels like a proper sleep. Best when you have time.",
            },
            {
              icon: "😵",
              title: "Avoid 30–60 Min",
              body: "Drops you into deep sleep mid-cycle. Waking here causes sleep inertia — that heavy, disoriented feeling.",
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
                q: "How long should a nap be?",
                a: "The two best nap lengths are 20 minutes (power nap) and 90 minutes (full sleep cycle). Avoid 30–60 minutes — you wake mid-cycle feeling groggy.",
              },
              {
                q: "What is a power nap?",
                a: "A 10–20 minute nap that stays in light sleep. Because you never enter deep sleep, you wake up alert. NASA research found a 26-minute nap improved pilot alertness by 54%.",
              },
              {
                q: "Why do I feel groggy after a 30-minute nap?",
                a: "At 30 minutes you've entered deep sleep (stage 3) but haven't finished the cycle. Waking mid-cycle causes sleep inertia. Cut to 20 min or extend to 90 min.",
              },
              {
                q: "What is the best time of day to nap?",
                a: "Between 1 PM and 3 PM — this aligns with the natural post-lunch alertness dip. Avoid napping after 4 PM as it can disrupt night sleep.",
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
