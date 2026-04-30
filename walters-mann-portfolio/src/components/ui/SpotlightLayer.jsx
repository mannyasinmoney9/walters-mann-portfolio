import { useEffect, useRef } from 'react'

export default function SpotlightLayer() {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    if (reduceMotion || !finePointer) {
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    function handleMove(event) {
      node.style.setProperty('--spot-x', `${event.clientX}px`)
      node.style.setProperty('--spot-y', `${event.clientY}px`)
      node.style.setProperty('--spot-opacity', '1')
    }

    function handleLeave() {
      node.style.setProperty('--spot-opacity', '0')
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />
}
