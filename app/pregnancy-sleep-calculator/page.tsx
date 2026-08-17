import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Moon, Heart, AlarmClock } from "lucide-react";
import PregnancyTab from "@/components/calculator/PregnancyTab";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildWebAppSchema } from "@/lib/seo/schemas";

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
  const webAppSchema = buildWebAppSchema(
    "Pregnancy Sleep Calculator",
    "https://sleepschedule.in/pregnancy-sleep-calculator",
    "Trimester-specific sleep recommendations, common sleep issues, and tips for better pregnancy sleep based on ACOG and NSF guidelines.",
    { dateModified: "2026-08-17" }
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://sleepschedule.in" },
          { name: "Pregnancy Sleep Calculator", url: "https://sleepschedule.in/pregnancy-sleep-calculator" },
        ]}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Pregnancy Sleep Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Select your trimester to see how much sleep you need, common sleep issues, and tips to help you rest better.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Written by{" "}
            <a href="/about" className="underline hover:text-slate-400 transition-colors">
              Siddhant Pandagle
            </a>
            {" "}&middot; <time dateTime="2026-08-17">Last reviewed: August 2026</time>
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-12">
          <PregnancyTab />
        </section>

        <section className="mb-12 grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: AlarmClock,
              title: "First Trimester",
              body: "Extreme fatigue is normal — progesterone rises sharply. Aim for 8–10 hours and nap when needed.",
            },
            {
              Icon: Heart,
              title: "Second Trimester",
              body: "Most comfortable trimester for sleep. Start side sleeping to prepare for third trimester.",
            },
            {
              Icon: Moon,
              title: "Third Trimester",
              body: "Discomfort peaks. A full-body pillow, left-side sleeping, and limiting fluids before bed all help.",
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 text-indigo-400"><Icon className="w-7 h-7" aria-hidden="true" /></div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why pregnancy disrupts sleep</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Each trimester of pregnancy brings a distinct combination of hormonal and physical changes that reshape how — and how well — you sleep. Understanding what&apos;s driving the disruption in each phase makes it easier to tell ordinary discomfort apart from something worth flagging to your provider.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            <strong className="text-slate-200">First trimester (weeks 1–12).</strong> Progesterone rises sharply almost as soon as the placenta begins forming, and this hormone has a natural sedative effect — it&apos;s a major reason so many people feel an overwhelming urge to nap in the early months. Progesterone also relaxes smooth muscle throughout the body, including the bladder, which is part of why frequent urination starts interrupting sleep this early. Nausea and heightened smell sensitivity can make it harder to fall back asleep after waking.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            <strong className="text-slate-200">Second trimester (weeks 13–26).</strong> Hormone levels tend to stabilize during this stretch, and for many people it&apos;s the most restful trimester of the three. It isn&apos;t maintenance-free, though: round ligament pain — a stretching sensation on one or both sides of the lower abdomen as the uterus grows — can cause brief nighttime discomfort, and vivid or unusual dreams, likely tied to hormonal shifts and more time spent in REM sleep, are common.
          </p>
          <p className="text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Third trimester (weeks 27–40).</strong> This is typically the hardest trimester for sleep. A larger uterus presses on the bladder again, bringing back frequent nighttime bathroom trips, and the same growing weight — combined with a shifted center of gravity — contributes to lower back pain that makes side sleeping, and finding any comfortable position, more difficult. Restless leg syndrome (an uncomfortable urge to move the legs that&apos;s worse at rest) also becomes more common in the third trimester. On top of the physical load, mild anxiety about labor and the transition to parenthood can make it harder to fall asleep even when the body is exhausted. According to the{" "}
            <a href="https://www.acog.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              American College of Obstetricians and Gynecologists (ACOG)
            </a>, these disruptions are a normal part of pregnancy for most people, but persistent or severe sleep problems are still worth discussing at a prenatal visit rather than dismissing as unavoidable.
          </p>
        </section>

        <section className="mb-12">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <p className="text-sm text-slate-300 leading-relaxed">
              Feeling wiped out during the day? Pregnancy fatigue — especially in the first and third trimesters — is extremely common. A short, well-timed nap can help you catch up without wrecking your nighttime sleep.
            </p>
            <Link
              href="/nap-calculator"
              className="shrink-0 inline-flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2.5 transition-colors"
            >
              Try the Nap Calculator
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Safe sleep positions during pregnancy</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            As pregnancy progresses, sleep position becomes more than a matter of comfort. Guidance from{" "}
            <a href="https://www.acog.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              ACOG
            </a>{" "}
            and the{" "}
            <a href="https://www.thensf.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              National Sleep Foundation (NSF)
            </a>{" "}
            generally recommends left-side sleeping in the second half of pregnancy. Lying on the left side keeps the weight of the growing uterus off the inferior vena cava — the large vein that returns blood from the lower body to the heart — which supports healthy blood flow to the placenta.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Sleeping on your back for extended periods later in pregnancy is generally discouraged for the same reason. If you wake up on your back, that&apos;s normal and not a cause for alarm — simply roll to your side rather than worrying about the position you fell asleep in. A pregnancy pillow, or a regular pillow tucked between the knees, can take pressure off the hips and lower back and make side sleeping easier to maintain through the night. There isn&apos;t one position that works for everyone; a wedge under the belly, extra pillow support, or a firmer mattress are all reasonable ways to make side sleeping more sustainable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sleep changes by trimester</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-4 font-medium">Trimester</th>
                  <th className="pb-2 pr-4 font-medium">Sleep need</th>
                  <th className="pb-2 pr-4 font-medium">Main disruptors</th>
                  <th className="pb-2 font-medium">Key intervention</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["First (wks 1–12)",   "8–10 hrs", "Progesterone surge, nausea, frequent urination", "Nap freely; prioritize total sleep"],
                  ["Second (wks 13–26)", "8–9 hrs",  "Growing belly, round ligament pain, vivid dreams", "Start side sleeping; body pillow"],
                  ["Third (wks 27–40)",  "8–10 hrs", "Fetal movement, reflux, RLS, anxiety",            "Wedge pillow; limit fluids after 6 PM"],
                ].map(([trimester, need, disruptors, intervention]) => (
                  <tr key={trimester} className="border-b border-white/5 align-top">
                    <td className="py-2.5 pr-4 font-semibold text-white whitespace-nowrap">{trimester}</td>
                    <td className="py-2.5 pr-4 text-indigo-300 font-medium whitespace-nowrap">{need}</td>
                    <td className="py-2.5 pr-4">{disruptors}</td>
                    <td className="py-2.5">{intervention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Interpreting your results</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            The calculator shows the recommended range for your trimester and whether your current sleep meets it. Meeting the recommended range means your sleep duration is supporting fetal development and maternal health. Falling below it consistently warrants attention — but short-term disruption (illness, travel, stress) is normal and not immediately concerning.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Sleeping significantly above the recommendation (10+ hours while still feeling unrefreshed) can indicate anemia, thyroid dysfunction, or sleep-disordered breathing — all more common during pregnancy. Mention this to your OB or midwife.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            This tool provides general sleep duration guidance based on ACOG and NSF recommendations. It does not account for multiple pregnancies, pre-existing sleep disorders, high-risk pregnancy conditions, or individual variation in sleep need. This page is written by a non-clinician and summarizes publicly available guidance from ACOG and NSF — it is not medical advice, and it is not a substitute for care from your OB, midwife, or another qualified healthcare provider.
          </p>
          <h3 className="text-lg font-semibold text-white mb-3">When to talk to your doctor</h3>
          <p className="text-slate-400 leading-relaxed">
            Reach out to your provider if you notice any of the following, rather than waiting to see if it resolves on its own: insomnia severe enough that you&apos;re consistently getting only a few hours of sleep; loud snoring, gasping, or choking sounds during sleep (pregnancy increases the risk of sleep apnea, particularly in the third trimester); or restless leg symptoms that are frequent, intense, or making it hard to fall asleep. These are medical questions, not calculator questions — they&apos;re worth raising at your next prenatal visit even if you&apos;re not sure they&apos;re &quot;serious enough&quot; to mention.
          </p>
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
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-slate-500">
            Sources:{" "}
            <a href="https://www.acog.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              American College of Obstetricians and Gynecologists (ACOG)
            </a>
            {" "}·{" "}
            <a href="https://www.thensf.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              National Sleep Foundation (NSF)
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
