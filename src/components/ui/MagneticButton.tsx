"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
};

/** Button that gently follows the pointer while hovered. */
export function MagneticButton({ href, children, variant = "solid", className = "", external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-fg text-bg hover:bg-orange"
      : "border border-white/15 text-fg hover:border-white/40 backdrop-blur";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.2}
      />
    </motion.a>
  );
}
