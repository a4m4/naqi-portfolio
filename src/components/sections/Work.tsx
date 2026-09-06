"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Category } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Poster } from "@/components/ui/Poster";
import { Reveal } from "@/components/ui/Reveal";

const filters: ("All" | Category)[] = ["All", "Film", "Commercial", "Music Video", "Documentary"];

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="section-pad relative">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Frames that stayed with me."
            description="A selection of films, commercials and music videos. Every project starts with a question: what should this feel like?"
          />
          <Reveal className="mb-14 shrink-0 md:mb-20 md:max-w-lg md:text-right">
            <div className="flex flex-wrap gap-2 md:justify-end" role="tablist" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active === f}
                  onClick={() => setActive(f)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === f ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === f && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              // Editorial rhythm: wide + narrow, then narrow + wide, repeating
              const wide = i % 4 === 0 || i % 4 === 3;
              return (
                <motion.li
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.05 }}
                  className={wide ? "lg:col-span-7" : "lg:col-span-5"}
                >
                  <a
                    href={p.video ?? `#${p.slug}`}
                    data-cursor="View"
                    className="group block"
                    aria-label={`${p.title} — ${p.client}`}
                  >
                    <Poster
                      project={p}
                      className={`rounded-2xl md:rounded-3xl ${wide ? "aspect-[16/10]" : "aspect-[4/3] lg:aspect-[16/11]"}`}
                      sizes={wide ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
                    />
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="display-md text-[clamp(1.35rem,2.2vw,2rem)] transition-colors group-hover:text-gradient">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {p.client} · {p.role}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 pt-1 text-xs text-muted">
                        <span className="rounded-full border border-white/10 px-2.5 py-1">{p.category}</span>
                        <span>{p.year}</span>
                        <ArrowUpRight className="size-4 text-fg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </a>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
