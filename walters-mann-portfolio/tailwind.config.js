/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f5f0',
          100: '#ebe7dc',
          200: '#d6cfba',
          300: '#bbb091',
          400: '#a3946f',
          500: '#8a7a5a',
          600: '#6f6047',
          700: '#544839',
          800: '#36302a',
          900: '#1a1714',
          950: '#0c0a09',
        },
        flame: {
          50: '#fff4ed',
          100: '#ffe5d4',
          200: '#ffc7a8',
          300: '#ffa071',
          400: '#ff6f38',
          500: '#ff5b24',
          600: '#f0390a',
          700: '#c7290b',
          800: '#9e2211',
          900: '#7f1f12',
        },
        cream: '#f5f1e8',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        '11xl': ['12rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      animation: {
        'marquee': 'marquee 64s linear infinite',
        'marquee-slow': 'marquee 118s linear infinite',
        'blink': 'blink 1.35s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        'float': 'float 9.5s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        'pulse-slow': 'pulse 4.8s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '55%, 100%': { opacity: '0.12' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
