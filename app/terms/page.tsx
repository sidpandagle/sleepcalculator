import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Sleep Schedule",
  description: "Terms of Service for Sleep Schedule (sleepschedule.in). Free sleep calculators for informational use only.",
  alternates: { canonical: "https://sleepschedule.in/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-16">
      <h1 className="font-serif font-normal text-5xl text-linen mb-3">Terms of Service</h1>
      <p className="text-mist/70 text-sm mb-10">Last updated: June 27, 2026</p>

      <div className="space-y-10 text-mist leading-relaxed">
        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">1. Acceptance of terms</h2>
          <p>By accessing or using sleepschedule.in (&quot;the Site&quot;), you agree to these Terms of Service. If you do not agree, do not use the Site.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">2. Description of service</h2>
          <p>Sleep Schedule provides free, web-based sleep calculators including bedtime calculators, nap calculators, REM sleep estimators, sleep debt trackers, and related tools. The service is provided free of charge and without registration.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">3. Not medical advice</h2>
          <p className="mb-3">All content and tools on this Site are provided for <strong className="text-linen">general informational purposes only</strong>. Nothing on this Site constitutes medical advice, diagnosis, or treatment. The calculators use population-level averages from published health authority guidelines (CDC, AAP, AASM, ACOG, NSF).</p>
          <p>Always consult a qualified healthcare provider before making changes to your sleep routine, especially if you are pregnant, have a medical condition, or are experiencing significant sleep disturbances. Do not disregard professional medical advice or delay seeking it because of something you read on this Site.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">4. Accuracy of information</h2>
          <p>We make reasonable efforts to keep the information current and accurate. However, sleep science research evolves, and guidelines may be updated. We do not warrant that any information on the Site is complete, accurate, or up to date. The Site may contain errors — if you find one, please use the <a href="/contact" className="text-ember hover:text-ember-light transition-colors">contact form</a>.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">5. Limitation of liability</h2>
          <p>To the fullest extent permitted by applicable law, Sleep Schedule and its operator shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of the Site or reliance on its content. Your use of the Site is entirely at your own risk.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">6. Intellectual property</h2>
          <p>All content on this Site, including text, code, and design, is owned by the Site operator unless otherwise noted. You may not reproduce, redistribute, or repurpose Site content without explicit written permission.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">7. Privacy</h2>
          <p>Use of the Site is governed by our <a href="/privacy" className="text-ember hover:text-ember-light transition-colors">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">8. Changes to these terms</h2>
          <p>We may update these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms. The &quot;Last updated&quot; date at the top of this page reflects when the Terms were last revised.</p>
        </section>

        <section>
          <h2 className="font-serif font-normal text-2xl text-linen mb-3">9. Contact</h2>
          <p>For questions about these Terms, use the <a href="/contact" className="text-ember hover:text-ember-light transition-colors">contact form</a>.</p>
        </section>
      </div>
    </div>
  );
}
