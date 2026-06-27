import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Contact — Sleep Schedule",
  description: "Get in touch with Sleep Schedule. Send a question, report an issue, or share feedback.",
  alternates: { canonical: "https://sleepschedule.in/contact" },
  robots: { index: true },
};

async function submitContact(formData: FormData) {
  "use server";
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  if (!name || !email || !message) redirect("/contact?error=1");
  const supabase = createServerClient();
  await supabase.from("contact_submissions").insert({ name, email, message });
  redirect("/contact?sent=1");
}

interface Props {
  searchParams: { sent?: string; error?: string };
}

export default function ContactPage({ searchParams }: Props) {
  const sent = searchParams.sent === "1";
  const error = searchParams.error === "1";

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-3">Contact</h1>
      <p className="text-slate-400 mb-10">Questions, feedback, or issues with a calculator — send a message and I&apos;ll get back to you.</p>

      {sent ? (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
          <p className="text-green-400 font-semibold mb-1">Message sent</p>
          <p className="text-slate-400 text-sm">Thanks for reaching out. I&apos;ll reply within a few days.</p>
        </div>
      ) : (
        <form action={submitContact} className="space-y-5">
          {error && (
            <p className="text-red-400 text-sm">All fields are required. Please try again.</p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 text-sm transition-colors"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
