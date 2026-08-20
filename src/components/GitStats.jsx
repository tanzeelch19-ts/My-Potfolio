import { useState, useCallback, useEffect, useMemo } from "react";
import { ExternalLink, RefreshCw, AlertTriangle, Star, GitFork, Users, BookMarked } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "./Section.jsx";
import { SOCIALS } from "../data/data.js";

const USERNAME = "tanzeelch19-ts";

// amber theme colors (without #) for the streak embed's query params
const THEME = {
  title: "E8A33D",
  text: "8B93A7",
  bg: "00000000",
};

// Small color map for common languages; falls back to amber for anything unlisted.
const LANG_COLORS = {
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Python: "#3572A5",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  Shell: "#89E051",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Vue: "#41B883",
  Dart: "#00B4AB",
};
const langColor = (lang) => LANG_COLORS[lang] || "#E8A33D";

function useGitHubData(username, retryKey) {
  const [state, setState] = useState({ status: "loading", user: null, repos: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", user: null, repos: null });

    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, {
            signal: controller.signal,
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");

        const user = await userRes.json();
        const repos = await reposRes.json();

        setState({ status: "loaded", user, repos: Array.isArray(repos) ? repos : [] });
      } catch (err) {
        if (err.name !== "AbortError") {
          setState({ status: "error", user: null, repos: null });
        }
      }
    })();

    return () => controller.abort();
  }, [username, retryKey]);

  return state;
}

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-paper-line dark:border-ink-line px-3.5 py-3">
      <Icon size={15} className="text-amber shrink-0" />
      <div className="flex flex-col leading-tight">
        <span className="font-mono text-base font-semibold text-ink-900 dark:text-paper">
          {value}
        </span>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">{label}</span>
      </div>
    </div>
  );
}

function CardShell({ label, status, errorLabel, children }) {
  return (
    <div className="w-full">
      <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
        {label}
      </span>
      <div className="relative w-full min-h-[195px] rounded-md border border-paper-line dark:border-ink-line overflow-hidden p-4">
        {status === "loading" && (
          <div className="absolute inset-0 bg-paper dark:bg-ink-700 animate-pulse" />
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4 bg-paper dark:bg-ink-800">
            <AlertTriangle size={16} className="text-amber/70" />
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{errorLabel}</p>
            <p className="text-[11px] text-gray-500/70 dark:text-gray-500 max-w-[220px]">
              Couldn't reach the GitHub API. Try refreshing.
            </p>
          </div>
        )}
        {status === "loaded" && children}
      </div>
    </div>
  );
}

function OverviewCard({ user, repos }) {
  const totalStars = useMemo(
    () => (repos || []).reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
    [repos]
  );
  const totalForks = useMemo(
    () => (repos || []).reduce((sum, r) => sum + (r.forks_count || 0), 0),
    [repos]
  );

  return (
    <div className="grid grid-cols-2 gap-2.5">
      <StatPill icon={BookMarked} label="Public repos" value={user?.public_repos ?? 0} />
      <StatPill icon={Users} label="Followers" value={user?.followers ?? 0} />
      <StatPill icon={Star} label="Total stars" value={totalStars} />
      <StatPill icon={GitFork} label="Total forks" value={totalForks} />
    </div>
  );
}

function TopLanguagesCard({ repos }) {
  const languages = useMemo(() => {
    const counts = {};
    (repos || []).forEach((r) => {
      if (!r.language || r.fork) return;
      counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 6);
  }, [repos]);

  if (languages.length === 0) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
        No language data available yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-paper dark:bg-ink-700">
        {languages.map((l) => (
          <div
            key={l.name}
            style={{ width: `${l.pct}%`, backgroundColor: langColor(l.name) }}
            title={`${l.name} — ${l.pct}%`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
        {languages.map((l) => (
          <div key={l.name} className="flex items-center gap-2 text-xs font-mono">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: langColor(l.name) }}
            />
            <span className="text-ink-900 dark:text-paper truncate">{l.name}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-auto">{l.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StreakCard({ retry }) {
  const [status, setStatus] = useState("loading");
  return (
    <div className="w-full">
      <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
        Streak
      </span>
      <div className="relative w-full min-h-[195px] rounded-md border border-paper-line dark:border-ink-line overflow-hidden">
        {status === "loading" && (
          <div className="absolute inset-0 bg-paper dark:bg-ink-700 animate-pulse" />
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
            <AlertTriangle size={16} className="text-amber/70" />
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Streak unavailable</p>
            <p className="text-[11px] text-gray-500/70 dark:text-gray-500 max-w-[220px]">
              The stats service is temporarily down. Try refreshing.
            </p>
          </div>
        )}
        <img
          key={retry}
          src={`https://streak-stats.demolab.com/?user=${USERNAME}&theme=transparent&hide_border=true&background=${THEME.bg}&ring=${THEME.title}&fire=${THEME.title}&currStreakLabel=${THEME.title}&sideLabels=${THEME.text}&currStreakNum=${THEME.text}&sideNums=${THEME.text}&dates=${THEME.text}&r=${retry}`}
          alt={`GitHub streak stats for ${USERNAME}`}
          loading="lazy"
          className={`w-full transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      </div>
    </div>
  );
}

export default function GitStats() {
  const [retryKey, setRetryKey] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const { status, user, repos } = useGitHubData(USERNAME, retryKey);

  useEffect(() => {
    if (status !== "loading") setIsRetrying(false);
  }, [status]);

  const handleRetry = useCallback(() => {
    setIsRetrying(true);
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
            <div className="flex flex-col">
              <span className="font-mono text-sm text-ink-900 dark:text-paper">
                @{USERNAME}
              </span>
              {status === "error" && (
                <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
                  Stats currently unavailable
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRetry}
              title="Refresh stats"
              aria-label="Refresh stats"
              disabled={isRetrying}
              className="font-mono text-xs w-9 h-9 rounded-md flex items-center justify-center border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber hover:text-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={13} className={isRetrying ? "animate-spin" : ""} />
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
          <CardShell label="Overview" status={status} errorLabel="Overview unavailable">
            <OverviewCard user={user} repos={repos} />
          </CardShell>

          <StreakCard retry={retryKey} />

          <div className="sm:col-span-2">
            <CardShell label="Top languages" status={status} errorLabel="Top languages unavailable">
              <TopLanguagesCard repos={repos} />
            </CardShell>
          </div>
        </div>
      </div>
    </Section>
  );
}