import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Sleep Schedule — how we collect and use data.",
  alternates: { canonical: "https://sleepschedule.in/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
      <p className="text-slate-400 text-sm mb-10">Last updated: June 24, 2026</p>

      <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
          <p>
            Sleep Schedule (<strong>sleepschedule.in</strong>) is a free sleep cycle tool. You can reach us at{" "}
            <a href="mailto:siddhant.pandagle1998@gmail.com" className="text-blue-400 hover:text-blue-300">
              siddhant.pandagle1998@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. What Data We Collect</h2>
          <p>We do not collect any personally identifiable information directly. However, we use third-party services that may collect data:</p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-slate-400">
            <li>
              <strong className="text-slate-300">Google Analytics 4 (GA4)</strong> — collects anonymised usage data (pages visited, session duration, device type, approximate location). This is only activated after you accept cookies.
            </li>
            <li>
              <strong className="text-slate-300">Vercel Analytics</strong> — privacy-friendly, aggregated traffic metrics with no cookies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Cookies</h2>
          <p>
            We use a cookie banner to obtain your consent before enabling GA4. If you decline, no analytics cookies are set. You can change your preference at any time by clearing your browser cookies and revisiting the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. How We Use Data</h2>
          <p>Aggregated analytics data is used solely to understand how visitors use the site and to improve the calculator. We do not sell data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
          <p>GA4 retains event data for 14 months by default. Vercel Analytics data is aggregated and not tied to individuals.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
          <p>
            Under GDPR and similar laws you have the right to access, correct, or delete data held about you. Since we do not store personal data directly, most requests should be directed to Google Analytics. To opt out of GA4 tracking, install the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Third-Party Links</h2>
          <p>The blog may link to external websites. We are not responsible for their privacy practices.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
          <p>We may update this policy occasionally. The &ldquo;last updated&rdquo; date at the top will reflect any changes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:siddhant.pandagle1998@gmail.com" className="text-blue-400 hover:text-blue-300">
              siddhant.pandagle1998@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
