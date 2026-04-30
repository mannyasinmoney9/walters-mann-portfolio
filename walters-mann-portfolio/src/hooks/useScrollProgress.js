import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId = 0

    function onScroll() {
      if (frameId) return

      frameId = window.requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const height = document.documentElement.scrollHeight - window.innerHeight
        const next = height > 0 ? Math.min(1, Math.max(0, scrolled / height)) : 0
        setProgress((current) => (Math.abs(current - next) > 0.0005 ? next : current))
        frameId = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return progress
}
