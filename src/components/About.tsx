import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const STATEMENT =
  "We don't just build websites. We study your business, your customers, and your goals — then craft digital experiences that turn visitors into revenue.";

const DOMAINS = [
  "Commercial Trading",
  "Property Management",
  "Social Networking",
  "Content Management",
  "Small Business",
  "Enterprise",
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word brightness scrub as the statement scrolls through view
      gsap.to(".about-word", {
        color: "#ffffff",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-statement",
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });

      gsap.from(".about-col", {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-cols", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,50,100,0.3),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-amber-brand">
          Who we are
        </p>

        <p className="about-statement max-w-5xl font-display text-[clamp(1.6rem,4.2vw,3rem)] font-semibold leading-snug tracking-tight">
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} className="about-word text-white/25">
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="about-cols mt-20 grid gap-10 lg:grid-cols-3">
          <div className="about-col">
            <h3 className="font-display text-lg font-semibold text-teal-brand">
              A cross-section of expertise
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              Our team blends web design &amp; development, project management,
              business process modeling, IT infrastructure consulting, and
              eCommerce optimization — so every project gets perspective from
              every angle.
            </p>
          </div>
          <div className="about-col">
            <h3 className="font-display text-lg font-semibold text-teal-brand">
              Strategic alliances
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              Alliances with established IT firms give us on-demand access to
              specialists — consultants, architects, creative directors, and QA
              testers — letting us deliver effective products in the shortest
              time, at the best rate.
            </p>
          </div>
          <div className="about-col">
            <h3 className="font-display text-lg font-semibold text-teal-brand">
              Proudly Kansas City
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              We're local. We answer the phone, meet face-to-face, and treat
              your business like a neighbor's — because it is. Local roots,
              global standards.
            </p>
          </div>
        </div>

        <div className="about-col mt-14 flex flex-wrap gap-3">
          {DOMAINS.map((d) => (
            <span
              key={d}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-fog"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
