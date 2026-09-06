"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { about, stats, site } from "@/data/site";
import { Reveal, SplitWords } from "@/components/ui/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[160px]" aria-hidden />

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Portrait */}
        <div ref={ref} className="lg:col-span-5">
          <motion.div
            style={{ rotate }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border-gradient lg:sticky lg:top-28"
          >
            {/* Replace with <Image src="/portrait.jpg" fill ... /> once a photo is available */}
            <motion.div
              style={{ y: yImg }}
              className="absolute -inset-y-[10%] inset-x-0 bg-[radial-gradient(90%_70%_at_30%_20%,#ff5e1a_0%,transparent_60%),radial-gradient(80%_70%_at_80%_90%,#7a1cff_0%,transparent_60%),#0b0912]"
            />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(0,0,0,.2)_3px_4px)] opacity-50" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-display text-3xl font-extrabold leading-none md:text-4xl">{site.shortName}</p>
              <p className="mt-2 text-sm text-white/70">{site.role}</p>
            </div>
            <div className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
              Portrait · {site.location}
            </div>
          </motion.div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 [&>span]:h-px [&>span]:w-8 [&>span]:bg-orange">
              <span /> About
            </p>
          </Reveal>
          <h2 className="display-lg">
            <SplitWords text={about.headline} />
          </h2>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-muted md:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 * i} as="p">
                {p}
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i} className="bg-bg p-6 md:p-7">
                <p className="display-md text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs text-muted md:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>

          {/* Awards */}
          <ul className="mt-14 divide-y divide-line border-t border-line">
            {about.awards.map((a, i) => (
              <Reveal key={a.title + a.year} delay={0.06 * i} as="li">
                <div className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-fg">
                  <span className="font-mono text-xs text-muted">{a.year}</span>
                  <span className="flex-1 basis-1/2 font-display text-lg font-bold transition-colors group-hover:text-gradient md:text-xl">
                    {a.title}
                  </span>
                  <span className="text-sm text-muted">{a.event}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
