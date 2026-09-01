import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon,
  XIcon,
} from "./Icons";

export default function Hero() {
  const { socials } = site;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft backdrop: a tinted wash plus a faint grid, both purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.35fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-canvas px-3 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {site.name}
              </h1>
              <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">
                {site.title}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
                >
                  View my work
                  <ArrowUpRightIcon />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
                >
                  <MailIcon className="h-4 w-4" />
                  Contact me
                </a>
                {site.resumeUrl ? (
                  <a
                    href={site.resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-body transition-colors hover:text-accent"
                  >
                    <DownloadIcon />
                    Resume
                  </a>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex items-center gap-5 text-faint">
                {socials.github ? (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub"
                    className="transition-colors hover:text-ink"
                  >
                    <GithubIcon />
                  </a>
                ) : null}
                {socials.linkedin ? (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                    className="transition-colors hover:text-ink"
                  >
                    <LinkedinIcon />
                  </a>
                ) : null}
                {socials.x ? (
                  <a
                    href={socials.x}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="X"
                    className="transition-colors hover:text-ink"
                  >
                    <XIcon />
                  </a>
                ) : null}
                {site.location ? (
                  <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted">
                    <PinIcon />
                    {site.location}
                  </span>
                ) : null}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="order-first md:order-none">
            <div className="relative mx-auto w-44 sm:w-56 md:w-full md:max-w-xs">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent-soft blur-2xl"
              />
              <div className="aspect-square overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_20px_50px_-24px_rgba(11,18,32,0.35)]">
                {site.avatar ? (
                  <Image
                    src={site.avatar}
                    alt={site.name}
                    width={480}
                    height={480}
                    priority
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,var(--color-accent-soft),var(--color-canvas))]">
                    <span className="text-5xl font-semibold tracking-tight text-accent sm:text-6xl">
                      {site.initials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
