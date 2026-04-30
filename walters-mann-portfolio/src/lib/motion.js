export const EASE_SMOOTH = [0.22, 1, 0.36, 1]
export const EASE_SOFT = [0.18, 1, 0.32, 1]
export const EASE_GLIDE = [0.2, 0.65, 0.2, 1]

export const SPRING_GENTLE = {
  type: 'spring',
  stiffness: 140,
  damping: 20,
  mass: 0.9,
}

export const SPRING_SWAP = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 0.92,
}

export const SPRING_OVERLAY = {
  type: 'spring',
  stiffness: 165,
  damping: 22,
  mass: 0.88,
}

export function fadeUp({
  delay = 0,
  distance = 18,
  duration = 0.84,
  ease = EASE_SOFT,
} = {}) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration, ease },
  }
}

export function floatLoop({
  offset = 8,
  duration = 8.6,
  ease = EASE_GLIDE,
} = {}) {
  return {
    animate: { y: [0, -offset, 0, offset * 0.18, 0] },
    transition: {
      duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease,
    },
  }
}
