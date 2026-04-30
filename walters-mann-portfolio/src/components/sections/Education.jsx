import { FiAward, FiBookOpen } from 'react-icons/fi'
import { certifications, education } from '../../data/experience'
import Reveal from '../ui/Reveal'

export default function Education() {
  const hasEducation = education.length > 0
  const hasCertifications = certifications.length > 0

  return (
    <section className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Credentials</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="grid gap-4">
            {hasEducation ? (
              education.map((item, index) => (
                <Reveal key={item.degree} delay={index * 70}>
                  <article className="panel rounded-[1.9rem] p-6 md:p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel-soft)] text-accent">
                      <FiBookOpen size={18} />
                    </div>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {item.period}
                    </p>
                    <h3 className="mt-3 font-display text-3xl text-fg">{item.degree}</h3>
                    <p className="mt-2 text-sm text-muted">{item.institution}</p>
                    <p className="mt-5 text-sm leading-relaxed text-fg/90 md:text-base">
                      {item.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span key={highlight} className="pill">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <article className="panel rounded-[1.9rem] p-6 md:p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel-soft)] text-accent">
                    <FiBookOpen size={18} />
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Public profile policy
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-fg">
                    Only verified credentials are listed here.
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-fg/90 md:text-base">
                    I removed placeholder education details from the public site. If a role
                    reaches the serious interview stage, I can share additional background
                    directly.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="pill">Current role: Aptech</span>
                    <span className="pill">Public repositories linked</span>
                    <span className="pill">Direct contact available</span>
                  </div>
                </article>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel-soft)] text-accent">
                  <FiAward size={18} />
                </span>
                <div>
                  <p className="font-display text-3xl text-fg">Additional credentials</p>
                  <p className="text-sm text-muted">
                    This public version avoids certification claims that are not explicitly verified here.
                  </p>
                </div>
              </div>
            </Reveal>

            {hasCertifications ? (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {certifications.map((certification, index) => (
                  <Reveal key={certification.name} delay={index * 70}>
                    <article className="panel-soft h-full rounded-[1.7rem] p-6">
                      <span className="pill">{certification.status}</span>
                      <h3 className="mt-5 font-display text-2xl text-fg">
                        {certification.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{certification.issuer}</p>
                      <p className="mt-4 text-sm leading-relaxed text-fg/90">
                        {certification.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal delay={60}>
                <article className="panel-soft mt-5 rounded-[1.7rem] p-6">
                  <p className="font-display text-2xl text-fg">No placeholder certification list</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Rather than naming certifications that are still uncertain or incomplete,
                    this portfolio focuses on live role details, contact information, and
                    publicly reviewable project work.
                  </p>
                </article>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
