import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiCommand, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { personal } from '../../data/personal'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { EASE_SOFT, SPRING_GENTLE, SPRING_OVERLAY } from '../../lib/motion'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

function getShortcutLabel() {
  if (typeof window === 'undefined') return 'Ctrl K'
  return /Mac|iPhone|iPad/i.test(window.navigator.platform) ? 'Cmd K' : 'Ctrl K'
}

export default function Navbar({ onOpenPalette }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [shortcutLabel, setShortcutLabel] = useState('Ctrl K')

  const activeId = useScrollSpy(isHome ? SECTION_IDS : [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setShortcutLabel(getShortcutLabel())
  }, [])

  function jumpTo(id) {
    setOpen(false)

    if (!isHome) {
      navigate({ pathname: '/', hash: `#${id}` })
      return
    }

    if (location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `/#${id}`)
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className={`mx-auto max-w-[1440px] rounded-full border px-4 py-3 transition-all duration-500 ease-[cubic-bezier(0.18,1,0.32,1)] md:px-6 ${
            scrolled || !isHome
              ? 'border-line bg-[color:var(--panel-soft)] shadow-[0_18px_40px_var(--shadow)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex min-w-0 items-center gap-3"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[var(--panel)] font-mono text-sm font-semibold tracking-[0.18em] text-fg">
                WM
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-xl text-fg md:text-2xl">
                  Walters Mann
                </p>
                <p className="hidden truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:block">
                  {personal.shortTitle}
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {NAV_LINKS.map((link) => {
                const active = activeId === link.id
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => jumpTo(link.id)}
                    className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={SPRING_GENTLE}
                        className="absolute inset-x-3 -bottom-1 h-px rounded-full bg-accent"
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-3 rounded-full border border-line bg-[var(--panel-soft)] px-4 py-2 lg:flex">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-pulse-slow rounded-full bg-emerald-400 opacity-45" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Available for interviews
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenPalette}
                className="premium-action hidden items-center gap-3 rounded-full border border-line bg-[var(--panel-soft)] px-4 py-2 text-fg md:inline-flex"
                aria-label="Open quick action palette"
              >
                <FiSearch size={15} className="text-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Quick actions
                </span>
                <span className="hidden items-center gap-1 rounded-full border border-line bg-[var(--panel)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg lg:inline-flex">
                  <FiCommand size={12} className="text-accent" />
                  {shortcutLabel}
                </span>
              </button>

              <ThemeToggle />

              <button
                type="button"
                onClick={() => jumpTo('contact')}
                className="premium-action hidden items-center gap-2 rounded-full bg-flame-500 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-950 lg:inline-flex"
              >
                Hire me
                <FiArrowUpRight size={14} />
              </button>

              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel-soft)] text-fg xl:hidden"
              >
                {open ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_SOFT }}
            className="fixed inset-0 z-40 bg-[color:var(--bg)]/95 px-4 pb-8 pt-28 backdrop-blur-xl xl:hidden"
          >
            <nav className="container-tight grid gap-3">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SPRING_OVERLAY, delay: index * 0.04 }}
                  onClick={() => jumpTo(link.id)}
                  className="panel flex items-center justify-between rounded-[1.5rem] px-5 py-5 text-left"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 font-display text-2xl text-fg">{link.label}</p>
                  </div>
                  <FiArrowUpRight className="text-accent" size={18} />
                </motion.button>
              ))}
            </nav>

            <div className="container-tight mt-8 rounded-[1.75rem] border border-line bg-[var(--panel-soft)] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Reach me
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="mt-4 block text-lg text-fg transition-colors hover:text-accent"
              >
                {personal.email}
              </a>
              <a
                href={`tel:${personal.phoneRaw}`}
                className="mt-2 block text-muted transition-colors hover:text-fg"
              >
                {personal.phone}
              </a>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onOpenPalette?.()
                }}
                className="premium-action mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg"
              >
                <FiSearch size={14} />
                Quick actions
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
