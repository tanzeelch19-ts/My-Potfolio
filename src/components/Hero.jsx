import { useEffect, useState } from 'react';
import useMagnetic from '../hooks/useMagnetic';

const ROLES = ['Frontend Developer', 'UI Engineer', 'Creative Coder'];

function useTypedText(text, speed = 80, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let timeoutId;

    const tick = () => {
      charIndex++;
      setDisplayed(text.slice(0, charIndex));
      if (charIndex >= text.length) {
        setDone(true);
        return;
      }
      timeoutId = setTimeout(tick, speed);
    };

    timeoutId = setTimeout(tick, startDelay);
    return () => clearTimeout(timeoutId);
  }, [text, speed, startDelay]);

  return [displayed, done];
}

function useTypedRole(startAfter) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!startAfter) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const current = ROLES[roleIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          charIndex = 0;
          timeoutId = setTimeout(tick, 300);
          return;
        }
      }

      setText(current.slice(0, charIndex));
      timeoutId = setTimeout(tick, deleting ? 40 : 80);
    };

    timeoutId = setTimeout(tick, 300);
    return () => clearTimeout(timeoutId);
  }, [startAfter]);

  return text;
}

export default function Hero() {
  const [whoami, whoamiDone] = useTypedText('whoami', 90, 400);
  const role = useTypedRole(whoamiDone);
  const magnetPrimary = useMagnetic(0.2);
  const magnetSecondary = useMagnetic(0.2);

  return (
    <header
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-19"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 w-140 h-140 rounded-full bg-primary/10 blur-3xl" />

      <div className="w-full max-w-280 mx-auto px-6 relative">
        <div className="max-w-190">
          <p className="font-mono text-sm text-ink-muted mb-5">
            <span className="text-primary">Ch Tanzeel@portfolio:~$</span> {whoami}
            <span className="inline-block w-2 h-3.75 -mb-0.5 ml-0.5 bg-primary animate-blink" />
          </p>

          <h1 className="font-display font-semibold text-[40px] sm:text-[56px] md:text-[76px] leading-[1.05] tracking-tight mb-4">
            Ch Tanzeel
          </h1>

          <p className="font-mono text-primary text-lg md:text-2xl min-h-8 mb-6">
            {role}
            <span className="inline-block w-0.5 h-5.5 -mb-1 ml-1 bg-primary animate-blink" />
          </p>

          <p className="text-ink-muted text-lg max-w-135 mb-9">
            I build clean, functional web interfaces with HTML, CSS,
            JavaScript, and React — turning ideas into real, usable projects.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              ref={magnetPrimary}
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-primary text-ink-onprimary shadow-glow hover:bg-primary-soft hover:shadow-glow-strong transition-transform duration-150"
            >
              View projects
            </a>
            <a
              ref={magnetSecondary}
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-border-strong text-ink hover:border-primary hover:text-primary transition-transform duration-150"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-9 left-6 flex items-center gap-2.5 font-mono text-xs text-ink-dim">
        <span className="w-px h-7 bg-linear-to-b from-primary to-transparent animate-dropline" />
        scroll
      </div>
    </header>
  );
}