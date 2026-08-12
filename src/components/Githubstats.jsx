import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "./Section.jsx";
import { SOCIALS } from "../data.js";

const USERNAME = "tanzeelch19-ts";

export default function GithubStats() {
  const [statsError, setStatsError] = useState(false);

  return (
    <Section id="github" eyebrow="06" title="GitHub">
      <div className="rounded-lg p-6 glass hover-lift">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-3">
            <FaGithub size={22} className="text-amber" />
            <span className="font-mono text-sm text-ink-900 dark:text-paper">
              @{USERNAME}
            </span>
          </div>
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-2 rounded-md flex items-center gap-1.5 bg-amber text-ink-900 hover:bg-amber-bright transition-colors"
          >
            View Profile <ExternalLink size={14} />
          </a>
        </div>

        {!statsError ? (
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=8B5CF6&icon_color=8B5CF6&text_color=8B93A7`}
            alt={`GitHub stats for ${USERNAME}`}
            className="w-full max-w-md"
            onError={() => setStatsError(true)}
          />
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            GitHub stats are loading slowly or unavailable right now — visit
            the profile directly above.
          </p>
        )}
      </div>
    </Section>
  );
}