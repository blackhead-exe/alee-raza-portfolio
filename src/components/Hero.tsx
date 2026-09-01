"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import MagneticButton from "./MagneticButton";
import RoleRotator from "./RoleRotator";
import { ArrowUpRightIcon, DownloadIcon, MailIcon, PinIcon } from "./Icons";

/** Staggered entrance for the left-hand column. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Drifting colour blobs behind everything. Decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16),transparent_68%)] blur-2xl"
          animate={reduced ? {} : { x: [0, 60, -20, 0], y: [0, 40, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 top-8 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.13),transparent_68%)] blur-2xl"
          animate={reduced ? {} : { x: [0, -50, 25, 0], y: [0, 35, -15, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/3 top-56 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),transparent_68%)] blur-2xl"
          animate={reduced ? {} : { x: [0, 40, -35, 0], y: [0, -30, 25, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Faint grid, faded out toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-canvas/80 px-3 py-1.5 text-xs font-medium text-accent backdrop-blur">
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
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 bg-[linear-gradient(120deg,var(--color-ink)_0%,var(--color-ink)_45%,var(--color-accent)_100%)] bg-clip-text text-4xl font-semibold leading-[1.08] tracking-tight text-transparent sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 text-xl font-medium text-accent sm:text-2xl"
            >
              <RoleRotator roles={site.roles} />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-body"
            >
              {site.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(11,18,32,0.6)] transition-colors hover:bg-accent"
              >
                View my work
                <ArrowUpRightIcon />
              </MagneticButton>
              <MagneticButton
                href={`mailto:${site.email}`}
                strength={0.2}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/80 px-5 py-3 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent-line hover:text-accent"
              >
                <MailIcon className="h-4 w-4" />
                Contact me
              </MagneticButton>
              {site.resumeUrl ? (
                <MagneticButton
                  href={site.resumeUrl}
                  download
                  strength={0.18}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-body transition-colors hover:text-accent"
                >
                  <DownloadIcon />
                  Resume
                </MagneticButton>
              ) : null}
            </motion.div>

            {site.location ? (
              <motion.div variants={item} className="mt-8">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <PinIcon />
                  {site.location}
                </span>
              </motion.div>
            ) : null}
          </motion.div>

          {/* Portrait panel: the photo fills a tall frame rather than sitting
              inside a small box, and fades into the page along the bottom. */}
          <motion.div
            className="order-first md:order-none"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative mx-auto w-56 sm:w-72 md:w-full"
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Soft accent bloom sitting behind the panel */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_35%,rgba(37,99,235,0.22),transparent_70%)] blur-2xl"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_30px_70px_-30px_rgba(11,18,32,0.5)]">
                {site.avatar ? (
                  <>
                    <Image
                      src={site.avatar}
                      alt={site.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 288px, 380px"
                      className="object-cover object-[50%_22%]"
                    />
                    {/* Bottom fade so the portrait dissolves into the page */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,var(--color-canvas)_2%,rgba(255,255,255,0.55)_38%,transparent_100%)]"
                    />
                    {/* Faint inner edge to keep the frame crisp on light photos */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/5"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,var(--color-accent-soft),var(--color-canvas))]">
                    <span className="text-6xl font-semibold tracking-tight text-accent">
                      {site.initials}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="mt-16 hidden justify-center sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.a
            href="#about"
            aria-label="Scroll to About"
            className="flex h-9 w-6 items-start justify-center rounded-full border border-line pt-1.5 text-faint transition-colors hover:border-accent-line"
            animate={reduced ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-1.5 w-1 rounded-full bg-accent" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
