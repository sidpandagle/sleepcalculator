import type { Metadata } from "next";
import SleepCalculator from "@/components/calculator/SleepCalculator";
import StructuredData from "@/components/seo/StructuredData";
import { buildWebSiteSchema, buildFAQSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
  description:
    "Free sleep calculator based on 90-minute sleep cycles. Find the best bedtime or wake up time to feel refreshed. Includes age-based CDC sleep recommendations.",
  keywords: ["sleep calculator", "bedtime calculator", "wake up time calculator", "sleep cycle calculator"],
  openGraph: {
    title: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
    description:
      "Free sleep calculator based on 90-minute sleep cycles. Find the best time to wake up or go to sleep to feel refreshed.",
    url: "https://sleepschedule.in",
  },
};

export default function HomePage() {
  const websiteSchema = buildWebSiteSchema();
  const faqSchema = buildFAQSchema([
    {
      question: "What is a sleep calculator?",
      answer: "A sleep calculator helps you find the best time to wake up or go to sleep based on your body's natural 90-minute sleep cycles, so you wake up feeling refreshed instead of groggy.",
    },
    {
      question: "How many sleep cycles do I need?",
      answer: "Most adults need 5–6 complete sleep cycles (7.5–9 hours) per night. Each cycle lasts approximately 90 minutes and includes light sleep, deep sleep, and REM sleep stages.",
    },
    {
      question: "Why do I wake up groggy even after 8 hours?",
      answer: "Grogginess (sleep inertia) often occurs when you wake up in the middle of a deep sleep stage. Using a sleep calculator helps you time your alarm to the end of a complete 90-minute cycle.",
    },
    {
      question: "How long does it take to fall asleep?",
      answer: "The average person takes about 15 minutes to fall asleep. This calculator accounts for this buffer when calculating your ideal wake up or bedtime.",
    },
  ]);

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Sleep Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Based on 90-minute sleep cycles. Find the perfect time to wake up, go to sleep, or
            discover how much sleep your body actually needs.
          </p>
        </div>

        {/* Calculator */}
        <SleepCalculator />

        {/* How it works */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔄",
              title: "90-Minute Cycles",
              body: "Your brain cycles through light sleep, deep sleep, and REM roughly every 90 minutes. Waking at the end of a cycle means less grogginess.",
            },
            {
              icon: "⏰",
              title: "15-Min Fall-Asleep Buffer",
              body: "The average person takes about 15 minutes to fall asleep. This calculator accounts for that so your times are accurate.",
            },
            {
              icon: "🧬",
              title: "Age-Based Recommendations",
              body: "The CDC publishes sleep duration guidelines by age group. Our duration calculator uses these to flag if you're under-sleeping.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "What is a sleep calculator?",
                a: "A sleep calculator helps you find the best time to wake up or go to sleep based on your body's natural 90-minute sleep cycles, so you wake up feeling refreshed instead of groggy.",
              },
              {
                q: "How many sleep cycles do I need?",
                a: "Most adults need 5–6 complete sleep cycles (7.5–9 hours) per night. Each cycle lasts approximately 90 minutes and includes light sleep, deep sleep, and REM sleep stages.",
              },
              {
                q: "Why do I wake up groggy even after 8 hours?",
                a: "Grogginess often occurs when you wake up in the middle of a deep sleep stage. This calculator times your alarm to the end of a complete cycle to minimize grogginess.",
              },
              {
                q: "How long does it take to fall asleep?",
                a: "The average person takes about 15 minutes to fall asleep. This calculator accounts for this buffer when calculating your ideal wake-up or bedtime.",
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
