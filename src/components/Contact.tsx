import { site } from "@/content/site";
import Reveal from "./Reveal";
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
    <section id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-canvas px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Contact
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {site.contact.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body">
              {site.contact.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent"
              >
                <MailIcon className="h-4 w-4" />
                {site.email}
              </a>
              {socials.linkedin ? (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-5 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                  <ArrowUpRightIcon />
                </a>
              ) : null}
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 text-faint">
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
