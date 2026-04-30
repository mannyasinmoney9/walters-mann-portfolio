import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiArrowDownRight, FiDownload, FiMail, FiMapPin } from 'react-icons/fi'
import { personal } from '../../data/personal'
import { fadeUp, floatLoop } from '../../lib/motion'
import Typewriter from '../ui/Typewriter'

const FOCUS_LINES = [
  'Java and Spring Boot backend delivery',
  'API design that stays readable as products grow',
  'Full-stack execution when the product needs more than APIs',
  'Public work presented with real links and direct contact details',
]

const HERO_FACTS = [
  { label: 'Primary stack', value: 'Java, Spring Boot, React' },
  { label: 'Delivery style', value: 'Thoughtful, calm, production-ready' },
  { label: 'Based in', value: personal.location },
  { label: 'Hiring mode', value: 'Onsite and hybrid' },
]

function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', `/#${id}`)
  }

  target.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [heroImageSrc, setHeroImageSrc] = useState(personal.photoFallbackUrl)

  useEffect(() => {
    const image = new window.Image()
    image.src = personal.photoUrl

    image.onload = () => {
      setHeroImageSrc(personal.photoUrl)
    }

    image.onerror = () => {
      setHeroImageSrc(personal.photoFallbackUrl)
    }

    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
      <div className="container-wide">
        <div className="grid items-start gap-14 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div {...fadeUp({ distance: 16, duration: 0.62 })} className="flex flex-wrap gap-3">
              <span className="pill">Open to interviews</span>
              <span className="pill">Senior backend ownership</span>
              <span className="pill">Java engineering</span>
            </motion.div>

            <motion.p
              {...fadeUp({ delay: 0.08, duration: 0.66 })}
              className="mt-7 font-mono text-[11px] uppercase tracking-[0.24em] text-muted"
            >
              {personal.title}
            </motion.p>

            <motion.h1
              {...fadeUp({ delay: 0.16, distance: 24, duration: 0.84 })}
              className="mt-5 max-w-5xl font-display text-[clamp(3.4rem,8vw,7.4rem)] leading-[0.9] tracking-[-0.05em] text-fg"
            >
              Walters Mann builds backend systems teams can
              <span className="display-italic text-accent"> ship, trust, and scale.</span>
            </motion.h1>

            <motion.p
              {...fadeUp({ delay: 0.28, duration: 0.7 })}
              className="mt-7 max-w-3xl text-lg leading-relaxed text-muted md:text-xl"
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              {...fadeUp({ delay: 0.36, distance: 18, duration: 0.72 })}
              className="panel-soft mt-8 max-w-3xl rounded-[1.75rem] p-5 md:p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Currently focused on
              </p>
              <p className="mt-3 min-h-[2.2em] font-display text-2xl text-fg md:text-3xl">
                <Typewriter phrases={FOCUS_LINES} />
              </p>
            </motion.div>

            <motion.div
              {...fadeUp({ delay: 0.44, distance: 18, duration: 0.72 })}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('contact')
                }}
                className="premium-action inline-flex items-center gap-2 rounded-full bg-flame-500 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-950"
              >
                <FiMail size={15} />
                Contact Walters
              </a>

              <a
                href={personal.resumeUrl}
                download
                className="premium-action inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg"
              >
                <FiDownload size={15} />
                Download resume
              </a>

              <a
                href="#work"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('work')
                }}
                className="premium-action inline-flex items-center gap-2 rounded-full px-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
              >
                See selected work
                <FiArrowDownRight size={15} />
              </a>
            </motion.div>

            <motion.div
              {...fadeUp({ delay: 0.52, distance: 18, duration: 0.72 })}
              className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {HERO_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-[1.4rem] border border-line bg-[var(--panel)] px-4 py-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fg">{fact.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            {...fadeUp({ delay: 0.22, distance: 22, duration: 0.84 })}
            className="relative"
          >
            <div className="panel rounded-[2.1rem] p-4 md:p-5">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-strong-line bg-[linear-gradient(160deg,rgba(255,122,24,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]">
                <img
                  src={heroImageSrc}
                  alt="Portrait of Walters Mann"
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                  style={{
                    objectPosition: 'center 14%',
                    filter: 'contrast(1.05) saturate(1.03) brightness(1.02)',
                    transform: 'translateZ(0)',
                  }}
                />

                <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-line bg-[color:var(--panel-soft)] p-4 backdrop-blur-xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    First impression
                  </p>
                  <p className="mt-2 text-lg leading-snug text-fg">
                    Thoughtful engineer. Calm operator. Product-aware builder.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[1.35rem] border border-line bg-[var(--panel-soft)] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Location
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm text-fg">
                    <FiMapPin className="mt-0.5 text-accent" size={15} />
                    <span>{personal.location}</span>
                  </p>
                </div>

                <div className="rounded-[1.35rem] border border-line bg-[var(--panel-soft)] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Availability
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fg">
                    Ready for serious product teams and senior delivery responsibility.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              {...floatLoop({ offset: 7, duration: 6.6 })}
              className="absolute -left-4 top-12 hidden rounded-full border border-line bg-[color:var(--panel-soft)] px-4 py-3 shadow-[0_14px_28px_var(--shadow)] md:flex"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg">
                Java + Spring Boot + Kafka
              </span>
            </motion.div>

            <motion.div
              {...floatLoop({ offset: 8, duration: 7.2 })}
              className="absolute -right-4 bottom-24 hidden rounded-full border border-line bg-[color:var(--panel-soft)] px-4 py-3 shadow-[0_14px_28px_var(--shadow)] md:flex"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg">
                Open for interviews
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp({ delay: 0.6, distance: 18, duration: 0.78 })}
          className="panel-soft mt-16 rounded-[2rem] p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">Why this portfolio feels different</p>
              <p className="mt-4 max-w-3xl text-2xl leading-snug text-fg md:text-3xl">
                Backend depth, product instincts, and delivery habits that make teams feel
                safer moving fast.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {personal.stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.4rem] border border-line bg-[var(--panel)] px-4 py-5"
                >
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-fg md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
