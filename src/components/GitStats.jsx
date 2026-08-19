import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "./Section.jsx";
import { SOCIALS } from "../data/data.js";

const USERNAME = "tanzeelch19-ts";

// amber theme colors (without #) for github-readme-stats query params
const THEME_COLORS = {
  title: "E8A33D",
  icon: "E8A33D",
  text: "8B93A7",
  bg: "00000000",
};

function StatsCard({ src, alt, loaded, error, onLoad, onError }) {
  return (
    <div className="relative w-full">
      {!loaded && !error && (
        <div className="w-full h-[195px] rounded-md bg-paper dark:bg-ink-700 animate-pulse" />
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`w-full transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0 absolute top-0"
          }`}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </div>
  );
}

export default function GitStats() {
  const [statsState, setStatsState] = useState({ loaded: false, error: false });
  const [streakState, setStreakState] = useState({ loaded: false, error: false });
  const [retryKey, setRetryKey] = useState(0);

  const anyError = statsState.error || streakState.error;

  const handleRetry = () => {
    setStatsState({ loaded: false, error: false });
    setStreakState({ loaded: false, error: false });
    setRetryKey((k) => k + 1);
  };

  return (
    <Section id="github" eyebrow="06" title="GitHub">
      <div className="rounded-lg p-6 glass hover-lift">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <FaGithub size={18} className="text-amber" />
            </div>
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

        {!anyError ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <StatsCard
              key={`stats-${retryKey}`}
              src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=${THEME_COLORS.title}&icon_color=${THEME_COLORS.icon}&text_color=${THEME_COLORS.text}&bg_color=${THEME_COLORS.bg}`}
              alt={`GitHub stats for ${USERNAME}`}
              loaded={statsState.loaded}
              error={statsState.error}
              onLoad={() => setStatsState((s) => ({ ...s, loaded: true }))}
              onError={() => setStatsState({ loaded: false, error: true })}
            />
            <StatsCard
              key={`streak-${retryKey}`}
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=transparent&hide_border=true&background=${THEME_COLORS.bg}&ring=${THEME_COLORS.title}&fire=${THEME_COLORS.title}&currStreakLabel=${THEME_COLORS.title}&sideLabels=${THEME_COLORS.text}&currStreakNum=${THEME_COLORS.text}&sideNums=${THEME_COLORS.text}&dates=${THEME_COLORS.text}`}
              alt={`GitHub streak stats for ${USERNAME}`}
              loaded={streakState.loaded}
              error={streakState.error}
              onLoad={() => setStreakState((s) => ({ ...s, loaded: true }))}
              onError={() => setStreakState({ loaded: false, error: true })}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-3 py-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              GitHub stats are unavailable right now — visit the profile
              directly above.
            </p>
            <button
              onClick={handleRetry}
              className="font-mono text-xs px-3 py-2 rounded-md flex items-center gap-1.5 border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber hover:text-amber transition-colors"
            >
              <RefreshCw size={13} /> Retry
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}