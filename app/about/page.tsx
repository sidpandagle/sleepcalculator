import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPersonSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "About Sleep Schedule — Science-Based Sleep Calculators",
  description:
    "Sleep Schedule is a free sleep calculator built by Siddhant Pandagle on peer-reviewed sleep cycle research and CDC sleep duration guidelines.",
  alternates: { canonical: "https://sleepschedule.in/about" },
  openGraph: {
    title: "About Sleep Schedule",
    description: "Who built Sleep Schedule and the science behind it.",
    url: "https://sleepschedule.in/about",
  },
};

const CALC_COUNT = 7;

export default function AboutPage() {
  const personSchema = buildPersonSchema();
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-16 pb-20">
      <StructuredData data={personSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://sleepschedule.in" },
          { name: "About", url: "https://sleepschedule.in/about" },
        ]}
      />

      <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
        <div>
          <h1 className="font-serif font-normal text-5xl sm:text-[64px] leading-[1.02] text-linen">
            About <span className="italic text-[#AFBEFF]">Sleep Schedule</span>
          </h1>
          <p className="text-[19.5px] leading-relaxed text-mist mt-5 max-w-[52ch]">
            A free, science-based sleep calculator built to help people wake up feeling refreshed — no accuracy shortcuts, no filler.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-11">
            <div className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
              <h3 className="text-[17px] font-semibold text-linen">Who built this</h3>
              <p className="text-[14.5px] leading-relaxed text-mist mt-2">
                Sleep Schedule is built and maintained by <strong className="text-linen">Siddhant Pandagle</strong>, a software developer with a long-standing interest in sleep science — because most sleep tools out there are inaccurate, ad-heavy, or ignore the underlying biology of sleep cycles.
              </p>
            </div>
            <div className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
              <h3 className="text-[17px] font-semibold text-linen">The science behind it</h3>
              <p className="text-[14.5px] leading-relaxed text-mist mt-2">
                Sleep runs in 90-minute cycles through light, deep, and REM stages. Duration targets follow{" "}
                <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline">CDC</a>
                {" "}guidance by age; pregnancy follows{" "}
                <a href="https://www.acog.org" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline">ACOG</a>
                {" "}and{" "}
                <a href="https://www.thensf.org" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline">NSF</a>
                ; baby sleep follows the{" "}
                <a href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="text-ember hover:text-ember-light underline">AAP</a>.
              </p>
            </div>
            <div className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
              <h3 className="text-[17px] font-semibold text-linen">Medical disclaimer</h3>
              <p className="text-[14.5px] leading-relaxed text-mist mt-2">
                General health information only, not a substitute for professional medical advice. Always consult a doctor about concerns regarding your sleep or health, especially during pregnancy or for infants.
              </p>
            </div>
            <div className="rounded-[20px] border border-moon/9 bg-moon/3 p-6">
              <h3 className="text-[17px] font-semibold text-linen">Feedback &amp; corrections</h3>
              <p className="text-[14.5px] leading-relaxed text-mist mt-2">
                Found an error, or something that doesn&apos;t match the source guidance? Send it over via the{" "}
                <Link href="/contact" className="text-ember hover:text-ember-light underline">contact form</Link> — every report gets read.
              </p>
            </div>
          </div>

          <p className="text-[13.5px] leading-relaxed text-mist/70 mt-9 max-w-[60ch]">
            I&apos;m not a doctor, and nothing on this site is medical advice — every duration, cycle, and trimester recommendation is sourced directly from the health authorities linked above, and each calculator links back to its sources so you can verify the numbers yourself.
          </p>
        </div>

        <div
          className="rounded-[26px] border border-moon/10 p-7"
          style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))" }}
        >
          <div
            className="w-16 h-16 rounded-full"
            style={{ background: "linear-gradient(150deg,#9FB2FF,#5C6CD8)" }}
          />
          <div className="text-[22px] font-semibold text-linen mt-[18px]">Siddhant Pandagle</div>
          <div className="text-sm text-mist/80 mt-1">Author and maintainer</div>
          <p className="text-[15px] leading-relaxed text-mist mt-[18px]">
            I build small, single-purpose tools and write the explanation that should have come with them. Sleep Schedule is the one I use most.
          </p>
          <div className="h-px bg-moon/9 my-[22px]" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-mist/80">Tools</span>
              <span className="text-linen">{CALC_COUNT} calculators</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-mist/80">Last review</span>
              <span className="text-linen">August 2026</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-mist/80">Contact</span>
              <Link href="/contact" className="text-ember hover:text-ember-light">Contact form</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif font-normal text-3xl sm:text-4xl text-linen mb-6">The calculators</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {[
            { href: "/", label: "Sleep Calculator", desc: "Find your ideal bedtime or wake-up time from 90-minute cycles" },
            { href: "/nap-calculator", label: "Nap Calculator", desc: "20-min power nap vs 90-min full cycle — avoid grogginess" },
            { href: "/rem-sleep-calculator", label: "REM Sleep Calculator", desc: "Estimate REM time from your total sleep hours" },
            { href: "/sleep-debt-calculator", label: "Sleep Debt Calculator", desc: "How far short are you of your CDC target?" },
            { href: "/sleep-duration-calculator", label: "Sleep Duration Calculator", desc: "Age-based sleep needs from CDC guidelines" },
            { href: "/pregnancy-sleep-calculator", label: "Pregnancy Sleep Calculator", desc: "Trimester-specific sleep guidance based on ACOG and NSF" },
            { href: "/baby-sleep-calculator", label: "Baby Sleep Calculator", desc: "Infant sleep schedules by age per AAP guidelines" },
          ].map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-[18px] border border-moon/9 bg-moon/3 hover:border-[#9FB2FF]/42 hover:bg-[#9FB2FF]/7 transition-colors p-[22px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-semibold text-linen">{label}</span>
                <span className="text-[#8B96FF] text-base">→</span>
              </div>
              <p className="text-sm text-mist mt-2 leading-snug">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
