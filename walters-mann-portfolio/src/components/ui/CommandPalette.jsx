import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCopy,
  FiDownload,
  FiFolder,
  FiGithub,
  FiHome,
  FiMail,
  FiMoon,
  FiPhone,
  FiSearch,
  FiSun,
  FiUser,
} from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { personal } from '../../data/personal'
import { projects } from '../../data/projects'
import { useTheme } from '../../hooks/useTheme'
import { EASE_SOFT, SPRING_OVERLAY } from '../../lib/motion'

const SECTIONS = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'services', label: 'Services', icon: FiBriefcase },
  { id: 'work', label: 'Projects', icon: FiFolder },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'skills', label: 'Skills', icon: FiBriefcase },
  { id: 'contact', label: 'Contact', icon: FiMail },
]

function isTypingTarget(target) {
  if (!(target instanceof HTMLElement)) return false

  const tag = target.tagName
  return (
    target.isContentEditable ||
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT'
  )
}

function isMacLike() {
  if (typeof window === 'undefined') return false

  return /Mac|iPhone|iPad/i.test(window.navigator.platform)
}

export default function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [feedback, setFeedback] = useState('')

  const closePalette = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const openSection = useCallback((id) => {
    closePalette()

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${id}` })
      return
    }

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `/#${id}`)
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [closePalette, location.pathname, navigate])

  const openProject = useCallback((slug) => {
    closePalette()
    navigate(`/projects/${slug}`)
  }, [closePalette, navigate])

  const openExternal = useCallback((url) => {
    closePalette()
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [closePalette])

  const downloadResume = useCallback(() => {
    closePalette()

    const link = document.createElement('a')
    link.href = personal.resumeUrl
    link.download = 'Walters-Mann-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }, [closePalette])

  const copyValue = useCallback(async (value, message) => {
    try {
      await navigator.clipboard.writeText(value)
      setFeedback(message)
    } catch {
      setFeedback('Clipboard access is not available in this browser.')
    }
  }, [])

  const actions = useMemo(
    () => [
      ...SECTIONS.map((section) => ({
        id: `section-${section.id}`,
        label: section.label,
        meta: 'Jump to section',
        group: 'Navigate',
        keywords: `${section.id} ${section.label} section`,
        icon: section.icon,
        run: () => openSection(section.id),
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: project.title,
        meta: project.tagline,
        group: 'Projects',
        keywords: `${project.title} ${project.tagline} ${project.stack.join(' ')}`,
        icon: FiFolder,
        run: () => openProject(project.slug),
      })),
      {
        id: 'email-direct',
        label: 'Email Walters Mann',
        meta: personal.email,
        group: 'Actions',
        keywords: 'email contact recruiter message hire',
        icon: FiMail,
        run: () => {
          closePalette()
          window.location.href = `mailto:${personal.email}`
        },
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        meta: personal.email,
        group: 'Actions',
        keywords: 'copy email clipboard',
        icon: FiCopy,
        keepOpen: true,
        run: () => copyValue(personal.email, 'Email copied to clipboard.'),
      },
      {
        id: 'copy-phone',
        label: 'Copy phone number',
        meta: personal.phone,
        group: 'Actions',
        keywords: 'copy phone whatsapp clipboard',
        icon: FiPhone,
        keepOpen: true,
        run: () => copyValue(personal.phoneRaw, 'Phone number copied to clipboard.'),
      },
      {
        id: 'github',
        label: 'Open GitHub profile',
        meta: '@mannyasinmoney9',
        group: 'Actions',
        keywords: 'github repositories code public profile',
        icon: FiGithub,
        run: () => openExternal('https://github.com/mannyasinmoney9'),
      },
      {
        id: 'resume',
        label: 'Download resume',
        meta: 'PDF download',
        group: 'Actions',
        keywords: 'resume cv pdf download',
        icon: FiDownload,
        run: () => downloadResume(),
      },
      {
        id: 'theme',
        label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
        meta: isDark ? 'Current theme: dark' : 'Current theme: light',
        group: 'Display',
        keywords: 'theme appearance dark light mode',
        icon: isDark ? FiSun : FiMoon,
        keepOpen: true,
        run: () => {
          toggleTheme()
          setFeedback(isDark ? 'Light mode enabled.' : 'Dark mode enabled.')
        },
      },
    ],
    [
      closePalette,
      copyValue,
      downloadResume,
      isDark,
      openExternal,
      openProject,
      openSection,
      toggleTheme,
    ],
  )

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return actions
    }

    return actions.filter((action) =>
      `${action.label} ${action.meta} ${action.group} ${action.keywords}`
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [actions, query])

  const shortcutLabel = isMacLike() ? 'Cmd K' : 'Ctrl K'

  useEffect(() => {
    if (!open) {
      setQuery('')
      setFeedback('')
      setActiveIndex(0)
      return
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 40)

    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      const hasCommandShortcut = (event.metaKey || event.ctrlKey) && key === 'k'

      if (hasCommandShortcut) {
        event.preventDefault()
        onOpenChange(!open)
        return
      }

      if (!open && key === '/' && !event.metaKey && !event.ctrlKey && !isTypingTarget(event.target)) {
        event.preventDefault()
        onOpenChange(true)
        return
      }

      if (!open) return

      if (event.key === 'Escape') {
        event.preventDefault()
        closePalette()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((current) =>
          filteredActions.length ? (current + 1) % filteredActions.length : 0,
        )
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((current) =>
          filteredActions.length
            ? (current - 1 + filteredActions.length) % filteredActions.length
            : 0,
        )
        return
      }

      if (event.key === 'Enter' && filteredActions[activeIndex]) {
        event.preventDefault()
        const action = filteredActions[activeIndex]
        action.run()
        if (!action.keepOpen) {
          setFeedback('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, closePalette, filteredActions, open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_SOFT }}
          className="fixed inset-0 z-[70] bg-[rgba(3,8,20,0.42)] px-4 pb-6 pt-24 backdrop-blur-xl md:px-8"
          onClick={closePalette}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={SPRING_OVERLAY}
            className="mx-auto max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel overflow-hidden rounded-[2rem] border border-line shadow-[0_32px_90px_var(--shadow)]">
              <div className="flex items-center gap-3 border-b border-line px-5 py-4 md:px-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[var(--panel-soft)] text-accent">
                  <FiSearch size={17} />
                </span>

                <div className="min-w-0 flex-1">
                  <label htmlFor="command-palette-input" className="sr-only">
                    Search actions
                  </label>
                  <input
                    id="command-palette-input"
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search sections, projects, or actions"
                    className="border-none bg-transparent px-0 py-0 text-base text-fg shadow-none focus:bg-transparent focus:border-none focus:translate-y-0 md:text-lg"
                  />
                </div>

                <span className="hidden rounded-full border border-line bg-[var(--panel-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:inline-flex">
                  {shortcutLabel}
                </span>
              </div>

              <div className="grid gap-0 md:grid-cols-[1fr_220px]">
                <div className="max-h-[60vh] overflow-y-auto px-3 py-3">
                  {filteredActions.length ? (
                    filteredActions.map((action, index) => {
                      const Icon = action.icon
                      const active = index === activeIndex

                      return (
                        <button
                          key={action.id}
                          type="button"
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => {
                            action.run()
                            if (!action.keepOpen) {
                              setFeedback('')
                            }
                          }}
                          className={`flex w-full items-center gap-4 rounded-[1.4rem] px-4 py-4 text-left transition-all duration-500 ease-[cubic-bezier(0.18,1,0.32,1)] ${
                            active
                              ? 'bg-[var(--accent-soft)] text-fg'
                              : 'text-fg hover:bg-[var(--panel-soft)]'
                          }`}
                        >
                          <span
                            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                              active
                                ? 'border-accent bg-[rgba(255,122,24,0.14)] text-accent'
                                : 'border-line bg-[var(--panel-soft)] text-muted'
                            }`}
                          >
                            <Icon size={17} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-2xl text-fg">
                              {action.label}
                            </span>
                            <span className="mt-1 block truncate text-sm text-muted">
                              {action.meta}
                            </span>
                          </span>

                          <span className="hidden rounded-full border border-line bg-[var(--panel-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:inline-flex">
                            {action.group}
                          </span>
                        </button>
                      )
                    })
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-line px-5 py-10 text-center">
                      <p className="font-display text-3xl text-fg">No matches found</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        Try searching for contact, GitHub, resume, projects, or section names.
                      </p>
                    </div>
                  )}
                </div>

                <aside className="border-t border-line bg-[var(--panel-soft)] px-5 py-5 md:border-l md:border-t-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Quick access
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Use this command palette to move through the portfolio faster, open
                    public work, copy contact details, and switch themes without hunting for
                    buttons.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-[1.2rem] border border-line bg-[var(--panel)] px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Keyboard
                      </p>
                      <p className="mt-2 text-sm text-fg">
                        {shortcutLabel} or <span className="font-mono">/</span>
                      </p>
                    </div>

                    <div className="rounded-[1.2rem] border border-line bg-[var(--panel)] px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Contact
                      </p>
                      <p className="mt-2 text-sm text-fg">{personal.email}</p>
                    </div>

                    <div className="rounded-[1.2rem] border border-line bg-[var(--panel)] px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Status
                      </p>
                      <p className="mt-2 text-sm text-fg">
                        {feedback || 'Arrow keys navigate. Enter selects. Esc closes.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closePalette}
                    className="premium-action mt-6 inline-flex items-center gap-2 text-sm text-fg"
                  >
                    Close palette
                    <FiArrowUpRight size={14} />
                  </button>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
