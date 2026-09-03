"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import CircularBadge from "./CircularBadge";
import MagneticButton from "./MagneticButton";
import RoleRotator from "./RoleRotator";
import TextReveal from "./TextReveal";
import { ArrowUpRightIcon, DownloadIcon, MailIcon } from "./Icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -46]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-canvas"
    >
      {/* Hairline rule grid, the editorial scaffold behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl grid-cols-4 md:grid"
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-l border-line/60 last:border-r" />
        ))}
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-28 sm:pt-36"
        style={reduced ? undefined : { opacity: fade }}
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-accent"
                  animate={reduced ? {} : { scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
            <span className="hidden h-px flex-1 bg-line sm:block" />
            <span className="hidden text-[0.7rem] uppercase tracking-[0.2em] text-muted sm:block">
              Portfolio 2026
            </span>
          </motion.div>

          {/* The name gets the full container width. Nothing overlaps it, so
              it can be sized off the viewport without colliding with the
              portrait the way an absolutely-placed one did. */}
          <motion.div variants={item} className="mt-10">
            <TextReveal
              as="h1"
              text={site.name}
              delay={0.1}
              stagger={0.09}
              className="display block text-ink"
              style={{ fontSize: "clamp(3rem, 12.2vw, 11rem)" }}
            />
          </motion.div>
        </motion.div>

        <div className="mt-10 grid gap-12 border-t border-line pt-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={reduced ? undefined : { y: copyY }}
          >
            <motion.p variants={item} className="text-2xl text-ink sm:text-3xl">
              <RoleRotator roles={site.roles} />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-body"
            >
              {site.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm uppercase tracking-wide text-canvas transition-colors hover:bg-accent hover:text-ink"
              >
                View my work
                <ArrowUpRightIcon />
              </MagneticButton>
              <MagneticButton
                href={`mailto:${site.email}`}
                strength={0.2}
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3.5 text-sm uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <MailIcon className="h-4 w-4" />
                Contact me
              </MagneticButton>
              {site.resumeUrl ? (
                <MagneticButton
                  href={site.resumeUrl}
                  download
                  strength={0.18}
                  className="inline-flex items-center gap-2 px-3 py-3.5 text-sm uppercase tracking-wide text-muted transition-colors hover:text-accent"
                >
                  <DownloadIcon />
                  Resume
                </MagneticButton>
              ) : null}
            </motion.div>

            <motion.div variants={item} className="mt-14 flex items-center gap-3">
              <span className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">
                Scroll to explore
              </span>
              <motion.span
                className="block h-px w-16 origin-left bg-accent"
                animate={reduced ? {} : { scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Portrait sits in the flow beside the copy, never over the type */}
          <motion.div
            style={reduced ? undefined : { y: portraitY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="justify-self-center lg:justify-self-end"
          >
            <div className="relative w-56 sm:w-72 lg:w-[19rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-surface">
                {site.avatar ? (
                  <Image
                    src={site.avatar}
                    alt={site.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 288px, 304px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="display text-6xl text-accent">
                      {site.initials}
                    </span>
                  </div>
                )}
              </div>

              <CircularBadge
                text="BASED IN PAKISTAN"
                className="absolute -bottom-9 -left-9 h-24 w-24 text-ink sm:h-28 sm:w-28"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
