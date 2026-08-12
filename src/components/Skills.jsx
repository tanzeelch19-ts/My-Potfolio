import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { SKILLS } from "../data/data.js";

const METER_SEGMENTS = 20;

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02" title="Skills">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        Self-rated, calibrated against what I've actually shipped — not just
        tutorials.
      </p>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
        {SKILLS.map((s, i) => {
          const filled = Math.round((s.level / 100) * METER_SEGMENTS);

          return (
            <Reveal key={s.name} delay={i * 40}>
              <div className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-mono text-sm text-ink-900 dark:text-paper transition-colors group-hover:text-amber">
                    {s.name}
                  </span>
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    {s.level}%
                  </span>
                </div>

                <div className="flex gap-[3px]">
                  {Array.from({ length: METER_SEGMENTS }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-sm transition-colors duration-500 ${
                        idx < filled
                          ? "bg-amber"
                          : "bg-paper-line dark:bg-ink-700"
                      }`}
                      style={{ transitionDelay: `${idx * 15}ms` }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}