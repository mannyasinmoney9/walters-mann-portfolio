import { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { SPRING_GENTLE } from '../../lib/motion'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.94 }}
          transition={SPRING_GENTLE}
          onClick={backToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-12 h-12 rounded-full bg-flame-500 text-ink-950 shadow-xl hover:bg-flame-400 flex items-center justify-center transition-colors"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
