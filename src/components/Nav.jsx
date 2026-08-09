import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-19 flex items-center z-50 bg-bg/70 backdrop-blur-md border-b border-border">
     <div className="w-full max-w-280 mx-auto px-6 flex items-center justify-between">
  <a href="#home" className="font-display font-semibold text-[21px] tracking-tight">
    Ch Tanzeel<span className="text-primary">.</span>
  </a>

        <ul
          className={`${open ? 'flex' : 'hidden'} flex-col gap-6 absolute top-19 left-0 right-0 bg-bg/95 backdrop-blur-md border-b border-border p-6 z-40 md:static md:flex md:flex-row md:items-center md:gap-9 md:p-0 md:bg-transparent md:border-none font-mono text-sm`}
        >
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`transition-colors hover:text-ink ${
                  active === link.id ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.25 p-2"
        >
          <span className="w-5.5 h-0.5 bg-ink" />
          <span className="w-5.5 h-0.5 bg-ink" />
          <span className="w-5.5 h-0.5 bg-ink" />
        </button>
      </div>
    </nav>
  );
}