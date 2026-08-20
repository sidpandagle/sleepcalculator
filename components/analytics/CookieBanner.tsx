"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!Cookies.get("cookie_consent")) setVisible(true);
  }, []);

  function accept() {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setVisible(false);
  }

  function decline() {
    Cookies.set("cookie_consent", "declined", { expires: 365 });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-dusk/95 backdrop-blur border-t border-moon/8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-mist">
          We use cookies to analyze traffic and improve your experience. See our{" "}
          <a href="/blog" className="text-ember hover:underline">
            privacy policy
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg bg-moon/10 hover:bg-moon/20 text-linen transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-ember hover:bg-ember-dark text-ink font-semibold transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
