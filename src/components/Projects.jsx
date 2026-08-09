import Reveal from '../hooks/Reveal';
import { ExternalIcon, GithubIcon } from './Icons';

const PROJECTS = [
  {
    title: 'E-Commerce Website',
    desc: 'A full-featured e-commerce site with product listings, cart, and checkout flow built using HTML, CSS, and JavaScript.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://e-commerence-code.netlify.app/',
    source: '#',
  },
  {
    title: 'Movie Box',
    desc: 'A movie browsing website where users can search and explore movies, view details, and discover new titles.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://movie-box-code.netlify.app/',
    source: '#',
  },
  {
    title: 'Task Management',
    desc: 'A task management app to create, organize, and track to-dos, helping users stay on top of their daily work.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://task-management-code.netlify.app/',
    source: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-19 py-24 md:py-32 border-t border-border">
      <div className="w-full max-w-280 mx-auto px-6">
        <Reveal className="max-w-155 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
            &lt;projects&gt;
          </div>
          <h2 className="font-display font-semibold text-[28px] md:text-[40px] mb-3">Selected work</h2>
          <p className="text-ink-muted text-[17px]">A few things I've built recently. Swap these for your own.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <Reveal
              key={p.title}
              className="flex flex-col p-7 rounded-2xl border border-border bg-surface hover:border-border-strong hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="font-mono text-xs text-ink-dim mb-4">project.tsx</div>
              <h3 className="font-display text-xl mb-2.5">{p.title}</h3>
              <p className="text-ink-muted text-[15px] mb-5 grow">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full border border-border bg-primary/5 text-ink-muted font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-5 font-mono text-xs border-t border-border pt-4">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-ink-muted hover:text-primary transition-colors"
                >
                  <ExternalIcon /> Live demo
                </a>
                <a
                  href={p.source}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-ink-muted hover:text-primary transition-colors"
                >
                  <GithubIcon /> Source
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}