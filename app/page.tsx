import type { Metadata } from "next";
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
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-10">
        {/* Hero */}
        <div className="grid lg:grid-cols-[1fr_1.04fr] gap-12 lg:gap-24 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#9FB2FF]/28 bg-[#9FB2FF]/8 text-[12.5px] tracking-wide uppercase text-[#B6C3FF]">
              90-minute cycle model
            </div>
            <h1 className="font-serif font-normal text-5xl sm:text-6xl lg:text-[72px] leading-[1.02] tracking-tight mt-7 text-linen">
              Sleep <span className="italic text-[#AFBEFF]">Calculator</span>
            </h1>
            <p className="text-lg leading-relaxed text-mist max-w-[42ch] mt-6">
              Set the time you need to be awake. We work backwards through full sleep cycles so your alarm lands between them — not in the middle of deep sleep.
            </p>
            <div className="flex gap-7 mt-10 pt-7 border-t border-moon/7">
              <div>
                <div className="font-serif text-3xl text-linen">90 min</div>
                <div className="text-[13px] text-mist/80 mt-0.5">one full cycle</div>
              </div>
              <div className="w-px bg-moon/8" />
              <div>
                <div className="font-serif text-3xl text-linen">15 min</div>
                <div className="text-[13px] text-mist/80 mt-0.5">to fall asleep</div>
              </div>
              <div className="w-px bg-moon/8" />
              <div>
                <div className="font-serif text-3xl text-linen">5–6×</div>
                <div className="text-[13px] text-mist/80 mt-0.5">cycles per night</div>
              </div>
            </div>
            <p className="text-[13px] text-mist/70 mt-8">
              Written by{" "}
              <a href="/about" className="text-[#9FB2FF] hover:text-[#C6D2FF] transition-colors">
                Siddhant Pandagle
              </a>
              {" "}&middot; <time dateTime="2026-08-17">Last reviewed August 2026</time>
            </p>
          </div>

          {/* Calculator */}
          <SleepCalculator />
        </div>

        {/* How the timing works */}
        <section className="mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-6">
            <h2 className="font-serif font-normal text-3xl sm:text-4xl tracking-tight text-linen">How the timing works</h2>
            <p className="text-sm text-mist/80 max-w-[38ch] sm:text-right">
              Three inputs, one output: an alarm that lands on a cycle boundary.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                title: "Cycle length",
                body: "Light sleep, deep sleep and REM repeat roughly every 90 minutes. Waking at the end of a cycle means far less grogginess.",
              },
              {
                n: "02",
                title: "Fall-asleep buffer",
                body: "The average person needs about 15 minutes to drop off. Every time on this page already accounts for it.",
              },
              {
                n: "03",
                title: "Age-based target",
                body: "CDC duration guidelines set how many cycles you should be aiming for — 5 to 6 for most adults.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
                <div className="text-[12.5px] tracking-widest uppercase text-[#8B96FF]">{n}</div>
                <h3 className="text-[19px] font-semibold mt-3 text-linen">{title}</h3>
                <p className="text-[14.5px] leading-relaxed text-mist mt-2">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sleep-stage chart */}
        <section
          className="mt-20 rounded-[26px] border border-moon/9 p-6 sm:p-[34px]"
          style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))" }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-5">
            <h2 className="font-serif font-normal text-[28px] sm:text-[34px] text-linen">One night, four to six cycles</h2>
            <p className="text-[13.5px] text-mist/80">Deep sleep front-loads the night; REM grows toward morning.</p>
          </div>
          <div className="flex gap-1.5 mt-6 h-[132px] items-end">
            {[
              { deep: 58, light: 30, rem: 12 },
              { deep: 44, light: 34, rem: 22 },
              { deep: 28, light: 40, rem: 32 },
              { deep: 16, light: 42, rem: 42 },
              { deep: 10, light: 40, rem: 50 },
              { deep: 8, light: 38, rem: 54 },
            ].map((c, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1 justify-end">
                <div className="rounded" style={{ height: c.rem, background: "#E8B98A" }} />
                <div className="rounded" style={{ height: c.light, background: "#8E9BE8" }} />
                <div className="rounded" style={{ height: c.deep, background: "#5C6CD8" }} />
                <div className="text-xs text-mist/70 text-center mt-2">Cycle {i + 1}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 mt-5">
            <div className="flex items-center gap-2 text-[13px] text-mist">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: "#5C6CD8" }} />Deep (N3)
            </div>
            <div className="flex items-center gap-2 text-[13px] text-mist">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: "#8E9BE8" }} />Light (N1–N2)
            </div>
            <div className="flex items-center gap-2 text-[13px] text-mist">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: "#E8B98A" }} />REM
            </div>
          </div>
        </section>

        {/* Why 90-minute cycles */}
        <section className="mt-20">
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-linen mb-6 text-center">Why 90-minute cycles?</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-mist leading-relaxed">
              Sleep isn&apos;t one long uniform state — it runs on an ultradian rhythm, a biological cycle shorter than 24 hours that repeats throughout the night. For most healthy adults, one full cycle takes about 90 minutes, and a typical night includes four to six of them back to back. This calculator works in 90-minute increments so your alarm lands at the boundary between cycles rather than in the middle of one, which is the real difference between waking up alert and waking up groggy.
            </p>
            <p className="text-mist leading-relaxed">
              Each cycle moves through distinct stages. It starts with N1, a light, transitional doze that&apos;s easy to interrupt. From there you drop into N2, still light sleep but where heart rate and body temperature begin to fall — this stage makes up the largest share of a night&apos;s sleep. Next comes N3, deep or slow-wave sleep, the stage most linked to physical recovery and the hardest one to wake from without feeling disoriented. The cycle closes with REM (rapid eye movement) sleep, when the brain becomes highly active, most dreaming happens, and memory and learning get consolidated.
            </p>
            <p className="text-mist leading-relaxed">
              The mix of stages isn&apos;t constant across the night. Early cycles lean heavily toward deep, slow-wave sleep — the body prioritizes physical restoration first. As the night goes on, each successive cycle carries less N3 and more REM: the first REM period of the night might last only about 10 minutes, while REM periods late in the night can stretch to 45–50 minutes. That&apos;s why cutting a night short by skipping the last cycle or two costs you disproportionately more REM sleep than deep sleep, and why six hours split across an earlier bedtime can feel noticeably different from the same six hours ending at 6 AM after a midnight bedtime.
            </p>
            <p className="text-mist leading-relaxed">
              This is also the biology behind sleep inertia — that heavy, disoriented feeling when an alarm cuts into slow-wave sleep instead of a lighter stage at a cycle boundary. Timing your bedtime or wake-up to complete full cycles won&apos;t change how much total sleep you get, but it changes when in the cycle you wake up, which is what your grogginess actually tracks. How many total cycles you should be aiming for each night still comes down to age-based sleep duration guidance from the{" "}
              <a
                href="https://www.cdc.gov/sleep/about/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember hover:text-ember-light underline transition-colors"
              >
                CDC
              </a>.
            </p>
          </div>
        </section>

        {/* Pick the right calculator */}
        <section className="mt-20">
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-linen mb-2">Pick the right calculator</h2>
          <p className="text-[15.5px] text-mist mb-6">This page handles bedtime and wake-up timing. Six other tools cover the more specific questions.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {[
              { href: "/nap-calculator", label: "Nap calculator", desc: "Power naps and full-cycle naps, timed from now." },
              { href: "/rem-sleep-calculator", label: "REM sleep", desc: "How much REM a given number of hours buys you." },
              { href: "/sleep-debt-calculator", label: "Sleep debt", desc: "How far below your CDC target the last week has run." },
              { href: "/sleep-duration-calculator", label: "Duration", desc: "The age-based number of hours, without cycle math." },
              { href: "/pregnancy-sleep-calculator", label: "Pregnancy sleep", desc: "Trimester-specific needs and disruption." },
              { href: "/baby-sleep-calculator", label: "Baby sleep", desc: "Nap and night schedules by infant age." },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="group rounded-[18px] border border-moon/9 bg-moon/3 hover:border-[#9FB2FF]/42 hover:bg-[#9FB2FF]/7 transition-colors p-[22px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[17px] font-semibold text-linen">{label}</span>
                  <span className="text-[#8B96FF] text-base">→</span>
                </div>
                <p className="text-sm text-mist mt-2 leading-snug">{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 grid md:grid-cols-[340px_1fr] gap-10 md:gap-14 items-start">
          <div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-linen">Questions</h2>
            <p className="text-[15px] leading-relaxed text-mist mt-3">The four things people ask most about cycle-based alarms.</p>
          </div>
          <div className="flex flex-col">
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
              <details key={q} className="group border-t border-moon/9 py-5 cursor-pointer">
                <summary className="text-lg font-medium text-linen list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="w-7 h-7 shrink-0 rounded-full border border-moon/16 flex items-center justify-center text-base text-[#9FB2FF] group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-base leading-relaxed text-mist mt-3 max-w-[66ch]">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-linen mb-3 text-center">Popular wake-up times</h2>
          <p className="text-mist text-center mb-8 text-sm">See bedtime recommendations for the most common morning alarm times.</p>
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
                className="rounded-xl border border-moon/9 bg-moon/3 hover:bg-moon/6 hover:border-[#9FB2FF]/40 transition-colors p-4 text-center text-sm font-medium text-mist hover:text-linen"
              >
                Wake at {time}
              </a>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-linen mb-4 text-center">Limitations</h2>
          <p className="text-mist leading-relaxed">
            This calculator is a helpful estimate grounded in population averages, not a personalized sleep study. The 90-minute cycle length and 15-minute fall-asleep buffer are averages — actual cycle length varies roughly between 70 and 120 minutes from person to person, and even cycle to cycle within the same night, and not everyone takes exactly 15 minutes to fall asleep. Age, stress, caffeine, screen use, and sleep disorders can all shift these numbers. Treat the times this tool gives you as a strong starting point to experiment around, not a guarantee — and if you&apos;re waking up exhausted no matter when you set your alarm, that&apos;s worth mentioning to a doctor rather than solving with cycle math alone.
          </p>
        </section>
      </div>
    </>
  );
}
