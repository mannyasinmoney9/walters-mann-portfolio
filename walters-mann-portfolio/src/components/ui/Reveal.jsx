import { useEffect, useRef, useState } from 'react'

/**
 * Wraps children in a div that fades + slides into place
 * the first time it intersects the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
  threshold = 0.15,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(() => setVisible(true))
            observer.unobserve(node)
            break
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transform: 'translate3d(0, 0, 0)' }}
    >
      {children}
    </Component>
  )
}
