import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project, index = 0, large = false }) {
  const highlights = (project.impact || project.highlights || []).slice(0, large ? 3 : 2)

  return (
    <Link to={`/projects/${project.slug}`} className="group block h-full">
      <article
        className="panel premium-lift h-full rounded-[2rem] p-6 md:p-7"
        style={{
          background: `linear-gradient(150deg, ${project.accent}22 0%, transparent 38%), linear-gradient(180deg, var(--panel), var(--panel-soft))`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="pill">Project {String(index + 1).padStart(2, '0')}</span>
            <span className="pill">{project.year}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {project.role}
          </span>
        </div>

        <div className={`mt-6 grid gap-6 ${large ? 'xl:grid-cols-[1.04fr_0.96fr]' : ''}`}>
          <div>
            <h3 className="font-display text-3xl text-fg md:text-4xl">{project.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{project.tagline}</p>
            <p className="mt-5 text-sm leading-relaxed text-fg/90">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.slice(0, large ? 6 : 4).map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-line bg-[var(--panel-soft)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Why it matters
            </p>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-flame-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <div className="flex flex-wrap gap-5 text-sm text-muted">
            <span>{project.duration}</span>
            <span>{project.team}</span>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors group-hover:text-accent">
            Read case study
            <FiArrowUpRight size={15} />
          </span>
        </div>
      </article>
    </Link>
  )
}
