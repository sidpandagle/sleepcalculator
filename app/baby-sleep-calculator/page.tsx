import type { Metadata } from "next";
import BabyTab from "@/components/calculator/BabyTab";
import StructuredData from "@/components/seo/StructuredData";
import { buildWebAppSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Baby Sleep Calculator — How Much Sleep Does Your Baby Need?",
  description:
    "How much sleep does your baby need? Enter your baby's age in months to see total sleep, nighttime hours, and nap count based on AAP guidelines.",
  alternates: { canonical: "https://sleepschedule.in/baby-sleep-calculator" },
  openGraph: {
    title: "Baby Sleep Calculator — How Much Sleep Does Your Baby Need?",
    description: "Total sleep, nighttime hours, and nap count for your baby's age, based on AAP guidelines.",
    url: "https://sleepschedule.in/baby-sleep-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much sleep does a newborn need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Newborns (0–1 month) need 14–17 hours of sleep per 24 hours, split across 4 or more naps. They have not yet developed a circadian rhythm so sleep is distributed throughout day and night.",
      },
    },
    {
      "@type": "Question",
      name: "When do babies start sleeping through the night?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most babies begin consolidating nighttime sleep between 4–6 months, though many still wake once or twice. By 9–12 months, most babies can sleep 10–12 hours at night with 1–2 daytime naps.",
      },
    },
    {
      "@type": "Question",
      name: "How many naps should a 6-month-old take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 6-month-old typically takes 3 naps per day totaling about 3–4 hours. By 9 months, most babies transition to 2 naps. By 15–18 months, most drop to 1 nap.",
      },
    },
    {
      "@type": "Question",
      name: "Is it okay if my baby sleeps more or less than the recommendation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Guidelines are averages. Individual babies vary significantly. As long as your baby seems well-rested, is growing normally, and is hitting developmental milestones, slight variations from the guideline are usually not concerning.",
      },
    },
  ],
};

export default function BabySleepCalculatorPage() {
  const webAppSchema = buildWebAppSchema(
    "Baby Sleep Calculator",
    "https://sleepschedule.in/baby-sleep-calculator",
    "How much sleep does your baby need? Total sleep, nighttime hours, and nap count for your baby's age, based on AAP guidelines."
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Baby Sleep Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Slide to your baby&apos;s age to see total sleep, nighttime hours, and nap count based on AAP guidelines.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            <time dateTime="2026-06-27">Last reviewed: June 2026</time>
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <BabyTab />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Baby sleep by age</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-4 font-medium">Age</th>
                  <th className="pb-2 pr-4 font-medium">Total</th>
                  <th className="pb-2 pr-4 font-medium">Night</th>
                  <th className="pb-2 pr-4 font-medium">Naps</th>
                  <th className="pb-2 font-medium">Nap count</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Newborn (0–1 mo)",  "16h", "8.5h", "7.5h", "4+"],
                  ["2–3 months",        "15h", "9h",   "6h",   "4"],
                  ["4–11 months",       "14h", "10h",  "4h",   "3"],
                  ["12–23 months",      "13h", "11h",  "2h",   "1–2"],
                  ["24 months",         "12h", "11h",  "1h",   "1"],
                ].map(([age, total, night, naps, napCount]) => (
                  <tr key={age} className="border-b border-white/5">
                    <td className="py-2.5 pr-4 font-semibold text-white">{age}</td>
                    <td className="py-2.5 pr-4 text-indigo-300 font-medium">{total}</td>
                    <td className="py-2.5 pr-4">{night}</td>
                    <td className="py-2.5 pr-4">{naps}</td>
                    <td className="py-2.5">{napCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Source:{" "}
            <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              American Academy of Pediatrics (AAP)
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How this calculator works</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Slide to your baby&apos;s age in months. The calculator shows total daily sleep, approximate nighttime sleep, daytime nap hours, and typical nap count — all derived from{" "}
            <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">AAP</a>{" "}
            sleep guidelines and published pediatric sleep research.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Before 3–4 months, babies lack a fully developed circadian rhythm — sleep is polyphasic and distributed across day and night. Between 4–6 months, the circadian rhythm matures, enabling the longer nighttime stretches most parents notice as &quot;sleeping through the night.&quot;
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding your baby&apos;s sleep needs</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            <strong className="text-white">Nap count matters.</strong> Babies transition through predictable milestones: 4+ naps (newborn) → 3 naps (~4 months) → 2 naps (~9 months) → 1 nap (~15 months) → no nap (~3 years). Dropping naps too early is one of the most common causes of infant overtiredness. An overtired baby produces excess cortisol, which paradoxically makes it harder to fall asleep — not easier.
          </p>
          <p className="text-slate-400 leading-relaxed">
            <strong className="text-white">Wake windows</strong> — the time a baby can stay awake between sleeps before becoming overtired — are age-dependent and shorter than most parents expect. A 6-week-old can typically only manage 45–60 minutes of wakefulness before needing to sleep again.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Safe sleep guidelines</h2>
          <p className="text-slate-400 leading-relaxed mb-3">AAP safe sleep recommendations for infants under 12 months:</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2"><span className="text-indigo-400 mt-0.5">•</span><span><strong className="text-white">Back to sleep, every time.</strong> Always place babies on their back for every sleep — naps and nighttime.</span></li>
            <li className="flex gap-2"><span className="text-indigo-400 mt-0.5">•</span><span><strong className="text-white">Firm, flat surface.</strong> A firm sleep surface with a fitted sheet. No soft bedding, pillows, or bumpers.</span></li>
            <li className="flex gap-2"><span className="text-indigo-400 mt-0.5">•</span><span><strong className="text-white">Room sharing, not bed sharing.</strong> The AAP recommends room sharing (separate sleep surface) for at least the first 6 months.</span></li>
            <li className="flex gap-2"><span className="text-indigo-400 mt-0.5">•</span><span><strong className="text-white">Avoid overheating.</strong> Dress babies in one layer more than an adult would wear in the same environment.</span></li>
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            Source:{" "}
            <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              American Academy of Pediatrics (AAP) Safe Sleep Guidelines
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
          <p className="text-slate-400 leading-relaxed">
            Guidelines represent population averages. A healthy baby sleeping 1–2 hours outside the range who is growing normally, feeding well, and hitting developmental milestones is generally not a cause for concern. Premature infants should have sleep needs assessed based on corrected age, not chronological age. Sleep regressions at 4 months, 8–10 months, and 12 months are normal developmental phases. This tool does not diagnose sleep disorders in infants — consult your pediatrician if you have concerns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "How much sleep does a newborn need?",
                a: "Newborns need 14–17 hours per 24 hours across 4+ naps. They haven't developed a circadian rhythm yet so sleep is distributed throughout day and night.",
              },
              {
                q: "When do babies start sleeping through the night?",
                a: "Most babies begin consolidating nighttime sleep between 4–6 months. By 9–12 months, most can sleep 10–12 hours at night with 1–2 daytime naps.",
              },
              {
                q: "How many naps should a 6-month-old take?",
                a: "A 6-month-old typically takes 3 naps per day totaling 3–4 hours. By 9 months most transition to 2 naps; by 15–18 months most drop to 1.",
              },
              {
                q: "Is it okay if my baby sleeps more or less than the recommendation?",
                a: "Guidelines are averages — individual babies vary. As long as your baby seems well-rested, is growing normally, and hitting developmental milestones, slight variations are usually fine.",
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
