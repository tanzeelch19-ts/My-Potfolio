import { useState } from 'react';
import Reveal from './Reveal';
import { ChevronIcon, CopyIcon, CheckIcon } from './Icons';

const LOG = [
  {
    hash: 'a3f9c2e91d',
    title: 'Started freelance frontend work',
    tag: 'HEAD',
    desc: 'Began taking on freelance builds — first client-facing work outside of practice projects.',
    stats: '2 files changed, 64 insertions(+)',
    tags: ['Freelance'],
  },
  {
    hash: '7b1d4aa02f',
    title: 'Shipped Task Management app',
    desc: 'Built and deployed a full task manager — create, organize, and track to-dos end to end.',
    stats: '18 files changed, 812 insertions(+), 40 deletions(-)',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    hash: 'e88c015bd3',
    title: 'Shipped Movie Box',
    desc: 'Launched a movie browsing app with search, details, and discovery flows.',
    stats: '14 files changed, 640 insertions(+), 22 deletions(-)',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    hash: '4f0a9d371c',
    title: 'Shipped E-Commerce Website',
    desc: 'Built a full storefront — product listings, cart, and a working checkout flow.',
    stats: '21 files changed, 950 insertions(+), 18 deletions(-)',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    hash: '10a2b3c8f4',
    title: 'Began learning React',
    desc: 'Swapped plain DOM manipulation for components, props, and hooks.',
    stats: '1 file changed, 20 insertions(+)',
    tags: ['React'],
  },
];

function LogEntry({ entry, delay, isOpen, onToggle }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(entry.hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — this is a nice-to-have, fail silently.
    }
  };

  return (
    <Reveal className="timeline-node relative" delay={delay}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left group rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <p className="font-mono text-xs text-ink-dim mb-1 flex items-center gap-2">
          <span className="text-primary">{entry.hash.slice(0, 7)}</span>
          {entry.tag && (
            <span className="px-2 py-0.5 rounded-full border border-primary/40 text-primary">
              {entry.tag}
            </span>
          )}
          <ChevronIcon
            className={`w-3 h-3 text-ink-dim transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
        </p>
        <p className="text-ink text-[16px] group-hover:text-primary transition-colors">
          {entry.title}
        </p>
      </button>

      <div
        style={{ display: 'grid' }}
        className={`transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl border border-border bg-surface/40 p-4">
            <p className="text-ink-muted text-sm mb-3">{entry.desc}</p>
            <p className="font-mono text-xs text-primary mb-3">{entry.stats}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {entry.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full border border-border bg-primary/5 text-ink-muted font-mono text-[11px]"
                >
                  {t}
                </span>
              ))}
              <button
                type="button"
                onClick={handleCopy}
                className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border text-ink-dim hover:border-primary/40 hover:text-primary font-mono text-[11px] transition-colors"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3 h-3" /> copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3 h-3" /> {entry.hash}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Timeline() {
  const [openHash, setOpenHash] = useState(LOG[0].hash);

  const toggle = (hash) => {
    setOpenHash((current) => (current === hash ? null : hash));
  };

  return (
    <section id="timeline" className="scroll-mt-19 py-24 md:py-32 border-t border-border">
      <div className="w-full max-w-280 mx-auto px-6">
        <Reveal className="max-w-155 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
            &lt;log&gt;
          </div>
          <h2 className="font-display font-semibold text-[28px] md:text-[40px] mb-3">git log --oneline</h2>
          <p className="text-ink-muted text-[17px]">
            A quick history of how I got here. Tap a commit for the full diff.
          </p>
        </Reveal>

        <p className="font-mono text-xs text-ink-dim mb-6">
          on branch <span className="text-primary">main</span> · {LOG.length} commits
        </p>

        <div className="timeline-rail max-w-160 pl-6 flex flex-col gap-7">
          {LOG.map((entry, i) => (
            <LogEntry
              key={entry.hash}
              entry={entry}
              delay={i * 90}
              isOpen={openHash === entry.hash}
              onToggle={() => toggle(entry.hash)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}