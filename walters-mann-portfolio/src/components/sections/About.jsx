import { FiCheckCircle, FiCompass, FiMessageSquare, FiZap } from 'react-icons/fi'
import { competencies, personal, principles } from '../../data/personal'
import { techMarquee } from '../../data/skills'
import Marquee from '../ui/Marquee'
import Reveal from '../ui/Reveal'

const SIGNALS = [
  {
    icon: FiCompass,
    title: 'Architecture judgement',
    body: 'I know when a system needs sophistication and when it just needs clarity.',
  },
  {
    icon: FiZap,
    title: 'Delivery momentum',
    body: 'I like turning unclear ideas into shipped software without creating unnecessary mess.',
  },
  {
    icon: FiMessageSquare,
    title: 'Communication that helps',
    body: 'I document decisions, explain trade-offs, and keep teammates aligned without noise.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="mb-16 md:mb-20">
        <Marquee items={techMarquee} speed="slow" />
      </div>

      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[1fr_0.95fr]">
          <Reveal>
            <h2 className="display max-w-4xl text-4xl text-fg md:text-6xl">
              I like software that feels
              <span className="display-italic text-accent"> serious in production </span>
              and clear to the next engineer.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
              {personal.summary}
            </p>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {personal.hiringPitch}
            </p>
          </Reveal>

          <div className="grid gap-4">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 90}>
                <div className="panel-soft rounded-[1.6rem] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Principle {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-fg">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <Reveal>
            <div className="panel rounded-[1.9rem] p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                What teams get when I join
              </p>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {competencies.map((competency) => (
                  <li key={competency} className="flex gap-3 rounded-[1.2rem] border border-line p-4">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-accent" size={16} />
                    <span className="text-sm leading-relaxed text-fg">{competency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {SIGNALS.map((signal, index) => {
              const Icon = signal.icon
              return (
                <Reveal key={signal.title} delay={index * 80}>
                  <div className="panel-soft h-full rounded-[1.7rem] p-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel)] text-accent">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-fg">{signal.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {signal.body}
                    </p>
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
