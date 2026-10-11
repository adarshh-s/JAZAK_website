import { useState } from 'react'
import { values } from '../data/content'
import Reveal, { Rule } from './Reveal'
import SectionHead from './SectionHead'
import { Arrow, Diamond } from './Graphics'

export default function Values() {
  const { chairman } = values
  const [open, setOpen] = useState(false)

  return (
    <section id="values" className="section">
      <div className="container">
        <SectionHead code="JZ-06" eyebrow="Values · Chairman" title={values.headline}>
          {values.supporting}
        </SectionHead>

        <div className="values-grid">
          {values.items.map((v, i) => (
            <Reveal key={v.title} className="value" delay={(i % 3) * 90}>
              <Diamond size={9} className="accent" />
              <h3 className="h3">{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="chairman">
          <Reveal className="chairman__portrait">
            <div className="portrait-frame">
              <img src={chairman.photo} alt={`${chairman.name}, ${chairman.role}`} loading="lazy" />
              <span className="dim dim--h mono" aria-hidden="true">
                <span>Chairman</span>
              </span>
              <span className="dim dim--v mono" aria-hidden="true">
                <span>Est. 2021</span>
              </span>
            </div>
            <p className="chairman__name">{chairman.name}</p>
            <p className="mono chairman__role">{chairman.role}</p>
          </Reveal>

          <div className="chairman__body">
            <Reveal as="p" className="mono accent">
              Chairman&apos;s message
            </Reveal>
            <Rule accent />
            <Reveal as="blockquote" className="chairman__quote" delay={120}>
              <p>&ldquo;{chairman.quote}&rdquo;</p>
            </Reveal>
            <div id="chairman-full" className={`chairman__full ${open ? 'is-open' : ''}`} hidden={!open}>
              {chairman.full.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="mono muted">
                {chairman.name} · {chairman.role}
              </p>
            </div>
            <Reveal delay={220}>
              <button
                type="button"
                className="link-arrow"
                aria-expanded={open}
                aria-controls="chairman-full"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? 'Close the message' : chairman.cta} <Arrow className={open ? 'arrow--up' : ''} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
