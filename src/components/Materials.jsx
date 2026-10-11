import { materials } from '../data/content'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { Arrow } from './Graphics'

// Line-drawn glyphs stand in for product photos until the client supplies them.
const glyphs = {
  cement: (
    <>
      <path d="M30 26h60l6 64H24z" />
      <path d="M30 26c10 6 50 6 60 0M36 44h48M38 58h44" />
      <text x="60" y="78" textAnchor="middle">OPC 42.5</text>
    </>
  ),
  blocks: (
    <>
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect key={`${r}${c}`} x={22 + c * 38 + (r % 2) * 19} y={30 + r * 20} width="36" height="18" />
        )),
      )}
      <path d="M22 96h76" />
    </>
  ),
  aggregates: (
    <>
      <path d="M16 92c14-30 30-48 44-48s30 18 44 48z" />
      {[[40, 80], [52, 70], [64, 76], [74, 66], [58, 60], [82, 84], [46, 88], [68, 88]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} />
      ))}
    </>
  ),
  tiles: (
    <>
      <path d="M60 18 100 40 60 62 20 40z" />
      <path d="M40 29l40 22M80 29 40 51" />
      <path d="M20 40v14l40 22 40-22V40" />
    </>
  ),
  paints: (
    <>
      <ellipse cx="60" cy="34" rx="30" ry="8" />
      <path d="M30 34v50c0 4 13 8 30 8s30-4 30-8V34" />
      <path d="M30 34c0 0 0-14 30-14s30 14 30 14" strokeDasharray="3 4" />
      <path d="M48 56h24v16H48z" />
    </>
  ),
  gypsum: (
    <>
      <path d="M26 24h52l16 12v62H42L26 86z" />
      <path d="M78 24v12h16M26 86h16v12" />
      <path d="M40 50h40M40 62h40M40 74h28" strokeDasharray="2 4" />
    </>
  ),
}

export default function Materials({ onPick }) {
  return (
    <section id="materials" className="section section--materials">
      <div className="container">
        <SectionHead code="JZ-04" eyebrow="Supply · Materials trading" title={materials.headline}>
          {materials.supporting}
        </SectionHead>

        <div className="materials-grid">
          {materials.items.map((m, i) => (
            <Reveal as="article" key={m.name} className="material" delay={(i % 3) * 90}>
              <div className="material__glyph">
                <svg viewBox="0 0 120 110" aria-hidden="true">{glyphs[m.glyph]}</svg>
                <span className="mono material__index">M-{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="material__body">
                <h3 className="h3">{m.name}</h3>
                <p>{m.text}</p>
              </div>
              <a
                href="#contact"
                className="material__enquire mono"
                onClick={() => onPick({ service: 'Building Materials Trading', details: `Materials enquiry: ${m.name}\n` })}
              >
                Enquire <Arrow />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="materials-more">
          {materials.more}
        </Reveal>

        <div className="section-cta">
          <a
            href="#contact"
            className="btn btn--primary"
            onClick={() => onPick({ service: 'Building Materials Trading' })}
          >
            {materials.cta} <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
