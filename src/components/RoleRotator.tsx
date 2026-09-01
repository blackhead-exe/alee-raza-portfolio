"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Cycles through a list of role descriptions, one at a time.
 * The first entry is rendered statically when motion is reduced,
 * and it always reserves a fixed line so the layout never jumps.
 */
export default function RoleRotator({
  roles,
  interval = 2600,
  className = "",
}: {
  roles: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      interval,
    );
    return () => clearInterval(id);
  }, [roles.length, interval, reduced]);

  if (reduced) {
    return <span className={className}>{roles[0]}</span>;
  }

  return (
    <span className={`relative inline-flex ${className}`}>
      {/* Invisible longest string holds the width so nothing reflows */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {roles.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
