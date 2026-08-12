import { useState } from "react";
import { Menu, X, Sun, Moon, Terminal } from "lucide-react";
import { NAV_LINKS } from "../data/data.js";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass">
      {/* traffic-light strip */}
      <div className="flex items-center gap-1.5 px-4 pt-2" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF6A5F]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F5BD4F]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#61C454]" />
        <span className="font-mono text-xs ml-3 text-gray-500 dark:text-gray-400">
          tanzeel.dev
        </span>
      </div>

      <nav className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <button
          onClick={() => scrollTo("home")}
          className="group font-display font-semibold text-lg flex items-center gap-2 text-ink-900 dark:text-paper"
        >
          <span className="w-8 h-8 rounded-md bg-amber/10 flex items-center justify-center transition-colors group-hover:bg-amber/20">
            <Terminal size={16} className="text-amber" />
          </span>
          <span className="transition-colors group-hover:text-amber">
            Ch Tanzeel
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="font-mono text-sm px-3 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-amber dark:hover:text-amber-bright transition-colors relative group"
              >
                {link.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-amber scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-paper-line dark:border-ink-line text-amber hover:border-amber transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1 border-t border-paper-line dark:border-ink-line">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-mono text-sm py-2.5 text-left text-gray-500 dark:text-gray-400 hover:text-amber transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}