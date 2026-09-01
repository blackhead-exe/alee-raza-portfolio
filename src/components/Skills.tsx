import { site } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & technologies"
      intro="The tools I reach for most. I care more about picking the right one than collecting logos."
      tinted
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {site.skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 80} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-canvas p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-body transition-colors hover:border-accent-line hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
