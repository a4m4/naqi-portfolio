"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

/** Fade + rise into view when scrolled to. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "p" | "h2" | "h3" | "span" | "li";
}) {
  const M = motion[Tag];
  return (
    <M
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </M>
  );
}

/** Reveal a headline one word at a time, each word sliding up from a clip mask. */
export function SplitWords({
  text,
  className,
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  /** Applied to each word (use this for `text-gradient`, which must sit on the element that holds the text). */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${wordClassName}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
