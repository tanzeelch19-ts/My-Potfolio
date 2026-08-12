import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SOCIALS } from "../data/data.js";

const FULL_NAME = "Ch Tanzeel";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) clearInterval(t);
    }, 90);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="home"
      className="max-w-6xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32"
    >
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        className="spotlight rounded-xl p-6 md:p-10 glass shadow-xl"
      >
        <p className="font-mono text-sm mb-4 text-gray-500 dark:text-gray-400 relative z-10">
          <span className="text-amber">~/portfolio</span> $ whoami
        </p>
        <h2 className="font-mono text-lg md:text-xl font-medium text-ink-900 dark:text-paper relative z-10">
          {typed}
          <span className="text-amber animate-blink">_</span>
        </h2>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mt-2 text-amber relative z-10">
          Frontend Developer / React Developer
        </h1>
        <p className="max-w-2xl mt-5 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 relative z-10">
          I build clean, responsive web interfaces with React and modern
          tooling — turning ideas into fast, usable products from Bahawalpur,
          Pakistan.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-8 relative z-10">
          <button
            onClick={() => scrollTo("projects")}
            className="px-5 py-2.5 rounded-md font-medium bg-amber text-ink-900 hover:bg-amber-bright hover:shadow-[0_0_25px_-5px_rgba(232,163,61,0.6)] transition-all"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2.5 rounded-md font-medium border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber transition-colors"
          >
            Contact Me
          </button>
          <div className="flex items-center gap-3 ml-1">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-md border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:text-amber hover:border-amber transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-md border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:text-amber hover:border-amber transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}