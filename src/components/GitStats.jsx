import { useState, useCallback } from "react";
import { ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "./Section.jsx";
import { SOCIALS } from "../data/data.js";

const USERNAME = "tanzeelch19-ts";

// amber theme colors (without #) for github-readme-stats query params
const THEME = {
  title: "E8A33D",
  icon: "E8A33D",
  text: "8B93A7",
  bg: "00000000",
};
const CARDS = [
  {
    key: "stats",
    alt: `GitHub stats for ${USERNAME}`,
    src: (retry) =>
      `https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=${THEME.title}&icon_color=${THEME.icon}&text_color=${THEME.text}&bg_color=${THEME.bg}&r=${retry}`,
    span: "sm:col-span-1",
  },
  {
    key: "streak",
    alt: `GitHub streak stats for ${USERNAME}`,
    src: (retry) =>
      `https://streak-stats.demolab.com/?user=${USERNAME}&theme=transparent&hide_border=true&background=${THEME.bg}&ring=${THEME.title}&fire=${THEME.title}&currStreakLabel=${THEME.title}&sideLabels=${THEME.text}&currStreakNum=${THEME.text}&sideNums=${THEME.text}&dates=${THEME.text}&r=${retry}`,
    span: "sm:col-span-1",
  },
  {
    key: "langs",
    alt: `Top languages for ${USERNAME}`,
    src: (retry) =>
      `https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=${THEME.title}&text_color=${THEME.text}&bg_color=${THEME.bg}&r=${retry}`,
    span: "sm:col-span-2",
  },
];
function StatsCard({ card, retry }) {
  const [status, setStatus] = useState("loading"); // loading | loaded | error

  return (
    <div className={`relative w-full ${card.span}`}>
      {status === "loading" && (
        <div className="w-full h-[195px] rounded-md bg-paper dark:bg-ink-700 animate-pulse" />
      )}

      {status === "error" && (
        <div className="w-full h-[195px] rounded-md border border-paper-line dark:border-ink-line flex flex-col items-center justify-center gap-2 text-center px-4">
          <AlertCircle size={18} className="text-gray-400" />
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Couldn't load {card.key}
          </p>
        </div>
      )}

      <img
        key={retry}
        src={card.src(retry)}
        alt={card.alt}
        loading="lazy"
        className={`w-full rounded-md transition-opacity duration-300 ${
          status === "loaded" ? "opacity-100" : "opacity-0 absolute top-0 pointer-events-none"
        }`}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}

export default function GitStats() {
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = useCallback(() => {
    setRetryKey((k) => k + 1);
  }, []);

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

          <div className="flex items-center gap-2">
            <button
              onClick={handleRetry}
              title="Refresh stats"
              className="font-mono text-xs w-9 h-9 rounded-md flex items-center justify-center border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber hover:text-amber transition-colors"
            >
              <RefreshCw size={13} />
            </button>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-3 py-2 rounded-md flex items-center gap-1.5 bg-amber text-ink-900 hover:bg-amber-bright transition-colors"
            >
              View Profile <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {CARDS.map((card) => (
            <StatsCard key={card.key} card={card} retry={retryKey} />
          ))}
        </div>
      </div>
    </Section>
  );
}