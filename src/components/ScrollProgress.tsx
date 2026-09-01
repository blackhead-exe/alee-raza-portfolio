"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin accent bar across the very top showing read progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,var(--color-accent),#7c3aed,var(--color-accent))]"
    />
  );
}
