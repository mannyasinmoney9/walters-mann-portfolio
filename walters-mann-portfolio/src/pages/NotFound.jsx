import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container-tight flex min-h-screen flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 max-w-3xl text-5xl text-fg md:text-7xl">
        This page wandered off the map.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        The route you tried does not exist, but the rest of the portfolio is still very
        much alive.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
      >
        <FiArrowLeft size={14} />
        Back to home
      </Link>
    </main>
  )
}
