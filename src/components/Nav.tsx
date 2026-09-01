"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/content/site";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently nearest the top of the viewport.
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

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === link.href
                    ? "bg-accent-soft text-accent"
                    : "text-body hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink transition-colors hover:bg-surface md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-canvas md:hidden">
          <ul className="mx-auto flex w-full max-w-5xl flex-col px-6 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 text-base text-body last:border-0 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
