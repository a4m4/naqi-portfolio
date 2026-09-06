"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Aperture, Clapperboard, Film, Palette } from "lucide-react";
import { process, services } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = { clapperboard: Clapperboard, aperture: Aperture, palette: Palette, film: Film } as const;

/** Card with a spotlight that follows the pointer. */
function ServiceCard({ title, description, icon, index }: (typeof services)[number] & { index: number }) {
  const Icon = icons[icon as keyof typeof icons] ?? Film;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(255,94,26,.18), transparent 70%)`;

  return (
    <Reveal delay={index * 0.08}>
      <div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        className="group relative h-full overflow-hidden rounded-3xl border border-line bg-bg-2/60 p-7 transition-colors duration-500 hover:border-white/20 md:p-9"
      >
        <motion.div
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative">
          <div className="mb-8 flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-fg/5 text-fg ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-orange group-hover:text-bg">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <span className="font-mono text-xs text-muted">0{index + 1}</span>
          </div>
          <h3 className="display-md text-[clamp(1.4rem,2vw,1.9rem)]">{title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{description}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="What I do"
          title="From first idea to final frame."
          description="Direction and cinematography for brands, artists and storytellers who want images with intent."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>

        {/* Process */}
        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">Process</p>
            <h3 className="display-md">Calm, prepared, and open to surprise.</h3>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} as="li" className="relative bg-bg p-7">
                <span className="text-gradient font-display text-4xl font-extrabold">{p.step}</span>
                <h4 className="mt-4 font-display text-xl font-bold">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
