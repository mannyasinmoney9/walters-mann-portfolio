import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from 'react-icons/fi'
import { personal } from '../../data/personal'
import { EASE_SOFT, SPRING_GENTLE } from '../../lib/motion'
import Reveal from '../ui/Reveal'

const PROFILE_FIELDS = [
  { label: 'Name', value: personal.name },
  { label: 'Email', value: personal.email },
  { label: 'Title', value: personal.subject },
  { label: 'Company', value: personal.company },
]

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [copied, setCopied] = useState('')
  const copyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  async function onSubmit(data) {
    setStatus({ type: 'sending', message: 'Sending your message...' })
    const { serviceId, templateId, publicKey } = personal.emailjs

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: data.name,
            from_email: data.email,
            company: data.company || 'Not provided',
            subject: data.subject,
            message: data.message,
            to_email: personal.email,
            reply_to: data.email,
          },
          { publicKey },
        )

        setStatus({
          type: 'success',
          message: `Thanks ${data.name.split(' ')[0]}. Your message landed safely and I will reply as soon as I can.`,
        })
        reset()
        return
      }

      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : '',
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n')

      const subject = data.subject || 'New message from your portfolio'
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`

      setStatus({
        type: 'success',
        message: `Your mail app should open with a draft addressed to ${personal.email}.`,
      })
      reset()
    } catch (error) {
      console.error(error)
      setStatus({
        type: 'error',
        message: `Something went wrong. Email me directly at ${personal.email} and I will still get it.`,
      })
    }
  }

  function copyValue(label, value) {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        if (copyTimerRef.current) {
          window.clearTimeout(copyTimerRef.current)
        }
        setCopied(label)
        copyTimerRef.current = window.setTimeout(() => {
          setCopied('')
          copyTimerRef.current = null
        }, 1800)
      })
      .catch(() => {})
  }

  return (
    <section id="contact" className="section-shell">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>

        <div className="mt-6 grid gap-10 xl:grid-cols-[0.42fr_0.58fr]">
          <div className="grid gap-4">
            <Reveal>
              <div className="panel rounded-[2rem] p-6 md:p-7">
                <h2 className="display max-w-3xl text-4xl text-fg md:text-6xl">
                  If the role is meaningful, I want to hear about it.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                  I am especially interested in senior backend, full-stack, platform, and
                  cloud-heavy roles where engineering quality matters beyond the sprint.
                </p>
              </div>
            </Reveal>

            <Reveal delay={40}>
              <div className="panel-soft rounded-[1.9rem] p-5 md:p-6">
                <p className="eyebrow">Credential snapshot</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {PROFILE_FIELDS.map((field) => (
                    <div
                      key={field.label}
                      className="rounded-[1.2rem] border border-line bg-[var(--panel)] px-4 py-4"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {field.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-fg">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                <div className="panel-soft rounded-[1.7rem] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel)] text-accent">
                      <FiMail size={17} />
                    </span>
                    <button
                      type="button"
                      onClick={() => copyValue('email', personal.email)}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {copied === 'email' ? <FiCheck size={16} /> : <FiCopy size={16} />}
                    </button>
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="mt-3 block text-base text-fg transition-colors hover:text-accent"
                  >
                    {personal.email}
                  </a>
                </div>

                <div className="panel-soft rounded-[1.7rem] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel)] text-accent">
                      <FiPhone size={17} />
                    </span>
                    <button
                      type="button"
                      onClick={() => copyValue('phone', personal.phoneRaw)}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {copied === 'phone' ? <FiCheck size={16} /> : <FiCopy size={16} />}
                    </button>
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${personal.phoneRaw}`}
                    className="mt-3 block text-base text-fg transition-colors hover:text-accent"
                  >
                    {personal.phone}
                  </a>
                </div>

                <div className="panel-soft rounded-[1.7rem] p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[var(--panel)] text-accent">
                    <FiMapPin size={17} />
                  </span>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Location
                  </p>
                  <p className="mt-3 text-base text-fg">{personal.location}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {personal.availability}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="panel rounded-[2rem] p-6 md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Send a direct message
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder={personal.name}
                    autoComplete="name"
                    {...register('name', {
                      required: 'Required',
                      minLength: { value: 2, message: 'Too short' },
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder={personal.email}
                    autoComplete="email"
                    {...register('email', {
                      required: 'Required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder={personal.company}
                    autoComplete="organization"
                    {...register('company')}
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Subject *
                  </label>
                  <input
                    type="text"
                    placeholder={personal.subject}
                    {...register('subject', {
                      required: 'Required',
                      minLength: { value: 3, message: 'Too short' },
                    })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell me about the role, the team, or what you are building."
                    {...register('message', {
                      required: 'Required',
                      minLength: { value: 12, message: 'Please add a little more detail' },
                    })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  The fastest way to reach me is still email, but this form works too. If
                  EmailJS is not configured, it falls back to a prefilled email draft.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || status.type === 'sending'}
                  className="premium-action inline-flex items-center justify-center gap-2 rounded-full bg-flame-500 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status.type === 'sending' ? 'Sending...' : 'Send message'}
                  <FiSend size={15} />
                </button>
              </div>

              <AnimatePresence>
                {status.type !== 'idle' && status.type !== 'sending' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.34, ease: EASE_SOFT },
                      y: SPRING_GENTLE,
                    }}
                    className={`mt-6 rounded-[1.2rem] border px-4 py-4 text-sm leading-relaxed ${
                      status.type === 'success'
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-fg'
                        : 'border-red-500/30 bg-red-500/10 text-fg'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 border-t border-line pt-5">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                >
                  Prefer email instead?
                  <span className="link-underline">Write to me directly</span>
                  <FiArrowUpRight size={14} />
                </a>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
