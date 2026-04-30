import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { featuredProjects } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import Reveal from '../ui/Reveal'

export default function Projects() {
  return (
    <section id="work" className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Selected work</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div>
              <h2 className="display max-w-4xl text-4xl text-fg md:text-6xl">
                Work that proves scale, judgement,
                <span className="display-italic text-accent"> and follow-through.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                These are the projects with public code or grounded details I can stand
                behind in interviews. I would rather show fewer honest examples than pad the
                page with invented case studies.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 90}>
                <ProjectCard project={project} index={index} large={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={240}>
          <div className="mt-10 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel-soft)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              View all projects
              <FiArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
