/* =====================================================================
   THEME.CONFIG.JS — the ONLY file you should need to edit to re-theme
   =====================================================================
   Lives in its own folder, completely separate from the React app in
   /site. It's imported by site/tailwind.config.js, so every color,
   font, shadow and animation used anywhere in the React components
   (bg-primary, text-ink-muted, border-border, shadow-glow, etc.)
   is generated FROM these values.

   Change a hex code here, save, and every button/card/border/glow
   across the whole site updates at once — nothing in /site needs
   to change.

   Currently set to: Cyan / Teal — #5EEAD4
   ===================================================================== */

module.exports = {
  colors: {
    primary: {
      DEFAULT: '#5EEAD4',
      strong: '#2DD4BF',
      soft: '#99F6E4',
    },
    bg: {
      DEFAULT: '#0A1414',
      alt: '#0E1B1B',
    },
    surface: {
      DEFAULT: '#122120',
      hover: '#162928',
    },
    ink: {
      DEFAULT: '#E7F5F2',
      muted: '#8FA8A4',
      dim: '#5C7472',
      onprimary: '#04211D',
    },
    border: {
      DEFAULT: 'rgba(94, 234, 212, 0.14)',
      strong: 'rgba(94, 234, 212, 0.35)',
    },
  },

  fontFamily: {
    display: ['Space Grotesk', 'sans-serif'],
    body: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },

  boxShadow: {
    glow: '0 0 48px rgba(94, 234, 212, 0.16)',
    'glow-strong': '0 0 64px rgba(94, 234, 212, 0.28)',
    card: '0 24px 48px -24px rgba(0, 0, 0, 0.55)',
  },

  keyframes: {
    blink: { '50%': { opacity: 0 } },
    dropline: {
      '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
      '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
      '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
      '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
    },
  },
  animation: {
    blink: 'blink 1s step-end infinite',
    dropline: 'dropline 1.8s ease-in-out infinite',
  },
};