import { motion } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { SPRING_GENTLE } from '../../lib/motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-flame-500 origin-left"
        animate={{ scaleX: progress }}
        transition={{ ...SPRING_GENTLE, stiffness: 180, damping: 28, mass: 0.6 }}
        style={{ originX: 0, willChange: 'transform' }}
      />
    </div>
  )
}
