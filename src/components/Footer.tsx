const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#values", label: "Values" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep/40">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a href="#top" aria-label="Back to top">
            <img src="/logo.svg" alt="ITproSERVE" className="h-18 w-auto" />
          </a>
          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-fog transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-7 text-xs text-fog/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} ITproSERVE. All rights reserved.
          </p>
          <p>
            Designed &amp; built in Kansas City{" "}
            <span className="text-amber-brand">&#10022;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
