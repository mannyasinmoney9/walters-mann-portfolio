import { services } from '../../data/personal'
import Reveal from '../ui/Reveal'

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="display max-w-4xl text-4xl text-fg md:text-6xl">
                The work I am strongest at is the work that makes products
                <span className="display-italic text-accent"> sturdier and easier to ship.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                I operate where backend complexity, cloud delivery, and product quality
                meet. These are not theoretical skills. They are the patterns I have used
                on real systems, real teams, and real release cycles.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 70}>
                <article className="panel-soft premium-lift h-full rounded-[1.8rem] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {service.number}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-fg">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{service.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="pill">
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
