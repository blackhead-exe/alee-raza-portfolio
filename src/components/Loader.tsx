"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DURATION = 1900; // ms of counting before the curtain lifts

/**
 * Cinematic intro: a black curtain with a counter running to 100 and a
 * gold ring sweeping round it, then the whole thing lifts away.
 *
 * A loader that fails is a site nobody ever sees, so this one is built to
 * get out of the way no matter what:
 *   - reduced motion skips it entirely
 *   - a hard timeout dismisses it even if the animation frame never runs
 *   - no ref guard, because StrictMode's double mount would cancel the
 *     first run's frame and then skip the second, leaving it stuck at 0
 */
export default function Loader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setPct(Math.round(ease(t) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDone(true);
    };
    frame = requestAnimationFrame(tick);

    // Failsafe: if rAF is throttled or never fires, let the page through anyway.
    const failsafe = window.setTimeout(() => {
      setPct(100);
      setDone(true);
    }, DURATION + 900);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(failsafe);
      document.body.style.overflow = prev;
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="relative flex h-40 w-40 items-center justify-center sm:h-52 sm:w-52">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#241f18" strokeWidth="1.5" />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#d4b483"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="80 259"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "linear" }}
                style={{ originX: "60px", originY: "60px" }}
              />
            </svg>

            <div className="flex items-baseline gap-1">
              <span className="display text-6xl tabular-nums text-[#f4efe6] sm:text-7xl">
                {pct}
              </span>
              <span className="text-base text-[#d4b483]">%</span>
            </div>
          </div>

          <p className="absolute bottom-10 text-[0.7rem] uppercase tracking-[0.4em] text-[#6b655e]">
            Syed Ali Raza
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
