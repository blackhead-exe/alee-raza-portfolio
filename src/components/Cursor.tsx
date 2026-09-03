"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * A small trailing ring that follows the pointer and grows over anything
 * clickable. Deliberately additive: the real cursor is never hidden, so
 * nothing breaks if this fails, and it is skipped entirely on touch
 * devices and for anyone who has asked for reduced motion.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ring = { stiffness: 380, damping: 32, mass: 0.35 };
  const rx = useSpring(x, ring);
  const ry = useSpring(y, ring);

  useEffect(() => {
    // Only for real pointers. Touch and stylus get nothing.
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    setEnabled(true);

    const CLICKABLE = 'a, button, [role="button"], input, select, textarea, summary';

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHot(Boolean((e.target as Element | null)?.closest?.(CLICKABLE)));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: rx, y: ry }}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
    >
      <motion.div
        className="rounded-full border border-accent"
        animate={{
          width: hot ? 44 : 22,
          height: hot ? 44 : 22,
          x: hot ? -22 : -11,
          y: hot ? -22 : -11,
          opacity: visible ? (hot ? 0.9 : 0.45) : 0,
          backgroundColor: hot ? "rgba(212,180,131,0.14)" : "rgba(212,180,131,0)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.4 }}
      />
    </motion.div>
  );
}
