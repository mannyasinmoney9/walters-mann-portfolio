import { personal } from '../../data/personal'
import Reveal from '../ui/Reveal'

export default function Stats() {
  return (
    <section className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Grounded profile</p>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {personal.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="panel premium-lift group rounded-[1.8rem] p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Signal {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-fg md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{stat.label}</p>
                <span className="mt-5 inline-flex rounded-full border border-line bg-[var(--panel-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Public detail
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
