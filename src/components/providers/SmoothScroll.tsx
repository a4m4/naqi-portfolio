"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling (desktop only — native scroll is kept on touch
 * devices where it already feels right and is more accessible).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
