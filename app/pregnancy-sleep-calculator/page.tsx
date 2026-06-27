import type { Metadata } from "next";
import PregnancyTab from "@/components/calculator/PregnancyTab";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Pregnancy Sleep Calculator — How Much Sleep Do You Need?",
  description:
    "How much sleep do you need during pregnancy? Get trimester-specific recommendations, common sleep issues, and tips based on ACOG and NSF guidelines.",
  alternates: { canonical: "https://sleepschedule.in/pregnancy-sleep-calculator" },
  openGraph: {
    title: "Pregnancy Sleep Calculator — How Much Sleep Do You Need?",
    description: "Trimester-specific sleep recommendations, common issues, and tips for better pregnancy sleep.",
    url: "https://sleepschedule.in/pregnancy-sleep-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much sleep do you need during pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pregnant women generally need 8–10 hours of sleep per night, more than the 7–9 hours recommended for non-pregnant adults. Sleep needs are highest in the first and third trimesters due to fatigue and physical discomfort.",
      },
    },
    {
      "@type": "Question",
      name: "Why is sleep so important during pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sleep supports fetal development, immune function, and hormone regulation. Poor sleep during pregnancy is linked to higher risk of gestational diabetes, preeclampsia, longer labor, and postpartum depression.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best sleeping position during pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Left-side sleeping is recommended from the second trimester onward. It improves blood flow to the placenta and reduces pressure on the liver. A pregnancy pillow between the knees reduces hip and back strain.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't I sleep in the third trimester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Third trimester sleep difficulties are extremely common. A growing belly makes all positions uncomfortable, frequent urination disrupts sleep, and restless leg syndrome peaks. Many women also experience heightened anxiety about labor and delivery.",
      },
    },
  ],
};

export default function PregnancySleepCalculatorPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Pregnancy Sleep Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Select your trimester to see how much sleep you need, common sleep issues, and tips to help you rest better.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <PregnancyTab />
        </section>

        <section className="mb-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "😴",
              title: "First Trimester",
              body: "Extreme fatigue is normal — progesterone rises sharply. Aim for 8–10 hours and nap when needed.",
            },
            {
              icon: "🤰",
              title: "Second Trimester",
              body: "Most comfortable trimester for sleep. Start side sleeping to prepare for third trimester.",
            },
            {
              icon: "🌙",
              title: "Third Trimester",
              body: "Discomfort peaks. A full-body pillow, left-side sleeping, and limiting fluids before bed all help.",
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
                q: "How much sleep do you need during pregnancy?",
                a: "Pregnant women generally need 8–10 hours per night — more than the 7–9 hours for non-pregnant adults. Sleep needs are highest in the first and third trimesters.",
              },
              {
                q: "Why is sleep so important during pregnancy?",
                a: "Sleep supports fetal development, immune function, and hormone regulation. Poor pregnancy sleep is linked to gestational diabetes, preeclampsia, longer labor, and postpartum depression.",
              },
              {
                q: "What is the best sleeping position during pregnancy?",
                a: "Left-side sleeping is recommended from the second trimester onward — it improves blood flow to the placenta. A pillow between the knees reduces hip and back strain.",
              },
              {
                q: "Why can't I sleep in the third trimester?",
                a: "A growing belly makes all positions uncomfortable, frequent urination disrupts sleep, restless leg syndrome peaks, and anxiety about labor rises. A full-body pregnancy pillow helps significantly.",
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
