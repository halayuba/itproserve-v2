import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#values", label: "Values" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll("a"),
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-white/5 py-3" : "py-5"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="ITproSERVE home">
            <img src="/logo.svg" alt="ITproSERVE" className="h-18 w-auto sm:h-20" />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-fog transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-teal-brand px-5 py-2.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              Start a project
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-white transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-full bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-full bg-white transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-xl md:hidden ${open ? "flex" : "hidden"
          }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="py-3 font-display text-3xl font-semibold text-white"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-6 rounded-full bg-teal-brand px-8 py-3.5 font-display text-lg font-semibold text-ink"
        >
          Start a project
        </a>
      </div>
    </>
  );
}
