"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Text set around a circle, turning slowly, with a mark in the middle.
 * The string is repeated so it reads continuously all the way round
 * rather than running out and leaving a gap.
 */
export default function CircularBadge({
  text,
  className = "",
  duration = 22,
}: {
  text: string;
  className?: string;
  /** seconds for one full turn */
  duration?: number;
}) {
  const id = useId().replace(/:/g, "");
  const reduced = useReducedMotion();
  const ring = `${text} · ${text} · `;

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id={`circle-${id}`}
            d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="8.6"
          letterSpacing="1.6"
          fontFamily="var(--font-sans)"
        >
          <textPath href={`#circle-${id}`} startOffset="0%">
            {ring}
          </textPath>
        </text>
      </motion.svg>

      {/* Static centre so the mark does not spin with the ring */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
    </div>
  );
}
