import { motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'
import { SPRING_GENTLE } from '../../lib/motion'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-3 py-2 text-sm text-fg transition-colors hover:border-accent ${className}`}
    >
      <motion.span
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -42, opacity: 0, scale: 0.84 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={SPRING_GENTLE}
        className="text-accent"
      >
        {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
      </motion.span>
      <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
