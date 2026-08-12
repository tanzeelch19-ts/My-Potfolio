import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { PROJECTS, ALL_TAGS } from "../data/data.js";

const MAX_VISIBLE_TAGS = 4;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tech.includes(activeFilter));

  const tagCounts = ALL_TAGS.reduce((acc, tag) => {
    acc[tag] =
      tag === "All"
        ? PROJECTS.length
        : PROJECTS.filter((p) => p.tech.includes(tag)).length;
    return acc;
  }, {});

  return (
    <Section id="projects" eyebrow="03" title="Projects">
      <div className="flex flex-wrap gap-2 mb-8">
        {ALL_TAGS.map((tag) => {
          const active = activeFilter === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                active
                  ? "bg-amber text-ink-900 border-amber"
                  : "text-gray-500 dark:text-gray-400 border-paper-line dark:border-ink-line hover:border-amber hover:text-amber"
              }`}
            >
              {tag}
              <span
                className={`text-[10px] ${
                  active ? "opacity-70" : "opacity-50"
                }`}
              >
                {tagCounts[tag]}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400 py-12 text-center">
          No projects tagged "{activeFilter}" yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <div className="group relative rounded-lg overflow-hidden h-full flex flex-col bg-paper-surface dark:bg-ink-800 border border-paper-line dark:border-ink-line transition-all duration-300 hover:-translate-y-4 hover:shadow-xl hover:border-amber/60">
                {/* signature top accent, fades in on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10" />

                {/* browser chrome */}
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-paper-line dark:border-ink-line">
                  <span className="w-2 h-2 rounded-full bg-[#EF6A5F]" />
                  <span className="w-2 h-2 rounded-full bg-[#F5BD4F]" />
                  <span className="w-2 h-2 rounded-full bg-[#61C454]" />
                  <span className="font-mono text-xs ml-2 truncate text-gray-500 dark:text-gray-400">
                    {p.demo.replace("https://", "")}
                  </span>
                </div>

                {/* preview - no independent hover effect, moves with the card */}
                <div className="h-40 overflow-hidden bg-paper dark:bg-ink-700">
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='160'%3E%3Crect width='400' height='160' fill='%231B2233'/%3E%3Ctext x='50%25' y='50%25' fill='%238B93A7' font-family='monospace' font-size='14' text-anchor='middle' dominant-baseline='middle'%3Eimage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg text-ink-900 dark:text-paper transition-colors group-hover:text-amber">
                    {p.name}
                  </h3>
                  <p className="text-sm mt-2 flex-1 text-gray-600 dark:text-gray-400">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.slice(0, MAX_VISIBLE_TAGS).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-1 rounded bg-paper dark:bg-ink-700 text-amber"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > MAX_VISIBLE_TAGS && (
                      <span className="font-mono text-xs px-2 py-1 rounded bg-paper dark:bg-ink-700 text-gray-500 dark:text-gray-400">
                        +{p.tech.length - MAX_VISIBLE_TAGS}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-5">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-3 py-2 rounded-md flex items-center gap-1.5 border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber hover:text-amber transition-colors"
                    >
                      <FaGithub size={14} /> GitHub
                    </a>
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-3 py-2 rounded-md flex items-center gap-1.5 bg-amber text-ink-900 hover:bg-amber-bright transition-colors"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}