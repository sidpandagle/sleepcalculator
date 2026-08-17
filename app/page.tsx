import type { Metadata } from "next";
import { RefreshCw, AlarmClock, Users, ChevronDown } from "lucide-react";
import SleepCalculator from "@/components/calculator/SleepCalculator";
import StructuredData from "@/components/seo/StructuredData";
import { buildWebSiteSchema, buildFAQSchema, buildOrganizationSchema, buildWebAppSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
  description:
    "Free sleep calculator using 90-minute cycles. Find your ideal bedtime or wake-up time. Based on CDC sleep recommendations.",
  alternates: { canonical: "https://sleepschedule.in" },
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
  const orgSchema = buildOrganizationSchema();
  const webAppSchema = buildWebAppSchema(
    "Sleep Calculator",
    "https://sleepschedule.in",
    "Free sleep calculator based on 90-minute sleep cycles. Find the best bedtime or wake-up time to feel refreshed.",
    { dateModified: "2026-08-17" }
  );
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
      <StructuredData data={orgSchema} />
      <StructuredData data={webAppSchema} />
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
          <p className="text-xs text-slate-500 mt-3">
            Written by{" "}
            <a href="/about" className="underline hover:text-slate-400 transition-colors">
              Siddhant Pandagle
            </a>
            {" "}&middot; <time dateTime="2026-08-17">Last reviewed: August 2026</time>
          </p>
        </div>

        {/* Calculator */}
        <SleepCalculator />

        {/* How it works */}
        <section className="mt-16">
        <h2 className="text-xl font-bold text-white mb-6 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: RefreshCw,
              title: "90-Minute Cycles",
              body: "Your brain cycles through light sleep, deep sleep, and REM roughly every 90 minutes. Waking at the end of a cycle means less grogginess.",
            },
            {
              Icon: AlarmClock,
              title: "15-Min Fall-Asleep Buffer",
              body: "The average person takes about 15 minutes to fall asleep. This calculator accounts for that so your times are accurate.",
            },
            {
              Icon: Users,
              title: "Age-Based Recommendations",
              body: "The CDC publishes sleep duration guidelines by age group. Our duration calculator uses these to flag if you're under-sleeping.",
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 text-indigo-400"><Icon className="w-7 h-7" aria-hidden="true" /></div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </div>
        </section>

        {/* Why 90-minute cycles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why 90-minute cycles?</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-slate-400 leading-relaxed">
              Sleep isn&apos;t one long uniform state — it runs on an ultradian rhythm, a biological cycle shorter than 24 hours that repeats throughout the night. For most healthy adults, one full cycle takes about 90 minutes, and a typical night includes four to six of them back to back. This calculator works in 90-minute increments so your alarm lands at the boundary between cycles rather than in the middle of one, which is the real difference between waking up alert and waking up groggy.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Each cycle moves through distinct stages. It starts with N1, a light, transitional doze that&apos;s easy to interrupt. From there you drop into N2, still light sleep but where heart rate and body temperature begin to fall — this stage makes up the largest share of a night&apos;s sleep. Next comes N3, deep or slow-wave sleep, the stage most linked to physical recovery and the hardest one to wake from without feeling disoriented. The cycle closes with REM (rapid eye movement) sleep, when the brain becomes highly active, most dreaming happens, and memory and learning get consolidated.
            </p>
            <p className="text-slate-400 leading-relaxed">
              The mix of stages isn&apos;t constant across the night. Early cycles lean heavily toward deep, slow-wave sleep — the body prioritizes physical restoration first. As the night goes on, each successive cycle carries less N3 and more REM: the first REM period of the night might last only about 10 minutes, while REM periods late in the night can stretch to 45–50 minutes. That&apos;s why cutting a night short by skipping the last cycle or two costs you disproportionately more REM sleep than deep sleep, and why six hours split across an earlier bedtime can feel noticeably different from the same six hours ending at 6 AM after a midnight bedtime.
            </p>
            <p className="text-slate-400 leading-relaxed">
              This is also the biology behind sleep inertia — that heavy, disoriented feeling when an alarm cuts into slow-wave sleep instead of a lighter stage at a cycle boundary. Timing your bedtime or wake-up to complete full cycles won&apos;t change how much total sleep you get, but it changes when in the cycle you wake up, which is what your grogginess actually tracks. How many total cycles you should be aiming for each night still comes down to age-based sleep duration guidance from the{" "}
              <a
                href="https://www.cdc.gov/sleep/about/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
              >
                CDC
              </a>.
            </p>
          </div>
        </section>

        {/* Which calculator to use */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-3 text-center">Which sleep calculator should you use?</h2>
          <p className="text-slate-400 text-center mb-6 max-w-2xl mx-auto text-sm">
            This page covers general bedtime and wake-up timing. Depending on what you&apos;re actually trying to figure out, one of the other tools on this site may be a more direct fit.
          </p>
          <ul className="max-w-2xl mx-auto space-y-2.5 text-sm">
            {[
              { href: "/nap-calculator", label: "Nap Calculator", desc: "planning a daytime nap and want to avoid grogginess, not a full night of sleep" },
              { href: "/rem-sleep-calculator", label: "REM Sleep Calculator", desc: "want to estimate how much REM sleep a given number of hours actually gives you" },
              { href: "/sleep-debt-calculator", label: "Sleep Debt Calculator", desc: "want to know how far short of your CDC-recommended target you've fallen recently" },
              { href: "/sleep-duration-calculator", label: "Sleep Duration Calculator", desc: "just want the age-based number of hours you should be sleeping, without cycle math" },
              { href: "/pregnancy-sleep-calculator", label: "Pregnancy Sleep Calculator", desc: "pregnant and dealing with trimester-specific sleep disruption" },
              { href: "/baby-sleep-calculator", label: "Baby Sleep Calculator", desc: "scheduling naps and night sleep for an infant or toddler" },
            ].map(({ href, label, desc }) => (
              <li key={href} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <a href={href} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  {label}
                </a>
                <span className="text-slate-400"> — for when you&apos;re {desc}.</span>
              </li>
            ))}
          </ul>
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
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-3 text-center">Popular wake-up times</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">See bedtime recommendations for the most common morning alarm times.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {[
              { time: "5:00 AM",  slug: "5am-wakeup" },
              { time: "5:30 AM",  slug: "530am-wakeup" },
              { time: "6:00 AM",  slug: "6am-wakeup" },
              { time: "6:30 AM",  slug: "630am-wakeup" },
              { time: "7:00 AM",  slug: "7am-wakeup" },
              { time: "7:30 AM",  slug: "730am-wakeup" },
              { time: "8:00 AM",  slug: "8am-wakeup" },
              { time: "8:30 AM",  slug: "830am-wakeup" },
              { time: "9:00 AM",  slug: "9am-wakeup" },
              { time: "10:00 AM", slug: "10am-wakeup" },
            ].map(({ time, slug }) => (
              <a
                key={slug}
                href={`/sleep-calculator/${slug}`}
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-colors p-4 text-center text-sm font-medium text-slate-300 hover:text-white"
              >
                Wake at {time}
              </a>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Limitations</h2>
          <p className="text-slate-400 leading-relaxed">
            This calculator is a helpful estimate grounded in population averages, not a personalized sleep study. The 90-minute cycle length and 15-minute fall-asleep buffer are averages — actual cycle length varies roughly between 70 and 120 minutes from person to person, and even cycle to cycle within the same night, and not everyone takes exactly 15 minutes to fall asleep. Age, stress, caffeine, screen use, and sleep disorders can all shift these numbers. Treat the times this tool gives you as a strong starting point to experiment around, not a guarantee — and if you&apos;re waking up exhausted no matter when you set your alarm, that&apos;s worth mentioning to a doctor rather than solving with cycle math alone.
          </p>
        </section>
      </div>
    </>
  );
}
