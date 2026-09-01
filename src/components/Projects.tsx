import Image from "next/image";
import { site, type Project } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import { ArrowUpRightIcon, GithubIcon } from "./Icons";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-canvas transition-colors duration-300 hover:border-accent-line">
      {project.image ? (
        <div className="relative aspect-[21/9] border-b border-line bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-ink">
            {project.title}
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
          <ul className="mt-6 space-y-3 border-l-2 border-line pl-5">
            {project.highlights.map((point, i) => (
              <li key={i} className="text-sm leading-relaxed text-body">
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {project.github || project.live ? (
          <div className="mt-6 flex items-center gap-5 border-t border-line pt-5">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-accent"
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-accent"
              >
                Live demo
                <ArrowUpRightIcon />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Selected projects"
      intro="Systems I designed and shipped, with the decisions that made them work rather than just the feature list."
    >
      <div className="space-y-6">
        {site.projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
