"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import AnimatedCounter from "./AnimatedCounter";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  const { about } = site;

  return (
    <Section id="about" eyebrow="Introduction" title={about.heading} tinted>
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-base leading-relaxed text-body">{p}</p>
            </Reveal>
          ))}
        </div>

        {about.stats.length > 0 ? (
          <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={140 + i * 110}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-line bg-canvas px-4 py-5 transition-colors hover:border-accent-line md:px-5"
                >
                  <dd className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    <AnimatedCounter value={stat.value} />
                  </dd>
                  <dt className="mt-1 text-xs uppercase tracking-wide text-muted">
                    {stat.label}
                  </dt>
                </motion.div>
              </Reveal>
            ))}
          </dl>
        ) : null}
      </div>
    </Section>
  );
}
