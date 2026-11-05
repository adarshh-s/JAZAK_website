import { materials } from '../data/content'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { Arrow } from './Graphics'

import cement from '../assets/photos/materials/cement.jpg'
import blocks from '../assets/photos/materials/blocks.jpg'
import aggregates from '../assets/photos/materials/aggregates.jpg'
import tiles from '../assets/photos/materials/tiles.jpg'
import paints from '../assets/photos/materials/paints.jpg'
import gypsum from '../assets/photos/materials/gypsum.jpg'

// Stock product photos (Unsplash License). Swap in the client's own photos when available.
const photos = { cement, blocks, aggregates, tiles, paints, gypsum }

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
              <div className="material__photo">
                <img src={photos[m.glyph]} alt={m.name} width="1200" height="675" loading="lazy" decoding="async" />
                <span className="mono material__index">M-{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="material__body">
                <h3 className="h3">{m.name}</h3>
                <p>{m.text}</p>
              </div>
              <a
                href="#quote"
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
            href="#quote"
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
