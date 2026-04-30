import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { experience } from '../../data/experience'
import { SPRING_SWAP } from '../../lib/motion'
import Reveal from '../ui/Reveal'

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeRole = experience[activeIndex]

  return (
    <section id="experience" className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Experience</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[0.42fr_0.58fr]">
          <Reveal>
            <div>
              <h2 className="display max-w-3xl text-4xl text-fg md:text-6xl">
                A career shaped by shipping systems that
                <span className="display-italic text-accent"> hold up after launch.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                I am most useful in environments where architecture, execution, and product
                delivery all matter at once. The entries below stay limited to current role
                information and public work I can discuss directly.
              </p>

              <div className="mt-8 grid gap-3">
                {experience.map((item, index) => (
                  <button
                    key={`${item.role}-${item.period}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-[1.5rem] border px-5 py-4 text-left transition-colors ${
                      activeIndex === index
                        ? 'border-accent bg-[var(--accent-soft)]'
                        : 'border-line bg-[var(--panel-soft)] hover:border-accent'
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {item.period}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-fg">{item.role}</h3>
                    <p className="mt-1 text-sm text-muted">{item.company}</p>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole.role}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={SPRING_SWAP}
              className="panel rounded-[2rem] p-6 md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {activeRole.location}
              </p>
              <h3 className="mt-3 font-display text-3xl text-fg md:text-4xl">
                {activeRole.role}
              </h3>
              <p className="mt-2 text-base text-muted">{activeRole.company}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {activeRole.period}
              </p>

              <p className="mt-6 text-base leading-relaxed text-fg/90 md:text-lg">
                {activeRole.description}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Key achievements
                  </p>
                  <ul className="mt-4 space-y-3">
                    {activeRole.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-fg">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-flame-500" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.6rem] border border-line bg-[var(--panel-soft)] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Stack in this role
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeRole.stack.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
