import { useState } from 'react';
import Reveal from './Reveal';
import { GithubIcon, LinkedinIcon, CopyIcon, CheckIcon } from './Icons';

const EMAIL = 'tanzeelch19@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the mailto link still works as a fallback.
    }
  };

  return (
    <section id="contact" className="scroll-mt-19 py-24 md:py-32 border-t border-border bg-bg-alt">
      <div className="w-full max-w-160 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
          &lt;contact&gt;
        </div>

        <Reveal as="h2" className="font-display font-semibold text-[28px] md:text-[40px] mb-4">
          Let's build something
        </Reveal>

        <Reveal as="p" className="text-ink-muted text-[17px] max-w-115 mx-auto mb-10">
          Have a project in mind or just want to say hi? My inbox is open.
        </Reveal>

        <Reveal as="div" className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-[26px] sm:text-[36px] md:text-[44px] pb-2 border-b-2 border-border-strong hover:text-primary hover:border-primary transition-colors wrap-break-word inline-block"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy email address"
            className="w-9 h-9 shrink-0 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-primary hover:text-primary transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {copied ? <CheckIcon className="w-3.5 h-3.5 text-primary" /> : <CopyIcon />}
          </button>
        </Reveal>

        <p
          className={`font-mono text-xs text-primary h-4 mt-3 mb-8 transition-opacity duration-200 ${
            copied ? 'opacity-100' : 'opacity-0'
          }`}
          role="status"
        >
          $ copied to clipboard ✓
        </p>

        <Reveal className="flex justify-center gap-5 mt-11">
          <a
            href="#"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
          >
            <GithubIcon className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ch-tanzeel"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
          >
            <LinkedinIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}