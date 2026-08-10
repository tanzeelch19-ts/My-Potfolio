import Reveal from './Reveal';
import { ExternalIcon, GithubIcon, CartIcon, FilmIcon, ChecklistIcon } from './Icons';

const PROJECTS = [
  {
    title: 'E-Commerce Website',
    desc: 'A full-featured e-commerce site with product listings, cart, and checkout flow built using HTML, CSS, and JavaScript.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://e-commerence-code.netlify.app/',
    source: '#',
    icon: CartIcon,
    preview: 'preview-a',
  },
  {
    title: 'Movie Box',
    desc: 'A movie browsing website where users can search and explore movies, view details, and discover new titles.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://movie-box-code.netlify.app/',
    source: '#',
    icon: FilmIcon,
    preview: 'preview-b',
  },
  {
    title: 'Task Management',
    desc: 'A task management app to create, organize, and track to-dos, helping users stay on top of their daily work.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://task-management-code.netlify.app/',
    source: '#',
    icon: ChecklistIcon,
    preview: 'preview-c',
  },
];

function hostFromUrl(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return 'localhost';
  }
}

function ProjectCard({ project, dimmed, highlighted, delay }) {
  const Icon = project.icon;

  return (
    <Reveal
      delay={delay}
      className={`transition-all duration-300 ${dimmed ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}
    >
      <div
        className={`term-window flex flex-col h-full hover:-translate-y-1.5 hover:shadow-card transition-all ${
          highlighted ? 'term-window--active' : 'hover:border-border-strong'
        }`}
      >
        <div className="term-window__bar">
          <span className="term-dot" style={{ background: '#f87171' }} />
          <span className="term-dot" style={{ background: '#fbbf24' }} />
          <span className="term-dot" style={{ background: '#6ee7b7' }} />
          <span className="ml-3 px-2.5 py-0.5 rounded-full bg-bg/60 border border-border font-mono text-[10px] text-ink-dim truncate">
            {hostFromUrl(project.live)}
          </span>
        </div>

        <a href={project.live} target="_blank" rel="noopener" className={`project-preview ${project.preview}`}>
          <Icon className="w-12 h-12 preview-icon" />
        </a>

        <div className="flex flex-col grow p-7">
          <h3 className="font-display text-xl mb-2.5">{project.title}</h3>
          <p className="text-ink-muted text-[15px] mb-5 grow">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.map((tech) => (
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
              href={project.live}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-primary transition-colors"
            >
              <ExternalIcon /> Live demo
            </a>
            <a
              href={project.source}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-primary transition-colors"
            >
              <GithubIcon /> Source
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects({ activeSkill = null }) {
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

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              delay={i * 90}
              dimmed={Boolean(activeSkill) && !p.stack.includes(activeSkill)}
              highlighted={Boolean(activeSkill) && p.stack.includes(activeSkill)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}