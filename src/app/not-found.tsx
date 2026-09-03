import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";
import Footer from "@/components/Footer";
import { ArrowUpRightIcon, MailIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  // Offer the real work rather than a dead end.
  const documented = site.projects.filter((p) => caseStudies[p.slug]).slice(0, 3);

  return (
    <>
      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-3xl px-6 py-24 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            404
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            That page does not exist
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body">
            The link may be out of date, or the address slightly off. Everything
            worth reading is one click away.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              Back to the homepage
              <ArrowUpRightIcon />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
            >
              <MailIcon className="h-4 w-4" />
              Get in touch
            </a>
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Case studies
            </h2>
            <ul className="mt-5 space-y-3">
              {documented.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-2 text-base text-body transition-colors hover:text-accent"
                  >
                    {project.title}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
