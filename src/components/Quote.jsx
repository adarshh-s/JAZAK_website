import { useEffect, useRef, useState } from 'react'
import { contact, quote, services } from '../data/content'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { Arrow } from './Graphics'

const empty = { name: '', company: '', phone: '', email: '', service: '', location: '', details: '' }

// PHP handler in public/api (runs on PHP hosting such as Hostinger).
const ENDPOINT = '/api/send-quote.php'

export default function Quote({ prefill, head = true }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle')
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())

  useEffect(() => {
    if (!prefill) return
    setForm((f) => ({
      ...f,
      service: prefill.service ?? f.service,
      details: prefill.details && !f.details.includes(prefill.details) ? prefill.details + f.details : f.details,
    }))
    setStatus('idle')
  }, [prefill])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name.'
    if (!form.phone.trim() && !form.email.trim()) er.phone = 'Add a phone number or email so we can reply.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'This email address looks incomplete.'
    if (!form.service) er.service = 'Choose the service you need.'
    return er
  }

  const mailtoHref = () => {
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Phone: ${form.phone || '-'}`,
      `Email: ${form.email || '-'}`,
      `Service: ${form.service}`,
      `Project location: ${form.location || '-'}`,
      '',
      form.details,
    ].join('\n')
    const subject = `Quotation request: ${form.service}`
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot, elapsed: Date.now() - startedAt.current }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.ok) {
        setStatus('sent')
        setForm(empty)
        return
      }
      if (res.status === 422 && data?.fields) {
        setErrors(data.fields)
        setStatus('idle')
        return
      }
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const field = (key, label, props = {}) => (
    <label className={`field ${errors[key] ? 'has-error' : ''}`}>
      <span className="field__label mono">{label}</span>
      <input value={form[key]} onChange={set(key)} aria-invalid={!!errors[key]} {...props} />
      {errors[key] && <span className="field__error">{errors[key]}</span>}
    </label>
  )

  return (
    <section id="quote" className={`section section--contact ${head ? '' : 'section--flush'}`}>
      <div className="container">
        {head && (
          <SectionHead code="JZ-07" eyebrow="Quote · Contact" title={quote.headline}>
            {quote.supporting}
          </SectionHead>
        )}

        <div className="contact-layout">
          <Reveal as="form" className="quote-form" onSubmit={onSubmit} noValidate>
            <div className="quote-form__grid">
              {field('name', 'Full name', { autoComplete: 'name', required: true })}
              {field('company', 'Company', { autoComplete: 'organization' })}
              {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
              <label className={`field ${errors.service ? 'has-error' : ''}`}>
                <span className="field__label mono">Service required</span>
                <select value={form.service} onChange={set('service')} aria-invalid={!!errors.service} required>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.items.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
                {errors.service && <span className="field__error">{errors.service}</span>}
              </label>
              {field('location', 'Project location', { placeholder: 'e.g. Al Wakra' })}
              {/* Spam trap: hidden from people, bots fill it in. */}
              <label className="field--trap" aria-hidden="true">
                Website
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
              <label className="field field--wide">
                <span className="field__label mono">Project details</span>
                <textarea
                  rows="5"
                  value={form.details}
                  onChange={set('details')}
                  placeholder="Scope, plot size, drawings available, target start date"
                />
              </label>
            </div>
            <div className="quote-form__foot">
              <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : quote.cta} {status !== 'sending' && <Arrow />}
              </button>
              <p className={`mono quote-form__note ${status === 'error' ? 'is-error' : ''} ${status === 'sent' ? 'is-sent' : ''}`} role="status" aria-live="polite">
                {status === 'sent' && 'Thank you. Your enquiry has been sent and our team will be in touch shortly.'}
                {status === 'error' && (
                  <>
                    Sorry, the enquiry could not be sent. Please{' '}
                    <a href={mailtoHref()}>email it to us instead</a> or call {contact.phone}.
                  </>
                )}
                {(status === 'idle' || status === 'sending') && `Sent to ${contact.email}`}
              </p>
            </div>
          </Reveal>

          <Reveal className="contact-card" delay={140}>
            <p className="mono muted">Contact · Qatar address plate</p>
            <div className="plate">
              <div><span className="mono">Zone</span><strong>{contact.plate.zone}</strong></div>
              <div><span className="mono">Street</span><strong>{contact.plate.street}</strong></div>
              <div><span className="mono">Bldg</span><strong>{contact.plate.building}</strong></div>
            </div>
            <dl className="contact-list">
              <div><dt className="mono">Unit</dt><dd>{contact.plate.unit}</dd></div>
              <div><dt className="mono">Call</dt><dd><a href={contact.phoneHref}>{contact.phone}</a></dd></div>
              <div><dt className="mono">Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
              {contact.whatsapp && (
                <div><dt className="mono">WhatsApp</dt><dd><a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}>{contact.whatsapp}</a></dd></div>
              )}
            </dl>
            <a
              className="link-arrow"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
