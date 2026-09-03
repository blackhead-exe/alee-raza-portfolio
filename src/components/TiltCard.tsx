"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Wraps content in a card that tilts slightly toward the cursor and
 * carries a soft light that follows the pointer. Pointer-driven only,
 * so touch devices get the plain card.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 4,
}: {
  children: ReactNode;
  className?: string;
  /** degrees of rotation at the card's edge */
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Raw pointer position, in px, relative to the card.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Target rotation is written to the raw values; the springs trail them,
  // so the tilt eases rather than snapping to the cursor.
  const spring = { stiffness: 220, damping: 22, mass: 0.5 };
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, spring);
  const rotateY = useSpring(tiltY, spring);

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, rgba(212,180,131,0.09), transparent 72%)`;

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    tiltY.set((x / rect.width - 0.5) * maxTilt * 2);
    tiltX.set(-(y / rect.height - 0.5) * maxTilt * 2);
  }

  function handleLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group/tilt relative [transform-style:preserve-3d] ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      {children}
    </motion.div>
  );
}
