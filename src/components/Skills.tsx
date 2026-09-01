"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & technologies"
      intro="The tools I reach for most. I care more about picking the right one than collecting logos."
      tinted
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {site.skills.map((group, gi) => (
          <Reveal key={group.group} delay={gi * 80} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="h-full rounded-2xl border border-line bg-canvas p-6 transition-colors hover:border-accent-line"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.38,
                      delay: i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.06 }}
                    className="cursor-default rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-body transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
