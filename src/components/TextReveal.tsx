"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Reveals a line of text word by word, each word rising out of a clipped
 * box rather than just fading. Words stay whole so the line still wraps
 * and reads normally, and screen readers get the original string.
 */
export default function TextReveal({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** seconds before the first word moves */
  delay?: number;
  /** seconds between words */
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          // A hair of vertical padding so descenders are not clipped by the mask.
          className="inline-flex overflow-hidden py-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
