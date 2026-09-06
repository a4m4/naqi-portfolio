"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 40)), [scrollY]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-xl bg-bg/60 border-b border-line" : "py-6"
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <a href="#top" className="font-display text-xl font-extrabold tracking-tight" aria-label="Home">
            {site.shortName}
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-sm font-medium text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-fg hover:text-bg"
          >
            Let&apos;s talk
          </a>

          <button
            className="md:hidden inline-flex size-11 items-center justify-center rounded-full border border-white/15"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-bg md:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-x flex items-center justify-between py-6">
              <span className="font-display text-xl font-extrabold">{site.shortName}</span>
              <button
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/15"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="container-x mt-8 flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display-lg block py-2 hover:text-gradient"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x mt-auto pb-10 flex flex-col gap-4 text-sm text-muted">
              <a href={`mailto:${site.email}`} className="text-fg">
                {site.email}
              </a>
              <div className="flex gap-5">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
