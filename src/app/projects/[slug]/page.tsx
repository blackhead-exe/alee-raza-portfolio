import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";
import { siteUrl } from "@/app/layout";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";
import ProjectVisual, { type VisualVariant } from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import { ArrowUpRightIcon, GithubIcon, MailIcon } from "@/components/Icons";

/** Only projects that have a write-up get a page. */
const documented = site.projects.filter((p) => caseStudies[p.slug]);

export function generateStaticParams() {
  return documented.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = documented.find((p) => p.slug === slug);
  if (!project) return {};

  const study = caseStudies[slug];
  return {
    title: project.title,
    description: study.intro,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/projects/${slug}`,
      title: `${project.title} | ${site.name}`,
      description: study.intro,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${site.name}`,
      description: study.intro,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = documented.find((p) => p.slug === slug);
  if (!project) notFound();

  const study = caseStudies[slug];

  // Wrap around so the reader always has somewhere to go next.
  const index = documented.findIndex((p) => p.slug === slug);
  const next = documented[(index + 1) % documented.length];

  return (
    <>
      <ScrollProgress />

      <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-accent"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
              &larr;
            </span>
            All projects
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent"
          >
            {site.name}
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* ---------- title block ---------- */}
        <section className="border-b border-line bg-surface">
          <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Case study
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">
                {study.intro}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 sm:grid-cols-4">
                {study.meta.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs uppercase tracking-wide text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.github || project.live ? (
              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-accent"
                    >
                      <GithubIcon className="h-4 w-4" />
                      View code
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
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* ---------- animated schematic ---------- */}
        <div className="mx-auto w-full max-w-3xl px-6 pt-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line">
              <ProjectVisual variant={project.visual as VisualVariant} />
            </div>
          </Reveal>
        </div>

        {/* ---------- narrative ---------- */}
        <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-16">
          <div className="space-y-14">
            {study.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 60}>
                <section>
                  <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-body">
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 border-l-2 border-accent-line pl-5">
                      {section.bullets.map((b, j) => (
                        <li key={j} className="text-sm leading-relaxed text-body">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>

          {/* ---------- decisions ---------- */}
          {study.decisions && study.decisions.length > 0 ? (
            <div className="mt-16">
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  Decisions worth defending
                </h2>
                <p className="mt-3 text-base leading-relaxed text-body">
                  The choices that shaped this build, and the reasoning behind
                  each one.
                </p>
              </Reveal>
              <div className="mt-8 space-y-4">
                {study.decisions.map((decision, i) => (
                  <Reveal key={decision.title} delay={i * 70}>
                    <div className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent-line">
                      <h3 className="text-base font-semibold text-ink">
                        {decision.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-body">
                        {decision.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}

          {/* ---------- screenshots of the real build ---------- */}
          {study.gallery && study.gallery.length > 0 ? (
            <div className="mt-16">
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  Inside the build
                </h2>
                <p className="mt-3 text-base leading-relaxed text-body">
                  {study.galleryNote ??
                    "Screenshots from the live system. Webhook URLs, contact records and anything else identifying have been removed."}
                </p>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {study.gallery.map((shot, i) => (
                  <Reveal
                    key={shot.src}
                    delay={i * 60}
                    className={shot.tall ? "" : "sm:col-span-2"}
                  >
                    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
                      <a
                        href={shot.src}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="block"
                      >
                        <Image
                          src={shot.src}
                          alt={shot.caption}
                          width={1600}
                          height={800}
                          sizes="(max-width: 640px) 100vw, 720px"
                          className="h-auto w-full"
                        />
                      </a>
                      <figcaption className="border-t border-line bg-canvas px-4 py-3 text-sm text-body">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}

          {/* ---------- outcomes ---------- */}
          {study.outcomes && study.outcomes.length > 0 ? (
            <Reveal>
              <div className="mt-16 rounded-2xl border border-line bg-surface p-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">
                  By the numbers
                </h2>
                <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {study.outcomes.map((outcome) => (
                    <div key={outcome.label}>
                      <dd className="text-3xl font-semibold tracking-tight text-accent">
                        <AnimatedCounter value={outcome.value} />
                      </dd>
                      <dt className="mt-1 text-xs uppercase tracking-wide text-muted">
                        {outcome.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* ---------- next project + contact ---------- */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-3xl px-6 py-14">
            {next.slug !== slug ? (
              <Reveal>
                <Link
                  href={`/projects/${next.slug}`}
                  className="group block rounded-2xl border border-line bg-canvas p-6 transition-colors hover:border-accent-line"
                >
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Next case study
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {next.title}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </p>
                </Link>
              </Reveal>
            ) : null}

            <Reveal delay={80}>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-canvas p-6">
                <p className="text-base text-body">
                  Got a system that needs building or rescuing?
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
                >
                  <MailIcon className="h-4 w-4" />
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
