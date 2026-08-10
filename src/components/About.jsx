import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { RefreshIcon } from './Icons';

const FACTS = [
  ['role', 'Frontend Developer'],
  ['based_in', 'Remote / UTC+5'],
  ['email', 'tanzeelch19@gmail.com'],
  ['phone', '0304-7844144'],
];

// Section ids the fake "cd" command can jump to.
const SECTION_MAP = {
  home: 'home',
  about: 'about',
  skills: 'skills',
  timeline: 'timeline',
  log: 'timeline',
  projects: 'projects',
  contact: 'contact',
};

const HELP_LINES = [
  'whoami             quick intro',
  'cat bio.txt        the longer version',
  'ls                 list sections',
  'cd <section>       jump to a section',
  'cat contact.txt    get in touch',
  'clear              clear the screen',
];

const WHOAMI_LINES = [
  'Ch Tanzeel',
  'Frontend Developer — turning ideas into clean, working interfaces.',
];

const BIO_LINES = [
  "I'm a frontend developer who enjoys turning ideas into clean,",
  'functional interfaces. I focus on writing solid HTML, CSS, and',
  'JavaScript, and building things with React that are simple to',
  'use and easy to maintain.',
  '',
  'Always working on new projects to sharpen my skills and build',
  'a portfolio of real, usable web experiences.',
];

const LS_LINES = ['about/   skills/   timeline/   projects/   contact/'];

const CONTACT_LINES = [
  'email   tanzeelch19@gmail.com',
  'phone   0304-7844144',
  'based   Remote / UTC+5',
];

const BANNER_LINE = 'connected to ct-portfolio — session started. type "help" to explore.';

// The sequence auto-typed on load/replay. Kept to non-navigating commands
// so the page never scrolls away from About on its own.
const INTRO_SEQUENCE = ['whoami', 'cat bio.txt', 'ls'];

const QUICK_COMMANDS = ['whoami', 'cat bio.txt', 'ls', 'cat contact.txt', 'help'];

let lineSeq = 0;
const nextLineId = () => `l${lineSeq++}`;

// Resolves a typed/clicked command to output lines. `onNavigate` is called
// for `cd <section>` so the terminal can double as real in-page navigation.
function resolveCommand(raw, onNavigate) {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();

  if (lower === '') return null;
  if (lower === 'clear') return { clear: true };
  if (lower === 'help') return { lines: HELP_LINES };
  if (lower === 'whoami') return { lines: WHOAMI_LINES };
  if (lower === 'cat bio.txt' || lower === 'cat bio') return { lines: BIO_LINES };
  if (lower === 'ls' || lower === 'ls sections' || lower === 'ls sections/') {
    return { lines: LS_LINES };
  }
  if (lower === 'cat contact.txt' || lower === 'contact') return { lines: CONTACT_LINES };
  if (lower === 'cd' || lower.startsWith('cd ')) {
    const arg = lower.slice(2).trim().replace(/\/$/, '');
    if (!arg) return { lines: ['cd: missing section', "try: ls"] };
    const target = SECTION_MAP[arg];
    if (!target) return { lines: [`cd: no such section: ${arg}`, "try: ls"] };
    onNavigate(target);
    return { lines: [`→ /${arg}`] };
  }
  if (lower === 'date') return { lines: [new Date().toString()] };
  if (lower === 'sudo' || lower.startsWith('sudo ')) {
    return { lines: ['Permission denied: nice try 😄', "you're not root on this machine."] };
  }
  if (lower.startsWith('echo ')) return { lines: [cmd.slice(5)] };

  return { lines: [`command not found: ${cmd}`, "type 'help' to see what's available"] };
}

