
import Reveal from '../hooks/Reveal';
const CATEGORIES = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', ] },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Framer Motion'],
  },
  { title: 'Tools & Platforms', items: ['Git', 'Figma', 'Vite', 'Docker', 'Vercel'] },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-19 py-24 md:py-32 border-t border-border bg-bg-alt">
      <div className="w-full max-w-280 mx-auto px-6">
        <Reveal className="max-w-155 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
            &lt;skills&gt;
          </div>
          <h2 className="font-display font-semibold text-[28px] md:text-[40px] mb-3">Toolbox</h2>
          <p className="text-ink-muted text-[17px]">What I reach for most, day to day.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Reveal
              key={cat.title}
              as="div"
              className="p-7 rounded-2xl border border-border bg-surface hover:border-border-strong hover:-translate-y-1"
            >
              <h3 className="font-display text-[17px] mb-4">{cat.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="px-3.5 py-1.5 rounded-full border border-border bg-primary/5 text-ink-muted font-mono text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}