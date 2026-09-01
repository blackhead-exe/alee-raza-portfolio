"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * An anchor that drifts a few pixels toward the cursor while hovered,
 * then springs back. Mouse only; touch and reduced-motion get a plain link.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.28,
  download = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** fraction of the cursor offset the button follows */
  strength?: number;
  download?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 260, damping: 18, mass: 0.4 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  function handleMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  const linkProps = {
    href,
    ...(download ? { download: true } : {}),
    ...(external ? { target: "_blank", rel: "noreferrer noopener" } : {}),
  };

  if (reduced) {
    return (
      <a {...linkProps} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref}
      {...linkProps}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
