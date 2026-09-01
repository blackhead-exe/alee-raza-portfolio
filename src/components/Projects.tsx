import Image from "next/image";
import { site, type Project } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import { ArrowUpRightIcon, GithubIcon } from "./Icons";

function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.live || project.github || undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-canvas transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-[0_18px_40px_-24px_rgba(11,18,32,0.35)]">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-accent-soft),var(--color-surface))]">
            <span className="px-6 text-center text-sm font-medium tracking-tight text-accent/70">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
          {project.blurb}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
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
          <div className="mt-6 flex items-center gap-5 border-t border-line pt-4">
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
      intro="A few things I've built. Each one started as a real problem someone needed solved, not a tutorial."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {site.projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 90} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
