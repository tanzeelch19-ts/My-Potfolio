import { Mail, Terminal, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SOCIALS } from "../data/data.js";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-12 py-8 px-4 border-t border-paper-line dark:border-ink-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={scrollToTop}
          className="group font-display font-semibold flex items-center gap-2 text-ink-900 dark:text-paper"
        >
          <span className="w-8 h-8 rounded-md bg-amber/10 flex items-center justify-center transition-colors group-hover:bg-amber/20">
            <Terminal size={15} className="text-amber" />
          </span>
          <span className="transition-colors group-hover:text-amber">
            Ch Tanzeel
          </span>
        </button>

        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-md border border-paper-line dark:border-ink-line hover:border-amber hover:text-amber transition-colors"
          >
            <FaGithub size={16} />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-md border border-paper-line dark:border-ink-line hover:border-amber hover:text-amber transition-colors"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href={`mailto:${SOCIALS.email}`}
            aria-label="Email"
            className="p-2 rounded-md border border-paper-line dark:border-ink-line hover:border-amber hover:text-amber transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ch Tanzeel. Built with React &amp; Tailwind.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-md border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber hover:text-amber transition-colors"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}