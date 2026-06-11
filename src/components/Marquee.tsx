const ITEMS = [
  "Web Design",
  "Web Development",
  "eCommerce",
  "Digital Marketing",
  "SEO & Web Promotion",
  "Content Management",
  "Business Consulting",
  "IT Infrastructure",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-white/5 bg-deep/60 py-5 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap motion-reduce:animate-none">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-sm font-medium uppercase tracking-[0.2em] text-fog/70"
          >
            {item}
            <span className="text-amber-brand">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
