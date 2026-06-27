import type { Metadata } from "next";
import NapTab from "@/components/calculator/NapTab";
import StructuredData from "@/components/seo/StructuredData";
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
    "Find the perfect nap duration. A 20-minute power nap boosts alertness without grogginess. A 90-minute nap completes a full sleep cycle."
  );
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webAppSchema} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Nap Calculator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Pick your nap start time and get the perfect alarm. A 20-minute power nap or a
            90-minute full cycle — both wake you up without grogginess.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            <time dateTime="2026-06-27">Last reviewed: June 2026</time>
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

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How this calculator works</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Enter your nap start time and the calculator adds 20 minutes (power nap) and 90 minutes (full cycle) to give you wake alarms for both durations. The 20-minute duration is chosen to keep you in Stage 1 and Stage 2 light sleep — short enough that most people don&apos;t enter deep slow-wave sleep (N3), which is what causes sleep inertia. The 90-minute duration allows a complete N1 → N2 → N3 → REM cycle, so you wake at the end of REM rather than mid-N3.
          </p>
          <p className="text-slate-400 leading-relaxed">
            A sleep onset buffer is not applied to naps (unlike nighttime sleep) because many people fall asleep faster when napping during the day. If you typically take 10+ minutes to fall asleep for naps, set your start time 10 minutes earlier.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Optimal nap window by wake time</h2>
          <p className="text-slate-400 mb-4 text-sm">Napping too late reduces nighttime sleep drive. This table shows the latest recommended nap start time based on your wake time, assuming a 10–11 PM bedtime.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2 pr-6 font-medium">Wake time</th>
                  <th className="pb-2 pr-6 font-medium">Latest 20-min nap start</th>
                  <th className="pb-2 font-medium">Latest 90-min nap start</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["5:00 AM", "3:00 PM", "1:30 PM"],
                  ["6:00 AM", "3:30 PM", "2:00 PM"],
                  ["7:00 AM", "4:00 PM", "2:30 PM"],
                  ["8:00 AM", "4:30 PM", "3:00 PM"],
                  ["9:00 AM", "5:00 PM", "3:30 PM"],
                ].map(([wake, max20, max90]) => (
                  <tr key={wake} className="border-b border-white/5">
                    <td className="py-2.5 pr-6 font-semibold text-white">{wake}</td>
                    <td className="py-2.5 pr-6 text-indigo-300 font-medium">{max20}</td>
                    <td className="py-2.5 text-indigo-300 font-medium">{max90}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">Based on a standard 10–11 PM bedtime target. Adjust proportionally for later bedtimes.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Interpreting your nap alarm</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            The <strong className="text-white">20-minute alarm</strong> is best for a quick alertness boost before an afternoon meeting, a commute, or exercise. Expect to feel alert within 5 minutes of waking — no grogginess, immediate performance improvement. The{" "}
            <a href="https://ntrs.nasa.gov/citations/19950006329" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">NASA nap study (Rosekind et al., 1994)</a>{" "}
            showed this duration improves alertness by 54% and performance by 34% in pilots.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The <strong className="text-white">90-minute alarm</strong> is best when you need to consolidate learning, recover from significant sleep debt, or have 2+ hours before your next commitment. Expect minimal grogginess because you&apos;re waking from the end of REM or light N2 — not from deep sleep. Allow yourself 5 minutes to fully orient before driving or precision work.
          </p>
        </section>

        <section className="mb-12">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-6 flex items-start gap-4">
            <div className="text-2xl">🔗</div>
            <div>
              <p className="text-sm font-semibold text-indigo-300 mb-1">Related tool</p>
              <p className="text-slate-300 text-sm mb-3">Needing a daily nap to function often signals accumulated sleep debt. See how much sleep you&apos;ve lost this week.</p>
              <a href="/sleep-debt-calculator" className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors">Sleep Debt Calculator →</a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
          <p className="text-slate-400 leading-relaxed">
            Nap duration recommendations are based on population-average sleep cycle lengths of 90 minutes. Individual cycles range from 70–110 minutes. If you consistently wake feeling groggy from a 20-minute nap, your sleep onset may be faster than average — try 15 minutes. If you regularly feel groggy after 90 minutes, your cycle may be shorter — try 75 minutes. Napping is not a substitute for adequate nighttime sleep and cannot fully repay chronic sleep debt.
          </p>
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

        <section className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-slate-500">
            Sources:{" "}
            <a href="https://ntrs.nasa.gov/citations/19950006329" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              NASA Technical Memorandum 108839 — Rosekind et al. (1994)
            </a>
            {" "}·{" "}
            <a href="https://www.thensf.org/sleep-in-america-polls/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400 transition-colors">
              National Sleep Foundation
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
