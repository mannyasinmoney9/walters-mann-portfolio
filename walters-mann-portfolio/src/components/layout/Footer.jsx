import { FiArrowUpRight } from 'react-icons/fi'
import { personal } from '../../data/personal'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line pb-10 pt-20">
      <div className="container-wide">
        <div className="panel-soft mb-10 grid gap-10 rounded-[2rem] p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[0.95] text-fg md:text-6xl">
              Want a backend engineer who can build the system and calm the room?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              I work best on products that need architecture clarity, dependable delivery,
              and thoughtful collaboration across engineering, product, and leadership.
            </p>
          </div>

          <div className="grid content-start gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="group premium-lift rounded-[1.5rem] border border-line bg-[var(--panel)] p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Email
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-base text-fg md:text-lg">{personal.email}</span>
                <FiArrowUpRight className="text-accent transition-transform duration-500 ease-[cubic-bezier(0.18,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>

            <div className="rounded-[1.5rem] border border-line bg-[var(--panel)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Location
              </p>
              <p className="mt-3 text-fg">{personal.location}</p>
              <p className="mt-1 text-sm text-muted">{personal.availability}</p>
            </div>
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-[2rem] border border-line bg-[var(--panel-soft)] px-6 py-5">
          <p className="font-display text-[17vw] leading-[0.82] tracking-[-0.06em] text-[color:var(--headline-soft)]">
            Walters Mann
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} Walters Mann</p>
          <div className="flex flex-wrap gap-4">
            {personal.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                className="transition-colors hover:text-fg"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
