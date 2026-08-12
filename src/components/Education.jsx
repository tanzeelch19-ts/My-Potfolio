import { GraduationCap, CheckCircle2 } from "lucide-react";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { EDUCATION, CERTIFICATIONS } from "../data/data.js";

export default function Education() {
  return (
    <Section id="education" eyebrow="04" title="Education">
      <div className="space-y-4">
        {EDUCATION.map((ed, i) => (
          <Reveal key={i}>
            <div className="flex gap-4 p-5 rounded-lg glass hover-lift">
              <GraduationCap className="text-amber shrink-0" size={22} />
              <div>
                <h3 className="font-semibold text-ink-900 dark:text-paper">
                  {ed.degree}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ed.institute} · {ed.period}
                </p>
              </div>
            </div>
          </Reveal>
        ))}

        <div className="pt-2">
          <p className="font-mono text-xs mb-2 text-gray-500 dark:text-gray-400">
            Certifications
          </p>
          <ul className="space-y-2">
            {CERTIFICATIONS.map((c, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-ink-900 dark:text-paper"
              >
                <CheckCircle2 size={15} className="text-amber shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}