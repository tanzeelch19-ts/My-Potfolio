import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";


import { SKILLS } from "../data/data.js";
export default function Skills() {
  return (
    <Section id="skills" eyebrow="02" title="Skills">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
        {SKILLS.map((s, i) => (
          <Reveal key={s.name} delay={i * 40}>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-sm text-ink-900 dark:text-paper">
                  {s.name}
                </span>
                <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                  {s.level}%
                </span>
              </div>
              <div className="h-1.5 rounded-full w-full bg-paper-line dark:bg-ink-700">
                <div
                  className="h-1.5 rounded-full bg-amber transition-[width] duration-1000 ease-out"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}