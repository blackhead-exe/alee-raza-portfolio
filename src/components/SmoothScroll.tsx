"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Eases the scroll instead of snapping it, which is what makes the
 * parallax and reveal work read as one motion rather than several.
 *
 * Two rules kept it from becoming an accessibility problem: anyone who
 * has asked for reduced motion gets native scrolling untouched, and
 * anchor links are handed to Lenis so in-page navigation still lands
 * exactly where it should.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease out: quick to respond, unhurried to settle.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch scrolling is already smooth and momentum-based natively;
      // overriding it there only makes the page feel laggy.
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Native smooth-scroll on anchors would fight Lenis, so route them through it.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"], a[href^="/#"]');
      if (!link) return;
      const hash = link.getAttribute("href")?.split("#")[1];
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
      history.pushState(null, "", `#${hash}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
