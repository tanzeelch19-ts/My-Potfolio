import { Fingerprint, BookOpen, Rocket } from "lucide-react";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

const CARDS = [
  {
    icon: Fingerprint,
    title: "Who I am",
    body: "Frontend developer focused on building clean, responsive interfaces with React. I care about usable UI, readable code, and shipping things that actually work for the people using them.",
  },
  {
    icon: BookOpen,
    title: "Currently learning",
    body: "Deepening my React and Vite workflow, advanced Tailwind patterns, and working with REST APIs in real projects.",
  },
  {
    icon: Rocket,
    title: "Goals",
    body: "Take on freelance and client projects, contribute to open source, and grow into a strong full-stack developer.",
  },
];

export default function About() {
  return (
    <Section id="about" eyebrow="01" title="About">
      <p className="text-lg md:text-xl font-medium text-ink-900 dark:text-paper mb-10 max-w-2xl leading-snug">
        I build interfaces people actually enjoy using — then I go learn how
        to build them better.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {CARDS.map(({ icon: Icon, title, body }) => (
          <Reveal key={title}>
            <div className="group rounded-lg p-5 h-full glass hover-lift shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-amber/20">
                <Icon size={18} className="text-amber" />
              </div>

              <h3 className="font-mono text-sm mb-2 text-amber tracking-wide">
                {title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {body}
              </p>

              <div className="mt-5 h-px w-8 bg-amber/40 transition-all duration-300 group-hover:w-16" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}