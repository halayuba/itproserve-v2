import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const STEPS = [
  {
    n: "1",
    title: "Discover",
    desc: "Comprehensive consulting and evaluation of your needs, goals, and operations — before a single pixel is drawn.",
  },
  {
    n: "2",
    title: "Design",
    desc: "Creative, professional design concepts that portray your business at its best and speak to your customers.",
  },
  {
    n: "3",
    title: "Build",
    desc: "Modern, performant development — done carefully, tested thoroughly, and delivered on time.",
  },
  {
    n: "4",
    title: "Launch & Grow",
    desc: "We launch, then stay — maintenance, support, and enhancements that maximize your productivity long-term.",
  },
];

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-head", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-head", start: "top 82%" },
      });
      // Progress line draws as you scroll through the steps
      gsap.fromTo(
        ".process-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );
      gsap.from(".process-step", {
        y: 48,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-steps", start: "top 78%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(51,204,153,0.07),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="process-head max-w-2xl">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-amber-brand">
            Our approach
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            From first call to <span className="text-gradient">liftoff</span>
          </h2>
          <p className="mt-5 text-fog">
            Every project starts with listening. We work carefully with your
            requirements to meet your goals and expectations — on time, every
            time.
          </p>
        </div>

        <div className="process-steps relative mt-16">
          {/* Track + animated fill (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block" />
          <div className="process-line-fill absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-teal-brand to-amber-brand lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="process-step relative">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-teal-brand/40 bg-ink font-display text-lg font-bold text-teal-brand">
                  {s.n}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
