"use client";

import { site } from "@/content/site";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  XIcon,
} from "./Icons";

export default function Contact() {
  const { socials } = site;

  return (
    <section id="contact" data-surface="dark" className="border-t border-line bg-canvas">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">
              Contact
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <TextReveal
          as="h2"
          text={site.contact.heading}
          stagger={0.055}
          className="display mt-10 block max-w-4xl text-ink"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}
        />

        <div className="mt-12 grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="max-w-xl text-base leading-relaxed text-body">
              {site.contact.body}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm uppercase tracking-wide text-canvas transition-colors hover:bg-accent-hover"
              >
                <MailIcon className="h-4 w-4" />
                {site.email}
              </MagneticButton>
              {socials.linkedin ? (
                <MagneticButton
                  href={socials.linkedin}
                  external
                  strength={0.2}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-sm uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                  <ArrowUpRightIcon />
                </MagneticButton>
              ) : null}
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-16 flex items-center gap-7 text-faint">
            {socials.github ? (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="transition-colors hover:text-accent"
              >
                <GithubIcon />
              </a>
            ) : null}
            {socials.x ? (
              <a
                href={socials.x}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X"
                className="transition-colors hover:text-accent"
              >
                <XIcon />
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
