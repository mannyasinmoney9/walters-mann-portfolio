export default function Marquee({ items, speed = 'normal', className = '' }) {
  const animationClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'
  const list = [...items, ...items]

  return (
    <div className={`relative overflow-hidden mask-fade-x ${className}`}>
      <div className={`flex w-max ${animationClass}`} style={{ willChange: 'transform' }}>
        {list.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-5 px-6 font-display text-3xl italic text-muted md:text-5xl"
          >
            <span>{item}</span>
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
