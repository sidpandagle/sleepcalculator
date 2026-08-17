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

export default function AboutPage() {
  const personSchema = buildPersonSchema();
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <StructuredData data={personSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://sleepschedule.in" },
          { name: "About", url: "https://sleepschedule.in/about" },
        ]}
      />
      <h1 className="text-4xl font-extrabold text-white mb-4">About Sleep Schedule</h1>
      <p className="text-slate-400 mb-10 text-lg">
        A free, science-based sleep calculator built to help people wake up feeling refreshed.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Who built this</h2>
        <p className="text-slate-400 leading-relaxed mb-3">
          Sleep Schedule is built and maintained by{" "}
          <strong className="text-slate-200">Siddhant Pandagle</strong>, a software developer with a long-standing interest in sleep science — because most sleep tools out there are inaccurate, ad-heavy, or ignore the underlying biology of sleep cycles.
        </p>
        <p className="text-slate-400 leading-relaxed mb-3">
          I&apos;m not a doctor, and nothing on this site is medical advice — every duration, cycle, and trimester recommendation is sourced directly from the health authorities linked throughout this page, and each calculator links back to its sources so you can verify the numbers yourself.
        </p>
        <p className="text-slate-400 leading-relaxed">
          All calculators on this site are built on peer-reviewed sleep science and published health authority guidelines — not guesswork.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">The science behind it</h2>
        <p className="text-slate-400 leading-relaxed mb-3">
          Human sleep is organized into 90-minute cycles. Each cycle moves through three stages: light sleep (N1/N2), deep sleep (N3), and REM. Waking at the <em>end</em> of a cycle — rather than mid-cycle — dramatically reduces sleep inertia (grogginess).
        </p>
        <p className="text-slate-400 leading-relaxed mb-3">
          The bedtime and wake-up calculators on this site work backwards from your target time, subtracting complete 90-minute cycles and adding a 15-minute fall-asleep buffer (the average onset latency for adults).
        </p>
        <p className="text-slate-400 leading-relaxed">
          Sleep duration targets are based on{" "}
          <a
            href="https://www.cdc.gov/sleep/about/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            CDC sleep guidelines
          </a>
          {" "}by age group. REM estimates use polysomnography averages from peer-reviewed sleep research. Pregnancy recommendations follow{" "}
          <a
            href="https://www.acog.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            ACOG
          </a>
          {" "}and{" "}
          <a
            href="https://www.thensf.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            NSF
          </a>
          {" "}guidance. Baby sleep guidelines follow the{" "}
          <a
            href="https://healthychildren.org/English/healthy-living/sleep/Pages/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            American Academy of Pediatrics (AAP)
          </a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Medical disclaimer</h2>
        <p className="text-slate-400 leading-relaxed">
          Sleep Schedule provides general health information only and is not a substitute for professional medical advice. Always consult your doctor or a qualified healthcare provider if you have concerns about your sleep or health, especially during pregnancy or for infants.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">The calculators</h2>
        <ul className="space-y-2 text-slate-400">
          {[
            { href: "/", label: "Sleep Calculator", desc: "Find your ideal bedtime or wake-up time from 90-minute cycles" },
            { href: "/nap-calculator", label: "Nap Calculator", desc: "20-min power nap vs 90-min full cycle — avoid grogginess" },
            { href: "/rem-sleep-calculator", label: "REM Sleep Calculator", desc: "Estimate REM time from your total sleep hours" },
            { href: "/sleep-debt-calculator", label: "Sleep Debt Calculator", desc: "How far short are you of your CDC target?" },
            { href: "/sleep-duration-calculator", label: "Sleep Duration Calculator", desc: "Age-based sleep needs from CDC guidelines" },
            { href: "/pregnancy-sleep-calculator", label: "Pregnancy Sleep Calculator", desc: "Trimester-specific sleep guidance based on ACOG and NSF" },
            { href: "/baby-sleep-calculator", label: "Baby Sleep Calculator", desc: "Infant sleep schedules by age per AAP guidelines" },
          ].map(({ href, label, desc }) => (
            <li key={href}>
              <Link href={href} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                {label}
              </Link>
              <span className="text-slate-500"> — {desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
        <p className="text-slate-400">
          Questions or feedback:{" "}
          <Link
            href="/contact"
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            Contact form
          </Link>
        </p>
      </section>
    </div>
  );
}
