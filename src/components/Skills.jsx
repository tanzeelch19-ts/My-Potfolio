import Reveal from './Reveal';

const CATEGORIES = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Framer Motion'],
  },
  { title: 'Tools & Platforms', items: ['Git', 'Figma', 'Vite', 'Docker', 'Vercel'] },
];

export default function Skills({ activeSkill = null, onSelectSkill = () => {} }) {
  return (
    <section id="skills" className="scroll-mt-19 py-24 md:py-32 border-t border-border bg-bg-alt">
      <div className="w-full max-w-280 mx-auto px-6">
        <Reveal className="max-w-155 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
            &lt;skills&gt;
          </div>
          <h2 className="font-display font-semibold text-[28px] md:text-[40px] mb-3">Toolbox</h2>
          <p className="text-ink-muted text-[17px]">
            What I reach for most, day to day. Tap one to see it in action below.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Reveal
              key={cat.title}
              as="div"
              delay={i * 100}
              className="p-7 rounded-2xl border border-border bg-surface hover:border-border-strong hover:-translate-y-1 transition-transform"
            >
              <h3 className="font-display text-[17px] mb-4">{cat.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const isActive = activeSkill === item;
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onSelectSkill(item)}
                        className={`px-3.5 py-1.5 rounded-full border font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                          isActive
                            ? 'border-primary bg-primary/10 text-primary shadow-glow'
                            : 'border-border bg-primary/5 text-ink-muted hover:border-primary/40 hover:text-ink'
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        {activeSkill && (
          <p className="font-mono text-xs text-ink-dim mt-6">
            Filtering projects by{' '}
            <span className="text-primary">{activeSkill}</span> — tap it again to clear.
          </p>
        )}
      </div>
    </section>
  );
}