import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { gsap } from "../lib/gsap";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = "https://formsubmit.co/ajax/admin@itproserve.com";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-panel", {
        y: 56,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-panel", start: "top 82%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: silently drop bot submissions
    if (data.get("_gotcha")) return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-fog/50 outline-none transition-colors focus:border-teal-brand/70 focus:bg-white/8";

  return (
    <section id="contact" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,50,100,0.35),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="contact-panel card-glow grid overflow-hidden rounded-3xl bg-card/70 lg:grid-cols-2">
          {/* Left: pitch */}
          <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
            <div>
              <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-teal-brand">
                Contact us
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Let's build something{" "}
                <span className="text-gradient">great together</span>
              </h2>
              <p className="mt-5 max-w-md text-fog">
                Tell us about your project — or just ask a question. We'll get
                back to you within one business day.
              </p>
            </div>

            <ul className="space-y-4 text-sm text-fog">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-brand/10 text-teal-brand">
                  <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 3.5a1.9 1.9 0 0 0-2.7-.2l-2.4 2.1a1.3 1.3 0 0 0-.2 1.7l1 1.6A13 13 0 0 1 9.3 8a12.8 12.8 0 0 1-3.7-.5l1.6-1a1.3 1.3 0 0 0 .6-1.6l-1-2.4a1.9 1.9 0 0 0-2.4-1L2 2.2a2 2 0 0 0-1.4 2.3A17.2 17.2 0 0 0 13 19.4a2 2 0 0 0 2.3-1.4l.5-1.4a1.9 1.9 0 0 0-.6-2Z" />
                  </svg>
                </span>
                <a href="tel:+19137558655" className="transition-colors hover:text-white">
                  (913) 755-8655
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-brand/10 text-teal-brand">
                  <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 18s6-5.1 6-9.5A6 6 0 0 0 4 8.5C4 12.9 10 18 10 18z" />
                    <circle cx="10" cy="8.5" r="2" />
                  </svg>
                </span>
                Kansas City, Missouri
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-brand/10 text-teal-brand">
                  <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
                    <path d="m3 5.5 7 5.5 7-5.5" />
                  </svg>
                </span>
                <a href="mailto:admin@itproserve.com" className="transition-colors hover:text-white">
                  admin@itproserve.com
                </a>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <div className="border-t border-white/8 bg-deep/50 p-8 sm:p-12 lg:border-l lg:border-t-0">
            {status === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-brand/15 text-teal-brand">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4.5 12.5 5 5 10-11" />
                  </svg>
                </span>
                <h3 className="font-display text-2xl font-semibold">Message sent!</h3>
                <p className="max-w-xs text-sm text-fog">
                  Thanks for reaching out. We'll get back to you within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm font-medium text-teal-brand hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value="New inquiry from itproserve.com" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-fog">
                      Name *
                    </label>
                    <input id="name" name="name" type="text" required placeholder="Jane Doe" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-fog">
                      Email *
                    </label>
                    <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-fog">
                    Company
                  </label>
                  <input id="company" name="company" type="text" placeholder="Your business name" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-fog">
                    How can we help? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals, or question..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="rounded-lg border border-amber-brand/30 bg-amber-brand/10 px-4 py-3 text-xs text-amber-brand">
                    Something went wrong sending your message. Please try again,
                    or email us directly at{" "}
                    <a href="mailto:admin@itproserve.com" className="font-semibold underline">
                      admin@itproserve.com
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-teal-brand px-7 py-4 font-display font-semibold text-ink transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
