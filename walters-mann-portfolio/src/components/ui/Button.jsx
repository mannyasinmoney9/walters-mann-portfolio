import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-flame-500 text-ink-950 hover:bg-flame-400 border border-flame-500 hover:border-flame-400',
  outline:
    'bg-transparent text-fg border border-strong-line hover:border-accent hover:text-accent',
  ghost:
    'bg-transparent text-fg border border-transparent hover:text-accent',
}

const sizes = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2
        font-mono uppercase tracking-[0.18em] font-medium
        rounded-full transition-all duration-300 ease-out
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Button
