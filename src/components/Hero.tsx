import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import HeroScene from "./HeroScene";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 24, autoAlpha: 0, duration: 0.7, delay: 0.15 })
        .from(
          ".reveal-line > span",
          { yPercent: 110, duration: 1, stagger: 0.12, ease: "power4.out" },
          "-=0.35"
        )
        .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, "-=0.45")
        .from(".hero-meta", { autoAlpha: 0, duration: 0.8 }, "-=0.3");

      gsap.to(".hero-scroll-dot", {
        y: 14,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "power1.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      <HeroScene />

      {/* Gradient washes */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,50,100,0.45),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(51,204,153,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
        <p className="hero-badge mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-fog sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-teal-brand" />
          Kansas City &middot; Web Design &amp; Development
        </p>

        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-tight">
          <span className="reveal-line">
            <span>Websites that</span>
          </span>
          <span className="reveal-line">
            <span className="text-gradient">launch businesses</span>
          </span>
          <span className="reveal-line">
            <span>forward.</span>
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
          ITproSERVE is a Kansas City web development and consulting firm. We
          turn your business goals into fast, beautiful, results-driven web
          experiences &mdash; from custom sites to eCommerce and digital
          marketing.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="hero-cta group inline-flex items-center gap-2 rounded-full bg-teal-brand px-7 py-3.5 font-display font-semibold text-ink transition-transform hover:scale-105"
          >
            Start a project
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </a>
          <a
            href="#services"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-display font-semibold text-white transition-colors hover:border-teal-brand/60 hover:text-teal-brand"
          >
            Explore services
          </a>
        </div>

        <div className="hero-meta mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-fog/80">
          <span>
            <strong className="font-display text-white">Local</strong> KC roots,
            global reach
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span>
            <strong className="font-display text-white">Full-stack</strong>{" "}
            design &rarr; launch &rarr; support
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span>
            <strong className="font-display text-white">Fair pricing</strong>,
            no surprises
          </span>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="hero-scroll-dot block h-2 w-2 rounded-full bg-teal-brand" />
        </span>
      </a>
    </section>
  );
}
