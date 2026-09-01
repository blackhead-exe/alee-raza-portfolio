import { site } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  const hasExperience = site.experience.length > 0;
  const hasEducation = site.education.length > 0;
  if (!hasExperience && !hasEducation) return null;

  return (
    <Section
      id="experience"
      eyebrow="Background"
      title="Experience"
      intro="Where I've worked and what I actually shipped there."
    >
      {hasExperience ? (
        <ol className="relative space-y-10 border-l border-line pl-8">
          {site.experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-canvas"
              />
              <Reveal delay={i * 90}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
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
                    <li
                      key={j}
                      className="relative pl-5 text-sm leading-relaxed text-body before:absolute before:left-0 before:top-[0.6rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-line"
                    >
                      {point}
                    </li>
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
                <div
                  key={edu.degree}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <p className="font-medium text-ink">{edu.degree}</p>
                  <p className="mt-1 text-sm text-body">{edu.institution}</p>
                  <p className="mt-1 text-sm text-muted">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
