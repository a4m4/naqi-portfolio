import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">{site.shortName}</p>
          <p className="mt-3 text-sm text-muted">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm md:gap-16">
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-muted transition-colors hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className="text-muted transition-colors hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
