import Reveal from './Reveal';

const LOG = [
  { hash: 'a3f9c2e', title: 'Started freelance frontend work', tag: 'HEAD' },
  { hash: '7b1d4aa', title: 'Shipped Task Management app' },
  { hash: 'e88c015', title: 'Shipped Movie Box' },
  { hash: '4f0a9d3', title: 'Shipped E-Commerce Website' },
  { hash: '10a2b3c', title: 'Began learning React' },
];

export default function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-19 py-24 md:py-32 border-t border-border">
      <div className="w-full max-w-280 mx-auto px-6">
        <Reveal className="max-w-155 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
            &lt;log&gt;
          </div>
          <h2 className="font-display font-semibold text-[28px] md:text-[40px] mb-3">git log --oneline</h2>
          <p className="text-ink-muted text-[17px]">A quick history of how I got here.</p>
        </Reveal>

        <div className="timeline-rail max-w-160 pl-6 flex flex-col gap-7">
          {LOG.map((entry, i) => (
            <Reveal key={entry.hash} className="timeline-node relative" delay={i * 90}>
              <p className="font-mono text-xs text-ink-dim mb-1">
                <span className="text-primary">{entry.hash}</span>
                {entry.tag && (
                  <span className="ml-2 px-2 py-0.5 rounded-full border border-primary/40 text-primary">
                    {entry.tag}
                  </span>
                )}
              </p>
              <p className="text-ink text-[16px]">{entry.title}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}