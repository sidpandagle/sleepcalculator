import type { Metadata } from "next";
import SleepDebtTab from "@/components/calculator/SleepDebtTab";
import StructuredData from "@/components/seo/StructuredData";

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
        text: "Even one night of 6 hours instead of 8 measurably impairs cognition equal to 24 hours without sleep. Accumulating more than 10 hours of sleep debt significantly impairs physical and mental performance.",
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
  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Sleep Debt Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Enter how many hours you slept and your age to see your sleep debt versus CDC recommendations.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <SleepDebtTab />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sleep requirements by age group</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-6 font-medium">Age group</th>
                  <th className="pb-2 pr-6 font-medium">Age range</th>
                  <th className="pb-2 font-medium">CDC recommended</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Toddler",      "1–3 years",   "11–14 hours"],
                  ["Preschool",    "3–5 years",   "10–13 hours"],
                  ["School-age",   "6–12 years",  "9–11 hours"],
                  ["Teenager",     "13–17 years", "8–10 hours"],
                  ["Adult",        "18–64 years", "7–9 hours"],
                  ["Older Adult",  "65+ years",   "7–8 hours"],
                ].map(([group, range, rec]) => (
                  <tr key={group} className="border-b border-white/5">
                    <td className="py-2.5 pr-6 font-semibold text-white">{group}</td>
                    <td className="py-2.5 pr-6">{range}</td>
                    <td className="py-2.5 text-indigo-300 font-medium">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">Source: CDC Sleep Recommendations 2023</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
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
                a: "Even one night of 6 hours instead of 8 measurably impairs cognition equal to 24 hours without sleep. Accumulating more than 10 hours of sleep debt significantly impairs physical and mental performance.",
              },
              {
                q: "How do I pay back sleep debt?",
                a: "Add 1–2 extra hours per night until fully rested. Avoid recovering all at once — sleeping 12 hours disrupts your circadian rhythm. Weekend recovery sleep helps but does not fully compensate for weekday debt.",
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
