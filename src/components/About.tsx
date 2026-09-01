import { site } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  const { about } = site;

  return (
    <Section id="about" eyebrow="Introduction" title={about.heading} tinted>
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-body">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {about.stats.length > 0 ? (
          <Reveal delay={120}>
            <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-canvas px-4 py-5 md:px-5"
                >
                  <dd className="text-2xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs uppercase tracking-wide text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
