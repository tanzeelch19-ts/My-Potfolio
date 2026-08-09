import Reveal from '../hooks/Reveal';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact() {
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

          <Reveal as="a" className="inline-block">
<a
            href="mailto:tanzeelch19@gmail.com"
            className="font-display text-[26px] sm:text-[36px] md:text-[44px] pb-2 border-b-2 border-border-strong hover:text-primary hover:border-primary transition-colors mb-11 wrap-break-word inline-block"
          >
            tanzeelch19@gmail.com
          </a>
        </Reveal>

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
    </Reveal >
      </div >
    </section >
   
  );
}