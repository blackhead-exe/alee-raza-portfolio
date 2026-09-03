"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { site, type Project } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";
import ProjectVisual, { type VisualVariant } from "./ProjectVisual";
import Reveal from "./Reveal";
import Section from "./Section";
import TiltCard from "./TiltCard";
import { ArrowUpRightIcon, GithubIcon } from "./Icons";

/** Cards tease; the case study page carries the depth. */
const TEASER_BULLETS = 2;

function ProjectCard({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(caseStudies[project.slug]);
  const href = `/projects/${project.slug}`;

  return (
    <TiltCard className="rounded-sm" maxTilt={2}>
      <article className="group/card relative overflow-hidden rounded-sm border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent-line hover:shadow-[0_24px_60px_-32px_rgba(11,18,32,0.45)]">
        {project.image ? (
          <div className="relative aspect-[16/9] border-b border-line bg-surface">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        ) : (
          <ProjectVisual variant={project.visual as VisualVariant} />
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="display text-2xl text-ink sm:text-3xl">
              {hasCaseStudy ? (
                // Stretched link: the whole card is clickable, but the title
                // stays the single accessible link for screen readers.
                <Link
                  href={href}
                  className="transition-colors before:absolute before:inset-0 before:z-20 before:content-[''] group-hover/card:text-accent"
                >
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h3>
            {project.featured ? (
              <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-accent">
                Featured
              </span>
            ) : null}
            <span className="ml-auto text-sm text-muted">{project.period}</span>
          </div>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-body">
            {project.blurb}
          </p>

          {project.highlights.length > 0 ? (
            <ul className="mt-5 space-y-2.5 pl-5">
              {project.highlights.slice(0, TEASER_BULLETS).map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative text-sm leading-relaxed text-body before:absolute before:-left-5 before:top-[0.55rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-line"
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          ) : null}

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.32, delay: i * 0.04 }}
                className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-line pt-5">
            {hasCaseStudy ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read case study
                <span className="transition-transform duration-200 group-hover/card:translate-x-1">
                  &rarr;
                </span>
              </span>
            ) : null}

            {/* Above the stretched link so these stay independently clickable */}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="relative z-30 inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" />
                Code
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link relative z-30 inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-accent"
              >
                Live demo
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                  <ArrowUpRightIcon />
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Selected projects"
      intro="Systems I designed and shipped. Open any of them for the full write-up, including the architecture and the decisions behind it."
      surface="dark"
    >
      <div className="space-y-8">
        {site.projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 70} y={28}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