function Terminal() {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState(null);
  const [introDone, setIntroDone] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const sessionRef = useRef(0);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(0);

  const appendLines = (rawLines, kind) => {
    setLines((prev) => [...prev, ...rawLines.map((text) => ({ id: nextLineId(), kind, text }))]);
  };

  const navigateTo = (id) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const runCommand = (rawCmd) => {
    appendLines([rawCmd], 'cmd');
    const result = resolveCommand(rawCmd, navigateTo);
    if (!result) return;
    if (result.clear) {
      setLines([]);
      return;
    }
    appendLines(result.lines, 'out');
  };

  // Types each queued command character by character, reveals its output,
  // then moves on. Re-runnable (via the replay button) using a session id
  // so an in-flight run can be safely superseded.
  const startIntro = () => {
    sessionRef.current += 1;
    const session = sessionRef.current;

    setLines([{ id: nextLineId(), kind: 'sys', text: BANNER_LINE }]);
    setTyping(null);
    setIntroDone(false);

    const typeText = (text, onComplete) => {
      let i = 0;
      const step = () => {
        if (sessionRef.current !== session) return;
        i += 1;
        setTyping(text.slice(0, i));
        if (i >= text.length) {
          setTimeout(onComplete, 320);
          return;
        }
        setTimeout(step, 34 + Math.random() * 40);
      };
      step();
    };

    const runQueue = (queue) => {
      if (sessionRef.current !== session) return;
      if (queue.length === 0) {
        setTyping(null);
        setIntroDone(true);
        return;
      }
      const [cmd, ...rest] = queue;
      typeText(cmd, () => {
        if (sessionRef.current !== session) return;
        setTyping(null);
        appendLines([cmd], 'cmd');
        const result = resolveCommand(cmd, navigateTo);
        if (result?.lines) appendLines(result.lines, 'out');
        setTimeout(() => runQueue(rest), 600);
      });
    };

    setTimeout(() => runQueue(INTRO_SEQUENCE), 550);
  };

  useEffect(() => {
    startIntro();
    return () => {
      sessionRef.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, typing]);

  useEffect(() => {
    if (introDone && window.innerWidth >= 768) inputRef.current?.focus();
  }, [introDone]);

  const submitCommand = (value) => {
    if (!value.trim()) return;
    historyRef.current.push(value);
    historyIndexRef.current = historyRef.current.length;
    runCommand(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCommand(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndexRef.current > 0) {
        historyIndexRef.current -= 1;
        setInputValue(historyRef.current[historyIndexRef.current] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndexRef.current < historyRef.current.length) {
        historyIndexRef.current += 1;
        setInputValue(historyRef.current[historyIndexRef.current] ?? '');
      }
    }
  };

  const handleQuickCommand = (cmd) => {
    if (!introDone) return;
    historyRef.current.push(cmd);
    historyIndexRef.current = historyRef.current.length;
    runCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="term-window flex flex-col shadow-glow transition-shadow duration-500 hover:shadow-glow-strong">
      <div className="term-window__bar">
        <span className="term-dot" style={{ background: '#f87171' }} />
        <span className="term-dot" style={{ background: '#fbbf24' }} />
        <span className="term-dot" style={{ background: '#6ee7b7' }} />
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Replay intro"
            title="Replay intro"
            onClick={startIntro}
            className="text-ink-dim hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded"
          >
            <RefreshIcon className="w-3 h-3" />
          </button>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ink-dim tracking-widest">
            <span className="status-pulse" /> LIVE SESSION
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="term-scroll h-72 md:h-80 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed cursor-text"
      >
        {lines.map((line) => {
          if (line.kind === 'cmd') {
            return (
              <p key={line.id} className="term-line-in text-ink">
                <span className="text-primary">visitor@ct</span>
                <span className="text-ink-dim">:~$ </span>
                {line.text}
              </p>
            );
          }
          if (line.kind === 'sys') {
            return (
              <p key={line.id} className="term-line-in text-ink-dim italic mb-2">
                {line.text}
              </p>
            );
          }
          return (
            <p key={line.id} className="term-line-in text-ink-muted wrap-break-word">
              {line.text || '\u00A0'}
            </p>
          );
        })}

        {typing !== null && (
          <p className="text-ink">
            <span className="text-primary">visitor@ct</span>
            <span className="text-ink-dim">:~$ </span>
            {typing}
            <span className="inline-block w-1.5 h-3.5 -mb-0.5 ml-0.5 bg-primary animate-blink" />
          </p>
        )}

        {introDone && (
          <form onSubmit={handleSubmit} className="flex items-baseline text-ink">
            <span className="text-primary shrink-0">visitor@ct</span>
            <span className="text-ink-dim shrink-0">:~$&nbsp;</span>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal command input"
              className="flex-1 bg-transparent outline-none text-ink caret-primary min-w-0"
            />
          </form>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3.5">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            disabled={!introDone}
            onClick={() => handleQuickCommand(cmd)}
            className="px-3 py-1.5 rounded-full border border-border bg-primary/5 text-ink-muted font-mono text-[11px] hover:border-primary/40 hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-19 py-24 md:py-32 border-t border-border">
      <div className="w-full max-w-280 mx-auto px-6">
        <div className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
          &lt;about&gt;
        </div>

        <Reveal as="h2" className="font-display font-semibold text-[28px] md:text-[40px] mb-12 md:mb-16">
          A bit about me
        </Reveal>

        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20 items-start">
          <div className="flex flex-col gap-6">
            {/* Replace with: <img src="/your-photo.jpg" className="w-full h-full object-cover rounded-3xl" /> */}
            <Reveal className="term-window group relative w-55 md:w-full shadow-glow transition-transform duration-500 hover:-translate-y-1 hover:shadow-glow-strong">
              <div className="term-window__bar">
                <span className="term-dot" style={{ background: '#f87171' }} />
                <span className="term-dot" style={{ background: '#fbbf24' }} />
                <span className="term-dot" style={{ background: '#6ee7b7' }} />
                <span className="ml-auto font-mono text-[10px] text-ink-dim">about.tsx</span>
              </div>
              <div className="relative aspect-square bg-linear-to-br from-surface to-bg-alt overflow-hidden">
                <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="pointer-events-none absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="font-display font-semibold text-7xl md:text-8xl text-primary/90 tracking-tight -rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                    CT
                  </span>
                </div>

                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-dim tracking-widest">
                  <span className="status-pulse" /> AVAILABLE
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {FACTS.map(([label, value]) => (
                  <li
                    key={label}
                    className="rounded-xl border border-border bg-surface/40 px-4 py-3 font-mono text-sm hover:border-primary/40 transition-colors"
                  >
                    <span className="block text-primary text-xs mb-1">{label}</span>
                    <span className="text-ink-muted wrap-break-word">{value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="text-ink-muted text-sm mb-4">
              This bio doubles as a shell — try{' '}
              <span className="text-primary">whoami</span>,{' '}
              <span className="text-primary">cat bio.txt</span>, or{' '}
              <span className="text-primary">help</span> for the full command list.
            </p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}