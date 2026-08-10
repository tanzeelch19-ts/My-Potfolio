import { ArrowUpIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-border py-8">
      <div className="w-full max-w-280 mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
        <div className="font-mono text-sm text-ink-dim">
          Ch Tanzeel<span className="text-primary">.</span>
        </div>
        <div className="flex items-center gap-5 font-mono text-[13px] text-ink-dim">
          <span>© {year} Ch Tanzeel</span>
          <button
            aria-label="Back to top"
            onClick={scrollToTop}
            className="w-8.5 h-8.5 rounded-full border border-border text-ink-muted flex items-center justify-center hover:border-primary hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}