import type { ReactNode } from "react";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

/**
 * A page section. Setting surface="dark" flips every semantic token
 * inside it, so nothing nested needs to know which ground it is on.
 */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  surface = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  surface?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      data-surface={surface === "dark" ? "dark" : undefined}
      className="border-t border-line bg-canvas"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <TextReveal
            as="h2"
            text={title}
            stagger={0.06}
            className="display block text-ink"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}
          />
          {intro ? (
            <Reveal delay={120}>
              <p className="max-w-xl text-base leading-relaxed text-body lg:pb-3">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}
