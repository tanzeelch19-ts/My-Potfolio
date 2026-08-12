import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

const CARDS = [
  {
    title: "Who I am",
    body: "Frontend developer focused on building clean, responsive interfaces with React. I care about usable UI, readable code, and shipping things that actually work for the people using them.",
  },
  {
    title: "Currently learning",
    body: "Deepening my React and Vite workflow, advanced Tailwind patterns, and working with REST APIs in real projects.",
  },
  {
    title: "Goals",
    body: "Take on freelance and client projects, contribute to open source, and grow into a strong full-stack developer.",
  },
];

export default function About() {
  return (
    <Section id="about" eyebrow="01" title="About">
      <div className="grid md:grid-cols-3 gap-4">
        {CARDS.map((c) => (
          <Reveal key={c.title}>
            <div className="rounded-lg p-5 h-full glass shadow-md">
              <h3 className="font-mono text-sm mb-2 text-amber">{c.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}