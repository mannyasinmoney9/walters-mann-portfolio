import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view,
 * picked from the supplied list of section ids.
 */
export function useScrollSpy(sectionIds, offset = 120) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '')
  const sectionIdsKey = sectionIds.join('|')

  useEffect(() => {
    if (!sectionIds.length) return

    function onScroll() {
      const scrollPos = window.scrollY + offset

      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= scrollPos) {
          current = id
        }
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, sectionIdsKey, offset])

  return activeId
}
