"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  const hasExperience = site.experience.length > 0;
  const hasEducation = site.education.length > 0;

  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  // Springed so the line glides instead of tracking the wheel one-to-one.
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  if (!hasExperience && !hasEducation) return null;

  return (
    <Section
      id="experience"
      eyebrow="Background"
      title="Experience"
      intro="Where I have worked and what I actually shipped there."
      surface="dark"
    >
      {hasExperience ? (
        <ol ref={timelineRef} className="relative space-y-10 pl-8">
          {/* Static rail, plus an accent line that fills as you scroll past */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-line" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute inset-y-0 left-0 w-px origin-top bg-accent"
          />

          {site.experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="relative">
              <motion.span
                aria-hidden="true"
                className="absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-canvas"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              />
              <Reveal delay={i * 90}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="display text-2xl text-ink sm:text-3xl">
                    {job.role}
                  </h3>
                  <span className="text-sm text-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {job.company}
                  {job.location ? (
                    <span className="font-normal text-muted"> · {job.location}</span>
                  ) : null}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.5,
                        delay: j * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative pl-5 text-sm leading-relaxed text-body before:absolute before:left-0 before:top-[0.6rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-line"
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : null}

      {hasEducation ? (
        <Reveal delay={120}>
          <div className={hasExperience ? "mt-14" : ""}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Education
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {site.education.map((edu) => (
                <motion.div
                  key={edu.degree}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent-line"
                >
                  <p className="font-medium text-ink">{edu.degree}</p>
                  <p className="mt-1 text-sm text-body">{edu.institution}</p>
                  <p className="mt-1 text-sm text-muted">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
