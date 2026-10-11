import { useEffect, useState } from 'react'
import { contact, quote, services } from '../data/content'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { Arrow } from './Graphics'

const empty = { name: '', company: '', phone: '', email: '', service: '', location: '', details: '' }

export default function Quote({ prefill }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!prefill) return
    setForm((f) => ({
      ...f,
      service: prefill.service ?? f.service,
      details: prefill.details && !f.details.includes(prefill.details) ? prefill.details + f.details : f.details,
    }))
    setSent(false)
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

  // No backend yet: the enquiry opens in the visitor's mail app, addressed to JAZAK.
  const onSubmit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return
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
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = (key, label, props = {}) => (
    <label className={`field ${errors[key] ? 'has-error' : ''}`}>
      <span className="field__label mono">{label}</span>
      <input value={form[key]} onChange={set(key)} aria-invalid={!!errors[key]} {...props} />
      {errors[key] && <span className="field__error">{errors[key]}</span>}
    </label>
  )

  return (
    <section id="contact" className="section section--contact">
      <div className="container">
        <SectionHead code="JZ-07" eyebrow="Quote · Contact" title={quote.headline}>
          {quote.supporting}
        </SectionHead>

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
              <button type="submit" className="btn btn--primary">
                {quote.cta} <Arrow />
              </button>
              <p className="mono quote-form__note" role="status">
                {sent ? 'Your mail app has opened with the enquiry. Press send to reach our team.' : `Sent to ${contact.email}`}
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
