"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Play, X } from "lucide-react";
import { site } from "@/data/site";

export function Showreel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The frame widens and straightens as it enters the viewport
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [48, 24]);
  const rotate = useTransform(scrollYProgress, [0, 0.45], [4, 0]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="showreel" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <motion.div
          ref={ref}
          style={{ scale, borderRadius: radius, rotate }}
          className="group relative aspect-[16/10] w-full overflow-hidden border-gradient sm:aspect-video"
        >
          {/* Faux moving "footage" made of gradients */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#12071f,#2a0b3d_40%,#5a1030_70%,#ff5e1a)]" />
          <div className="animate-float absolute -left-1/4 top-0 h-full w-3/4 rounded-full bg-teal/30 blur-[100px]" />
          <div className="animate-float absolute right-0 top-1/3 h-2/3 w-1/2 rounded-full bg-magenta/40 blur-[110px] [animation-delay:-4s]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(0,0,0,.18)_3px_4px)] opacity-60" />

          {/* Corner meta */}
          <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 md:left-8 md:top-8">
            <span className="size-2 rounded-full bg-red-500 shadow-[0_0_12px_#f00]" /> Showreel {new Date().getFullYear()}
          </div>
          <div className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 md:right-8 md:top-8">
            {site.showreelDuration}
          </div>
          <div className="absolute bottom-5 left-5 max-w-xs text-sm text-white/80 md:bottom-8 md:left-8 md:text-base">
            A cut of films, commercials and music videos from the last few years.
          </div>

          {/* Play button */}
          <button
            onClick={() => setOpen(true)}
            data-cursor="Play"
            aria-label="Play showreel"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="relative grid size-20 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:scale-110 md:size-28">
              <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-fg/70" />
              <Play className="size-7 fill-current md:size-9" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal
            aria-label="Showreel video"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full border border-white/20 text-fg hover:bg-fg hover:text-bg"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-video w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={site.showreelEmbed}
                title="Showreel"
                className="size-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
