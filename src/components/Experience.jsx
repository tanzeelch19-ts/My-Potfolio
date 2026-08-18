import { Briefcase } from "lucide-react";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

import { EXPERIENCE } from "../data/data.js";
export default function Experience() {
  return (
    <Section id="experience" eyebrow="05" title="Experience">
      <div className="relative pl-6 border-l border-paper-line dark:border-ink-line">
        {EXPERIENCE.map((exp, i) => (
          <Reveal
            key={i}
            delay={i * 100}
            className="relative pb-8 last:pb-0"
          >
            <div
              className="group relative rounded-lg -mx-3 px-3 py-2 transition-all duration-300 ease-out
                         hover:-translate-y-0.5 hover:bg-gray-700 dark:hover:bg-ink/90
                         hover:shadow-[0_4px_20px_-4px_rgba(217,119,6,0.25)]"
            >
              <span className="absolute -left-7.75 top-3 w-2.5 h-2.5 rounded-full bg-amber transition-all duration-300 ease-out group-hover:scale-150 group-hover:shadow-[0_0_12px_2px_rgba(217,119,6,0.6)]" />
              <div className="flex items-center gap-2 mb-1">
                <Briefcase
                  size={15}
                  className="text-amber transition-transform duration-300 group-hover:rotate-6"
                />
                <h3 className="font-semibold text-ink-900 dark:text-paper transition-colors duration-300 group-hover:text-amber">
                  {exp.title}
                </h3>
              </div>
              <p className="font-mono text-xs mb-1.5 text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-amber/80">
                {exp.period}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-ink-900 dark:group-hover:text-paper">
                {exp.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}