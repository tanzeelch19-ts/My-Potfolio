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
            <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-amber" />
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={15} className="text-amber" />
              <h3 className="font-semibold text-ink-900 dark:text-paper">
                {exp.title}
              </h3>
            </div>
            <p className="font-mono text-xs mb-1.5 text-gray-500 dark:text-gray-400">
              {exp.period}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {exp.description}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}