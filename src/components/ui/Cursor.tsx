"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom blend-mode cursor. Only rendered on devices with a fine pointer
 * (mouse / trackpad). Grows when hovering interactive elements and shows
 * a label when the target has `data-cursor="View"` etc.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const move = (e: PointerEvent) => {
      // Enable lazily on the first real mouse movement (keeps SSR/first paint clean)
      if (e.pointerType === "mouse") {
        setEnabled(true);
        document.documentElement.classList.add("has-cursor");
      }
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 56 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-fg text-bg font-sans text-[11px] font-semibold uppercase tracking-widest mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {label}
    </motion.div>
  );
}
