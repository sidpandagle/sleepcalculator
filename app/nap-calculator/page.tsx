import type { Metadata } from "next";
import { Link2, Plus } from "lucide-react";
import NapTab from "@/components/calculator/NapTab";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildWebAppSchema } from "@/lib/seo/schemas";

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
  const webAppSchema = buildWebAppSchema(
    "Nap Calculator",
    "https://sleepschedule.in/nap-calculator",
    "Find the perfect nap duration. A 20-minute power nap boosts alertness without grogginess. A 90-minute nap completes a full sleep cycle.",
    { dateModified: "2026-08-17" }
  );
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://sleepschedule.in" },
          { name: "Nap Calculator", url: "https://sleepschedule.in/nap-calculator" },
        ]}
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-16 pb-10">
        <div className="max-w-[56ch]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ember/30 bg-ember/9 text-[12.5px] tracking-wide uppercase text-ember">
            Daytime rest
          </div>
          <h1 className="font-serif font-normal text-5xl sm:text-[68px] leading-[1.02] mt-5 text-linen">
            Nap <span className="italic text-ember">Calculator</span>
          </h1>
          <p className="text-lg leading-relaxed text-mist mt-4">
            Pick your nap start time and get the perfect alarm. A 20-minute power nap or a
            90-minute full cycle — both wake you up without grogginess.
          </p>
          <p className="text-xs text-mist/70 mt-4">
            Written by{" "}
            <a href="/about" className="text-ember hover:text-ember-light transition-colors">
              Siddhant Pandagle
            </a>
            {" "}&middot; <time dateTime="2026-08-17">Last reviewed: August 2026</time>
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-5 mt-11 items-start">
          <section
            className="rounded-[26px] border border-moon/10 p-6 sm:p-7"
            style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))" }}
          >
            <NapTab />
          </section>

          <div className="flex flex-col gap-4">
            <div className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
              <h3 className="text-[17px] font-semibold text-linen">The nap window</h3>
              <p className="text-[14.5px] leading-relaxed text-mist mt-2 mb-4">
                Most people dip in alertness between 1 and 3 PM. That trough is the cheapest place to spend a nap.
              </p>
              <div className="flex gap-[3px] h-14 items-end">
                {[72, 80, 74, 52, 34, 30, 46, 62, 70, 64, 48, 30].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[3px]"
                    style={{
                      height: `${v}%`,
                      background: i >= 3 && i <= 5 ? "#E8B98A" : "rgba(159,178,255,0.35)",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-mist/70 mt-2">
                <span>9 AM</span><span>1 PM</span><span>5 PM</span><span>9 PM</span>
              </div>
            </div>
            <div className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
              <h3 className="text-[17px] font-semibold text-linen">Avoid the 45-minute nap</h3>
              <p className="text-[14.5px] leading-relaxed text-mist mt-2">
                At around 40 minutes you&apos;re deep in slow-wave sleep. Waking there is what produces the heavy, worse-than-before feeling.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
        <section className="mb-12 mt-20">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">How this calculator works</h2>
          <p className="text-mist leading-relaxed mb-4">
            Enter your nap start time and the calculator adds 20 minutes (power nap) and 90 minutes (full cycle) to give you wake alarms for both durations. The 20-minute duration is chosen to keep you in Stage 1 and Stage 2 light sleep — short enough that most people don&apos;t enter deep slow-wave sleep (N3), which is what causes sleep inertia. The 90-minute duration allows a complete N1 → N2 → N3 → REM cycle, so you wake at the end of REM rather than mid-N3.
          </p>
          <p className="text-mist leading-relaxed">
            A sleep onset buffer is not applied to naps (unlike nighttime sleep) because many people fall asleep faster when napping during the day. If you typically take 10+ minutes to fall asleep for naps, set your start time 10 minutes earlier.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Optimal nap window by wake time</h2>
          <p className="text-mist mb-4 text-sm">Napping too late reduces nighttime sleep drive. This table shows the latest recommended nap start time based on your wake time, assuming a 10–11 PM bedtime.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-moon/8 text-mist">
                  <th className="pb-2 pr-6 font-medium">Wake time</th>
                  <th className="pb-2 pr-6 font-medium">Latest 20-min nap start</th>
                  <th className="pb-2 font-medium">Latest 90-min nap start</th>
                </tr>
              </thead>
              <tbody className="text-mist">
                {[
                  ["5:00 AM", "3:00 PM", "1:30 PM"],
                  ["6:00 AM", "3:30 PM", "2:00 PM"],
                  ["7:00 AM", "4:00 PM", "2:30 PM"],
                  ["8:00 AM", "4:30 PM", "3:00 PM"],
                  ["9:00 AM", "5:00 PM", "3:30 PM"],
                ].map(([wake, max20, max90]) => (
                  <tr key={wake} className="border-b border-moon/5">
                    <td className="py-2.5 pr-6 font-semibold text-linen">{wake}</td>
                    <td className="py-2.5 pr-6 text-ember-light font-medium">{max20}</td>
                    <td className="py-2.5 text-ember-light font-medium">{max90}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-mist/70 mt-3">Based on a standard 10–11 PM bedtime target. Adjust proportionally for later bedtimes.</p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Interpreting your nap alarm</h2>
          <p className="text-mist leading-relaxed mb-4">
            The <strong className="text-linen">20-minute alarm</strong> is best for a quick alertness boost before an afternoon meeting, a commute, or exercise. Expect to feel alert within 5 minutes of waking — no grogginess, immediate performance improvement. The{" "}
            <a href="https://ntrs.nasa.gov/citations/19950006329" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">NASA nap study (Rosekind et al., 1994)</a>{" "}
            showed this duration improves alertness by 54% and performance by 34% in pilots.
          </p>
          <p className="text-mist leading-relaxed">
            The <strong className="text-linen">90-minute alarm</strong> is best when you need to consolidate learning, recover from significant sleep debt, or have 2+ hours before your next commitment. Expect minimal grogginess because you&apos;re waking from the end of REM or light N2 — not from deep sleep. Allow yourself 5 minutes to fully orient before driving or precision work.
          </p>
        </section>

        <section className="mb-12">
          <div className="rounded-xl border border-ember/30 bg-ember/10 p-6 flex items-start gap-4">
            <Link2 className="w-5 h-5 text-ember shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ember-light mb-1">Related tool</p>
              <p className="text-mist text-sm mb-3">Needing a daily nap to function often signals accumulated sleep debt. See how much sleep you&apos;ve lost this week.</p>
              <a href="/sleep-debt-calculator" className="text-sm text-ember font-medium hover:text-ember-light transition-colors">Sleep Debt Calculator →</a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-normal text-3xl text-linen mb-4">Limitations</h2>
          <p className="text-mist leading-relaxed">
            Nap duration recommendations are based on population-average sleep cycle lengths of 90 minutes. Individual cycles range from 70–110 minutes. If you consistently wake feeling groggy from a 20-minute nap, your sleep onset may be faster than average — try 15 minutes. If you regularly feel groggy after 90 minutes, your cycle may be shorter — try 75 minutes. Napping is not a substitute for adequate nighttime sleep — the{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline transition-colors">CDC</a>{" "}
            recommends adults get at least 7 hours per night, and a nap cannot fully repay chronic sleep debt. If you find yourself needing a nap most days just to function, that recurring need is itself a signal worth paying attention to, not just the nap timing.
          </p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-3xl text-linen mb-6">Frequently asked questions</h2>
          <div className="flex flex-col">
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
              <details key={q} className="group border-t border-moon/9 py-4 cursor-pointer">
                <summary className="font-medium text-linen list-none flex justify-between items-center gap-4">
                  {q}
                  <Plus className="w-4 h-4 text-ember group-open:rotate-45 transition-transform shrink-0" aria-hidden="true" />
                </summary>
                <p className="pt-3 text-sm text-mist leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-moon/5">
          <p className="text-xs text-mist/70">
            Sources:{" "}
            <a href="https://ntrs.nasa.gov/citations/19950006329" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              NASA Technical Memorandum 108839 — Rosekind et al. (1994)
            </a>
            {" "}·{" "}
            <a href="https://www.thensf.org/sleep-in-america-polls/" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              National Sleep Foundation
            </a>
            {" "}·{" "}
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-mist transition-colors">
              CDC — About Sleep
            </a>
          </p>
        </section>
        </div>
      </div>
    </>
  );
}
