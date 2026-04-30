import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { skillCategories } from '../../data/skills'
import { SPRING_SWAP } from '../../lib/motion'
import Reveal from '../ui/Reveal'

const LEVEL_ORDER = ['expert', 'advanced', 'proficient', 'familiar']

const LEVEL_LABEL = {
  expert: 'Expert',
  advanced: 'Advanced',
  proficient: 'Proficient',
  familiar: 'Familiar',
}

function Dots({ level }) {
  const filled = Math.max(1, 4 - LEVEL_ORDER.indexOf(level))

  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full ${
            index < filled ? 'bg-flame-500' : 'bg-[color:var(--border-strong)]'
          }`}
        />
      ))}
    </span>
  )
}

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id)
  const active = skillCategories.find((category) => category.id === activeId) || skillCategories[0]

  return (
    <section id="skills" className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Skills</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[0.42fr_0.58fr]">
          <Reveal>
            <div>
              <h2 className="display max-w-3xl text-4xl text-fg md:text-6xl">
                A stack wide enough to be useful,
                <span className="display-italic text-accent"> focused enough to stay sharp.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                I am strongest where backend systems, cloud delivery, APIs, and product
                execution overlap. Select a category to see how the toolbox is shaped.
              </p>

              <div className="mt-8 grid gap-3">
                {skillCategories.map((category) => {
                  const activeCategory = category.id === activeId
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveId(category.id)}
                      className={`rounded-[1.4rem] border px-5 py-4 text-left transition-colors ${
                        activeCategory
                          ? 'border-accent bg-[var(--accent-soft)]'
                          : 'border-line bg-[var(--panel-soft)] hover:border-accent'
                      }`}
                    >
                      <p className="font-display text-xl text-fg">{category.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {category.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={SPRING_SWAP}
              className="panel rounded-[2rem] p-6 md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Active category
              </p>
              <h3 className="mt-3 font-display text-3xl text-fg md:text-4xl">
                {active.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {active.description}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[...active.skills]
                  .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))
                  .map((skill, index) => (
                    <div
                      key={skill.name}
                      className="rounded-[1.4rem] border border-line bg-[var(--panel-soft)] p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                            Skill {String(index + 1).padStart(2, '0')}
                          </p>
                          <p className="mt-2 text-lg text-fg">{skill.name}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                            {LEVEL_LABEL[skill.level]}
                          </p>
                          <div className="mt-2 flex justify-end">
                            <Dots level={skill.level} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
