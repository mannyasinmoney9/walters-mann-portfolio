import { useEffect, useState } from 'react'

/**
 * Cycles through phrases with a typewriter effect.
 */
export default function Typewriter({
  phrases = [],
  typeSpeed = 52,
  deleteSpeed = 26,
  pause = 2500,
  className = '',
}) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return undefined

    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (!phrases.length || prefersReducedMotion) return

    const current = phrases[phraseIndex % phrases.length]

    let timeout
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
    } else {
      const speed = isDeleting ? deleteSpeed : typeSpeed
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1),
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pause, prefersReducedMotion])

  const displayText = prefersReducedMotion ? phrases[0] || '' : text

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[0.9em] ml-1 bg-accent align-middle animate-blink" />
    </span>
  )
}
