import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const SERVICES = [
  {
    title: "Custom Web Design & Development",
    desc: "Quality, attractive web designs and dynamic solutions engineered around your business requirements — not templates.",
    icon: (
      <path d="M4 6h24v18H4zM4 11h24M9 21l3-3-3-3M14 21h6" />
    ),
  },
  {
    title: "eCommerce Solutions",
    desc: "Online stores built to sell — product catalogs, secure checkout, and the integrations your operations depend on.",
    icon: (
      <path d="M5 7h3l3 14h12l3-10H10M13 25.5a1.5 1.5 0 1 0 0 .01M23 25.5a1.5 1.5 0 1 0 0 .01" />
    ),
  },
  {
    title: "Digital Marketing & SEO",
    desc: "Internet marketing, advertisement, and web promotion that put your company in front of the customers searching for you.",
    icon: (
      <path d="M4 26 14 16l5 5L28 11M28 11h-7M28 11v7" />
    ),
  },
  {
    title: "Content Management Systems",
    desc: "Powerful, easy-to-use CMS builds so your team can publish, edit, and grow your site without calling a developer.",
    icon: (
      <path d="M6 5h20v22H6zM10 11h12M10 16h12M10 21h8" />
    ),
  },
  {
    title: "IT & Business Consulting",
    desc: "Business process modeling, IT infrastructure consulting, and quality improvement from analysts who speak business.",
    icon: (
      <path d="M16 4v6M16 22v6M4 16h6M22 16h6M16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    ),
  },
  {
    title: "Care & Maintenance",
    desc: "Ongoing support, security updates, and enhancements that keep your most valuable digital asset performing at its peak.",
    icon: (
      <path d="M25 11a7 7 0 0 1-9.6 6.5L9 24a2.5 2.5 0 0 1-3.5-3.5l6.5-6.4A7 7 0 0 1 21 5l-4 4 2 2 4-4a7 7 0 0 1 2 4z" />
    ),
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-head", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-head", start: "top 82%" },
      });
      gsap.from(".service-card", {
        y: 56,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="services-head max-w-2xl">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-teal-brand">
            What we do
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Integrated services,{" "}
            <span className="text-gradient">one dedicated team</span>
          </h2>
          <p className="mt-5 text-fog">
            A complete set of web design and development services — practical
            yet creative — built to present your company to the global market.
          </p>
        </div>

        <div className="services-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="service-card card-glow group rounded-2xl bg-card/70 p-7 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-xl bg-teal-brand/10 text-teal-brand transition-colors group-hover:bg-teal-brand group-hover:text-ink">
                <svg
                  viewBox="0 0 32 32"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
