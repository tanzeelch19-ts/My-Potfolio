import { Mail, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SOCIALS } from "../data/data.js";

export default function Footer() {
  return (
    <footer className="mt-12 py-8 px-4 border-t border-paper-line dark:border-ink-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-semibold flex items-center gap-2 text-ink-900 dark:text-paper">
          <Terminal size={16} className="text-amber" /> Ch Tanzeel
        </span>
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">
            <FaGithub size={17} />
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">
            <FaLinkedin size={17} />
          </a>
          <a href={`mailto:${SOCIALS.email}`} className="hover:text-amber transition-colors">
            <Mail size={17} />
          </a>
        </div>
        <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ch Tanzeel. Built with React &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}