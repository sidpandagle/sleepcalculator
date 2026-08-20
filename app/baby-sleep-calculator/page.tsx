import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import BabyTab from "@/components/calculator/BabyTab";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
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
    "How much sleep does your baby need? Total sleep, nighttime hours, and nap count for your baby's age, based on AAP guidelines.",
    { dateModified: "2026-08-17" }
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://sleepschedule.in" },
          { name: "Baby Sleep Calculator", url: "https://sleepschedule.in/baby-sleep-calculator" },
        ]}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif font-normal text-5xl sm:text-6xl text-linen mb-4 leading-tight">
            Baby Sleep Calculator
          </h1>
          <p className="text-lg text-mist max-w-2xl mx-auto">
            Slide to your baby&apos;s age to see total sleep, nighttime hours, and nap count based on AAP guidelines.
          </p>
          <p className="text-xs text-mist/70 mt-3">
            Written by{" "}
            <a href="/about" className="underline hover:text-mist transition-colors">
              Siddhant Pandagle
            </a>
            {" "}&middot; <time dateTime="2026-08-17">Last reviewed: August 2026</time>
          </p>
          <p className="text-xs text-amber-500/80 mt-2 max-w-xl mx-auto">
            For general guidance only. Always consult your pediatrician for your baby&apos;s individual needs.
          </p>
        </div>

        <section className="rounded-[26px] border border-moon/10 bg-dusk p-6 md:p-8 mb-12">
          <BabyTab />
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Baby sleep by age</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-moon/8 text-mist">
                  <th className="pb-2 pr-4 font-medium">Age</th>
                  <th className="pb-2 pr-4 font-medium">Total</th>
                  <th className="pb-2 pr-4 font-medium">Night</th>
                  <th className="pb-2 pr-4 font-medium">Naps</th>
                  <th className="pb-2 font-medium">Nap count</th>
                </tr>
              </thead>
              <tbody className="text-mist">
                {[
                  ["Newborn (0–1 mo)",  "16h", "8.5h", "7.5h", "4+"],
                  ["2–3 months",        "15h", "9h",   "6h",   "4"],
                  ["4–11 months",       "14h", "10h",  "4h",   "3"],
                  ["12–23 months",      "13h", "11h",  "2h",   "1–2"],
                  ["24 months",         "12h", "11h",  "1h",   "1"],
                ].map(([age, total, night, naps, napCount]) => (
                  <tr key={age} className="border-b border-moon/5">
                    <td className="py-2.5 pr-4 font-semibold text-linen">{age}</td>
                    <td className="py-2.5 pr-4 text-ember-light font-medium">{total}</td>
                    <td className="py-2.5 pr-4">{night}</td>
                    <td className="py-2.5 pr-4">{naps}</td>
                    <td className="py-2.5">{napCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-mist/70 mt-3">
            Source:{" "}
            <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              American Academy of Pediatrics (AAP)
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">How this calculator works</h2>
          <p className="text-mist leading-relaxed">
            Slide to your baby&apos;s age in months. The calculator shows total daily sleep, approximate nighttime sleep, daytime nap hours, and typical nap count — all derived from{" "}
            <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">AAP</a>{" "}
            sleep guidelines. The section below explains why those numbers shift so much from one age to the next.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Why infant sleep changes so much by age</h2>
          <p className="text-mist leading-relaxed mb-4">
            Newborn sleep looks nothing like adult sleep, and it isn&apos;t supposed to. For roughly the first three months of life, babies have not yet developed a circadian rhythm — the internal body clock that eventually tells the body when it&apos;s night and when it&apos;s day. That&apos;s part of why a one-month-old sleeps in short, scattered stretches spread across the full 24 hours instead of concentrating sleep at night the way an older child or adult does.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Melatonin, the hormone most associated with sleep onset, isn&apos;t produced in a consistent day/night pattern by a young baby&apos;s own body — that regulation develops gradually over the first few months of life. As melatonin production comes online, babies typically shift from the scattered sleep of the newborn period toward longer, more consolidated nighttime stretches, which is what most parents notice as their baby &quot;starting to sleep through the night&quot; somewhere between 4 and 6 months.
          </p>
          <p className="text-mist leading-relaxed mb-4">
            Total daily sleep also declines steadily across the first two years — not because babies need less rest as they grow, but because the makeup of that sleep changes as the brain develops. The overall number of hours a baby needs each day tapers from roughly 16 hours at birth to around 12 hours by age two, as reflected in the age-by-age table above.
          </p>
          <p className="text-mist leading-relaxed">
            In practical terms, this means the erratic, round-the-clock sleep of the newborn weeks is expected biology, not a problem to fix. There is little value in trying to impose an adult-style schedule on a baby who doesn&apos;t yet have the internal machinery to follow one. As the circadian rhythm and melatonin regulation described above come online, a more predictable pattern of naps and nighttime sleep tends to emerge on its own — which is why the schedules that make sense for a 2-month-old, 6-month-old, and 18-month-old look so different from each other.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Understanding your baby&apos;s sleep needs</h2>
          <p className="text-mist leading-relaxed mb-4">
            <strong className="text-linen">Nap count matters.</strong> Babies transition through predictable milestones: 4+ naps (newborn) → 3 naps (~4 months) → 2 naps (~9 months) → 1 nap (~15 months) → no nap (~3 years). Dropping naps too early is one of the most common causes of infant overtiredness. An overtired baby produces excess cortisol, which paradoxically makes it harder to fall asleep — not easier.
          </p>
          <p className="text-mist leading-relaxed">
            <strong className="text-linen">Wake windows</strong> — the time a baby can stay awake between sleeps before becoming overtired — are age-dependent and shorter than most parents expect. A 6-week-old can typically only manage 45–60 minutes of wakefulness before needing to sleep again. As the circadian rhythm and melatonin regulation described above mature, wake windows lengthen and naps consolidate into fewer, longer blocks, which is why the schedule that worked at 6 weeks stops working by 6 months.
          </p>
        </section>

        <div className="rounded-[18px] border border-moon/9 bg-dusk p-6 mb-12">
          <p className="text-mist leading-relaxed">
            Wondering how your baby&apos;s sleep needs compare to other ages — toddlers, teens, or adults? See the full picture in the{" "}
            <Link href="/sleep-duration-calculator" className="text-ember hover:text-ember-light underline transition-colors">
              Sleep Duration Calculator
            </Link>
            .
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Safe sleep guidelines</h2>
          <p className="text-mist leading-relaxed mb-3">
            Following safe sleep practices for every sleep — naps included — is one of the most effective ways parents can reduce risk, per AAP guidance. Recommendations for infants under 12 months:
          </p>
          <ul className="space-y-2 text-sm text-mist">
            <li className="flex gap-2"><span className="text-ember mt-0.5">•</span><span><strong className="text-linen">Back to sleep, every time.</strong> Always place babies on their back for every sleep — naps and nighttime.</span></li>
            <li className="flex gap-2"><span className="text-ember mt-0.5">•</span><span><strong className="text-linen">Firm, flat surface.</strong> A firm sleep surface with a fitted sheet — no soft bedding, loose blankets, pillows, bumpers, or soft toys in the crib or bassinet.</span></li>
            <li className="flex gap-2"><span className="text-ember mt-0.5">•</span><span><strong className="text-linen">Room sharing, not bed sharing.</strong> The AAP recommends room sharing (separate sleep surface) for at least the first 6 months, and ideally for the first 12 months.</span></li>
            <li className="flex gap-2"><span className="text-ember mt-0.5">•</span><span><strong className="text-linen">Avoid overheating.</strong> Dress babies in one layer more than an adult would wear in the same environment.</span></li>
          </ul>
          <p className="text-xs text-mist/70 mt-4">
            Source:{" "}
            <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              American Academy of Pediatrics (AAP) Safe Sleep Guidelines
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Limitations — and when to talk to your pediatrician</h2>
          <p className="text-mist leading-relaxed mb-4">
            Guidelines represent population averages, and every baby is different. A healthy baby sleeping 1–2 hours outside the range shown above, who is growing normally, feeding well, and hitting developmental milestones, is generally not a cause for concern. Premature infants should have sleep expectations assessed against corrected age (counted from the original due date, not the birth date). Sleep regressions around 4 months, 8–10 months, and 12 months are a normal, temporary part of development, not a sign that something is wrong.
          </p>
          <p className="text-mist leading-relaxed">
            This calculator is an educational estimate, not a diagnostic tool, and it cannot account for your baby&apos;s individual health history, temperament, or medical needs. If sleep struggles persist for weeks despite a consistent routine, if you notice loud snoring, pauses in breathing, or gasping during sleep, or if you have any concern about your baby&apos;s growth or development, that warrants a real conversation with your pediatrician rather than reliance on a calculator. Always consult your pediatrician before making changes to your baby&apos;s sleep routine, feeding schedule, or sleep environment — this tool provides general guidance only and is not a substitute for professional medical advice.
          </p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Frequently asked questions</h2>
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
