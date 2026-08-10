import Reveal from './Reveal';

const FACTS = [
  ['role', 'Frontend Developer'],
  ['based_in', 'Remote / UTC+5'],
  ['email', 'tanzeelch19@gmail.com'],
  ['phone', '0304-7844144'],
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-19 py-24 md:py-32 border-t border-border">
      <div className="w-full max-w-280 mx-auto px-6">
        <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
          &lt;about&gt;
        </div>

        <Reveal as="h2" className="font-display font-semibold text-[28px] md:text-[40px] mb-12 md:mb-16">
          A bit about me
        </Reveal>

        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20 items-start">
          {/* Replace with: <img src="/your-photo.jpg" className="w-full h-full object-cover rounded-3xl" /> */}
          <Reveal className="term-window group relative w-55 md:w-full shadow-glow transition-transform duration-500 hover:-translate-y-1 hover:shadow-glow-strong">
            <div className="term-window__bar">
              <span className="term-dot" style={{ background: '#f87171' }} />
              <span className="term-dot" style={{ background: '#fbbf24' }} />
              <span className="term-dot" style={{ background: '#6ee7b7' }} />
              <span className="ml-auto font-mono text-[10px] text-ink-dim">about.tsx</span>
            </div>
            <div className="relative aspect-square bg-linear-to-br from-surface to-bg-alt overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
              <div className="pointer-events-none absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-primary/10 blur-2xl" />

              <div className="relative w-full h-full flex items-center justify-center">
                <span className="font-display font-semibold text-7xl md:text-8xl text-primary/90 tracking-tight -rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                  CT
                </span>
              </div>

              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-dim tracking-widest">
                <span className="status-pulse" /> AVAILABLE
              </span>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-ink text-[18px] md:text-[19px] leading-relaxed mb-5">
              I'm <span className="text-primary font-medium">Ch Tanzeel</span>, a frontend
              developer who enjoys turning ideas into clean, functional
              interfaces. I focus on writing solid HTML, CSS, and JavaScript,
              and building things with React that are simple to use and easy
              to maintain.
            </p>
            <p className="text-ink-muted text-[17px] leading-relaxed mb-10">
              I'm always working on new projects to sharpen my skills and
              build a portfolio of real, usable web experiences.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FACTS.map(([label, value]) => (
                <li
                  key={label}
                  className="rounded-xl border border-border bg-surface/40 px-4 py-3 font-mono text-sm hover:border-primary/40 transition-colors"
                >
                  <span className="block text-primary text-xs mb-1">{label}</span>
                  <span className="text-ink-muted wrap-break-word">{value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}