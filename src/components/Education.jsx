import { GraduationCap, CheckCircle2 } from "lucide-react";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { EDUCATION, CERTIFICATIONS } from "../data/data.js";

export default function Education() {
  return (
    <Section id="education" eyebrow="04" title="Education">
      <div className="relative space-y-4 mb-10">
        {EDUCATION.map((ed, i) => (
          <Reveal key={i}>
            <div className="group relative flex gap-4 p-5 rounded-lg glass hover-lift">
              {/* connector line to next item */}
              {i < EDUCATION.length - 1 && (
                <div className="absolute left-[38px] top-[56px] w-px h-[calc(100%+16px-40px)] bg-paper-line dark:bg-ink-line" />
              )}

              <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-amber/20">
                <GraduationCap className="text-amber" size={18} />
              </div>

              <div>
                <h3 className="font-semibold text-ink-900 dark:text-paper transition-colors group-hover:text-amber">
                  {ed.degree}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {ed.institute} · {ed.period}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div>
        <p className="font-mono text-xs mb-3 text-gray-500 dark:text-gray-400 tracking-wide">
          Certifications
        </p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="group flex items-center gap-2.5 p-3 rounded-lg glass hover-lift text-sm text-ink-900 dark:text-paper">
                <CheckCircle2
                  size={16}
                  className="text-amber shrink-0 transition-transform group-hover:scale-110"
                />
                {c}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}