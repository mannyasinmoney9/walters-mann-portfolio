import { useEffect } from 'react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiGithub,
} from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!project) {
    return (
      <main className="container-wide min-h-screen pb-20 pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Project not found
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
        >
          <FiArrowLeft size={14} />
          Back to projects
        </Link>
      </main>
    )
  }

  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main className="min-h-screen pb-20 pt-32 md:pt-36">
      <div className="container-wide">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <FiArrowLeft size={14} />
            All projects
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="eyebrow">{project.year}</p>
              <h1 className="display mt-5 max-w-4xl text-5xl text-fg md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
                {project.tagline}
              </p>
            </div>

            <div className="panel-soft rounded-[1.9rem] p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Role
                  </p>
                  <p className="mt-2 text-sm text-fg">{project.role}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Duration
                  </p>
                  <p className="mt-2 text-sm text-fg">{project.duration}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Team
                  </p>
                  <p className="mt-2 text-sm text-fg">{project.team}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <div
            className="panel mt-10 rounded-[2rem] p-7 md:p-9"
            style={{
              background: `linear-gradient(145deg, ${project.accent}28 0%, transparent 42%), linear-gradient(180deg, var(--panel), var(--panel-soft))`,
            }}
          >
            <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Overview
                </p>
                <p className="mt-4 text-base leading-relaxed text-fg md:text-lg">
                  {project.summary}
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-line bg-[var(--panel-soft)] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Main outcomes
                </p>
                <ul className="mt-4 space-y-3">
                  {(project.impact || project.highlights || []).slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-flame-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.72fr_0.28fr]">
          <div className="grid gap-6">
            {project.problem && (
              <Reveal>
                <section className="panel-soft rounded-[1.8rem] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Problem
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg md:text-base">
                    {project.problem}
                  </p>
                </section>
              </Reveal>
            )}

            {project.solution && (
              <Reveal delay={50}>
                <section className="panel-soft rounded-[1.8rem] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Solution
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg md:text-base">
                    {project.solution}
                  </p>
                </section>
              </Reveal>
            )}

            <Reveal delay={90}>
              <section className="panel rounded-[1.9rem] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Engineering highlights
                </p>
                <ul className="mt-5 space-y-4">
                  {(project.highlights || []).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg md:text-base">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-flame-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          <aside className="grid gap-6">
            <Reveal delay={40}>
              <div className="panel-soft rounded-[1.8rem] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="panel-soft rounded-[1.8rem] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Project links
                </p>
                <div className="mt-4 grid gap-3">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-[1.1rem] border border-line px-4 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                    >
                      <span>Live product</span>
                      <FiExternalLink size={14} />
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-[1.1rem] border border-line px-4 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                    >
                      <span>Repository</span>
                      <FiGithub size={14} />
                    </a>
                  )}
                  {!project.links?.live && !project.links?.repo && (
                    <p className="text-sm leading-relaxed text-muted">
                      This work is private. Detailed walkthroughs and references are available on request.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal delay={120}>
          <div className="panel-soft mt-14 rounded-[2rem] p-6 md:p-7">
            <Link to={`/projects/${nextProject.slug}`} className="group block">
              <p className="eyebrow">Next project</p>
              <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-display text-4xl text-fg transition-colors group-hover:text-accent md:text-5xl">
                    {nextProject.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {nextProject.tagline}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors group-hover:text-accent">
                  Read next case
                  <FiArrowRight size={15} />
                </span>
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
