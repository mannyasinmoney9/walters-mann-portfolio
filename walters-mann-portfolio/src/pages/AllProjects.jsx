import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ui/ProjectCard'
import Reveal from '../components/ui/Reveal'
import { projects } from '../data/projects'

const FILTERS = [
  { id: 'all', label: 'All work' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'frontend', label: 'Frontend' },
]

const FILTER_PREDICATES = {
  all: () => true,
  backend: (project) =>
    project.stack.some((item) =>
      ['Spring Boot', 'Java', 'Kafka', 'Microservices', 'Spring Cloud'].some((token) =>
        item.includes(token),
      ),
    ),
  fullstack: (project) =>
    project.stack.some((item) =>
      ['Next.js', 'React', 'Angular', 'Tailwind'].some((token) => item.includes(token)),
    ),
  frontend: (project) =>
    project.stack.some((item) =>
      ['React', 'Vite', 'Tailwind', 'Framer Motion'].some((token) =>
        item.includes(token),
      ),
    ),
}

export default function AllProjects() {
  const [filter, setFilter] = useState('all')
  const filtered = projects.filter(FILTER_PREDICATES[filter])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <main className="min-h-screen pb-20 pt-32 md:pt-36">
      <div className="container-wide">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <FiArrowLeft size={14} />
            Back home
          </Link>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-8 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="eyebrow">Project archive</p>
              <h1 className="display mt-5 max-w-4xl text-5xl text-fg md:text-7xl">
                Every public portfolio piece, filtered by the kind of work it shows.
              </h1>
            </div>

            <div className="panel-soft rounded-[1.8rem] p-6">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                Browse the archive by specialty. This list is intentionally limited to work
                I can present honestly here: public repositories and portfolio builds with
                grounded descriptions.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-3">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  filter === item.id
                    ? 'border-accent bg-[var(--accent-soft)] text-fg'
                    : 'border-line bg-[var(--panel-soft)] text-muted hover:border-accent hover:text-fg'
                }`}
              >
                {item.label}
              </button>
            ))}

            <span className="inline-flex items-center rounded-full border border-line bg-[var(--panel)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {filtered.map((project, index) => (
            <Reveal key={project.slug} delay={index * 50}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
