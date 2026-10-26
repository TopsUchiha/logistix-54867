'use client'

import { useState, type FormEvent } from 'react'
import { Check, Send } from 'lucide-react'

const field =
  'w-full rounded-sm border border-input bg-white px-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-sm bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,26,43,0.08)]">
        <span className="grid h-14 w-14 place-items-center rounded-sm bg-brand text-white">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-extrabold text-navy">Thanks, we got it</h2>
        <p className="text-muted-foreground">Your message is with our team. We’ll reply soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-sm bg-white p-6 shadow-[0_4px_24px_rgba(11,26,43,0.08)] sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold text-navy">
          Name
          <input name="name" required autoComplete="name" placeholder="Your name" className={`${field} h-12`} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-navy">
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={`${field} h-12`} />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-bold text-navy">
        What can we help with?
        <textarea name="message" required rows={5} placeholder="Tell us about your shipment…" className={`${field} py-3`} />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-sm bg-brand px-7 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-hover"
      >
        Send enquiry
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  )
}
