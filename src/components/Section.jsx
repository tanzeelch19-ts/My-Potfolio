import Reveal from "./Reveal.jsx";

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-16 md:py-20">
      <Reveal>
        <div className="flex items-baseline gap-3 mb-8">
          <span className="font-mono text-sm text-amber dark:text-amber-bright">
            {eyebrow}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900 dark:text-paper">
            {title}
          </h2>
          <span className="flex-1 h-px bg-paper-line dark:bg-ink-line" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}