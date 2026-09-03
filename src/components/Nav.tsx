"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, site } from "@/content/site";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      // Over the cream hero the bar is transparent and dark-on-light; once
      // it lifts off it becomes its own dark surface, and every token inside
      // flips with it.
      data-surface={scrolled || open ? "dark" : undefined}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "border-b border-line bg-canvas/90 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative py-1 text-[0.72rem] uppercase tracking-[0.2em] transition-colors ${
                  active === link.href ? "text-accent" : "text-body hover:text-ink"
                }`}
              >
                {link.label}
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-underline"
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className="hidden rounded-full border border-accent px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-canvas md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="sheet"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i }}
                    className="display block border-b border-line py-4 text-3xl text-ink last:border-0"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
              <li className="pt-5">
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-accent px-5 py-3 text-center text-[0.72rem] uppercase tracking-[0.2em] text-canvas"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
