"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: 0.2 + i * 0.12 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-36 md:pb-16"
    >
      {/* Ambient colour blobs */}
      <motion.div style={{ y: yBlob }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="animate-float absolute -left-[10%] top-[5%] size-[55vw] rounded-full bg-violet/40 blur-[120px]" />
        <div className="animate-float absolute right-[-15%] top-[20%] size-[50vw] rounded-full bg-orange/40 blur-[130px] [animation-delay:-3s]" />
        <div className="animate-float absolute bottom-[-20%] left-[30%] size-[45vw] rounded-full bg-magenta/30 blur-[140px] [animation-delay:-5s]" />
        <div className="absolute right-[10%] top-[55%] size-[25vw] rounded-full bg-teal/25 blur-[110px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />
      </motion.div>

      <motion.div style={{ y: yText, opacity }} className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="inline-block size-2 rounded-full bg-orange shadow-[0_0_20px_var(--orange)]" />
          {site.role} · {site.location}
        </motion.p>

        <h1 className="display-xl" aria-label={`${site.name} — ${site.tagline}`}>
          {["Naqi Shah", "Kazmi"].map((t, i) => (
            <span key={t} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <motion.span
                variants={line}
                custom={i}
                initial="hidden"
                animate="show"
                className={`block ${i === 1 ? "text-gradient" : ""}`}
              >
                {t}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="text-lg leading-relaxed text-muted md:col-span-5 md:text-xl"
          >
            {site.tagline} Cinematographer and director shaping films, commercials and music videos
            with light that lingers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="flex flex-wrap items-center gap-4 md:col-span-7 md:justify-end"
          >
            <MagneticButton href="#work">Selected work</MagneticButton>
            <a
              href="#showreel"
              data-cursor="Play"
              className="group inline-flex items-center gap-4 rounded-full border border-white/15 py-2 pl-2 pr-6 text-sm font-semibold backdrop-blur transition-colors hover:border-white/40"
            >
              <span className="relative grid size-11 place-items-center rounded-full bg-fg text-bg">
                <span className="animate-pulse-ring absolute inset-0 rounded-full border border-fg" />
                <Play className="size-4 fill-current" />
              </span>
              Watch showreel <span className="text-muted">{site.showreelDuration}</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="container-x mt-12 flex items-center justify-between text-xs text-muted"
      >
        <span className="flex items-center gap-2">
          <ArrowDown className="size-3.5 animate-bounce" /> Scroll
        </span>
        <span className="hidden sm:block">Available for projects worldwide</span>
      </motion.div>
    </section>
  );
}
