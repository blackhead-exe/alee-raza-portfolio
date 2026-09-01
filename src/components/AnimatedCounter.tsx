"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts up to a numeric value when scrolled into view.
 * Accepts strings like "117", "325+" or "4x" - the digits animate,
 * any prefix/suffix is preserved exactly.
 */
export default function AnimatedCounter({
  value,
  duration = 1600,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target) || reduced) return;

    let frame = 0;
    const start = performance.now();
    // easeOutExpo: fast off the line, settles gently on the final number
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reduced]);

  // Unparseable value, or motion turned off: just show it as written.
  if (Number.isNaN(target) || reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}
