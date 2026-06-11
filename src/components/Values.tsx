import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const VALUES = [
  {
    n: "01",
    title: "Honesty & Integrity",
    desc: "We work with our customers in the most transparent and professional manner. No jargon walls, no hidden costs, no surprises.",
    accent: "text-teal-brand",
  },
  {
    n: "02",
    title: "Advanced Quality",
    desc: "Quality is an absolute necessity — it's how we differentiate ourselves and how we earn the highest customer satisfaction.",
    accent: "text-amber-brand",
  },
  {
    n: "03",
    title: "Attractive Prices",
    desc: "Unmatched service at fair prices. Satisfied customers come back — and that's the true measure of our success.",
    accent: "text-teal-brand",
  },
];

export default function Values() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".value-card", {
        y: 60,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="values" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-teal-brand">
              Core values
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              The principles we <span className="text-gradient">build on</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-fog">
            Three commitments, kept on every project, for every client — big or
            small.
          </p>
        </div>

        <div className="values-grid grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <article
              key={v.n}
              className="value-card group relative overflow-hidden rounded-2xl border border-white/8 bg-deep/80 p-8"
            >
              <span
                className={`font-display text-6xl font-bold opacity-15 transition-opacity group-hover:opacity-40 ${v.accent}`}
              >
                {v.n}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{v.desc}</p>
              <span
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-20 ${
                  v.accent === "text-amber-brand" ? "bg-amber-brand" : "bg-teal-brand"
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
