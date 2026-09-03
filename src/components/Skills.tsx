"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import TiltCard from "./TiltCard";

/**
 * Bento layout: the first group gets the wide tile because it is the one
 * a GoHighLevel employer scans for, then the rest fill in around it. The
 * spans are per-group rather than alternating, so the emphasis is a
 * decision rather than an accident of ordering.
 */
const SPANS = [
  "sm:col-span-2 lg:col-span-4",
  "sm:col-span-1 lg:col-span-2",
  "sm:col-span-1 lg:col-span-2",
  "sm:col-span-2 lg:col-span-4",
];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & technologies"
      intro="The tools I reach for most. I care more about picking the right one than collecting logos."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.skills.map((group, gi) => (
          <Reveal
            key={group.group}
            delay={gi * 80}
            className={`h-full ${SPANS[gi % SPANS.length]}`}
          >
            <TiltCard className="h-full rounded-sm" maxTilt={2}>
              <div className="relative h-full overflow-hidden rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent">
                {/* A faint accent corner so the tiles read as a set, not a table */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,var(--color-accent-soft),transparent_70%)]"
                />
                <div className="relative flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
                    {group.group}
                  </h3>
                  <span className="display shrink-0 text-2xl text-accent">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="relative mt-4 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.38,
                        delay: i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ scale: 1.06 }}
                      className="cursor-default rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-body transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
