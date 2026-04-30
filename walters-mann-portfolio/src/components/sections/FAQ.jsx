import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { faqs } from '../../data/experience'
import { EASE_SOFT, SPRING_GENTLE } from '../../lib/motion'
import Reveal from '../ui/Reveal'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-shell">
      <div className="container-wide">
        <div className="grid gap-10 xl:grid-cols-[0.38fr_0.62fr]">
          <Reveal>
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="display mt-5 max-w-2xl text-4xl text-fg md:text-5xl">
                Quick answers for hiring managers and technical leads.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                Most of the practical questions I get before interviews are answered here.
                If you want to go deeper, the contact section is right below.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {faqs.map((item, index) => {
              const open = index === openIndex

              return (
                <Reveal key={item.q} delay={index * 50}>
                  <div className="panel-soft rounded-[1.6rem] px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? -1 : index)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span className={`font-display text-2xl ${open ? 'text-accent' : 'text-fg'}`}>
                        {item.q}
                      </span>
                      <span
                        className={`mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.18,1,0.32,1)] ${
                          open
                            ? 'border-accent bg-[var(--accent-soft)] text-accent rotate-45'
                            : 'border-line text-fg'
                        }`}
                      >
                        <FiPlus size={16} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { ...SPRING_GENTLE, stiffness: 150, damping: 24, mass: 0.82 },
                            opacity: { duration: 0.34, ease: EASE_SOFT },
                          }}
                          className="overflow-hidden pr-10 pt-4 text-sm leading-relaxed text-muted md:text-base"
                        >
                          {item.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
