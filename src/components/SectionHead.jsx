import Reveal from './Reveal'
import { Eyebrow } from './Graphics'

// Drawing-sheet header: code + label in the left column, headline on the right.
export default function SectionHead({ code, eyebrow, title, children, aside }) {
  return (
    <div className="section-head">
      <Reveal className="section-head__label">
        <Eyebrow code={code}>{eyebrow}</Eyebrow>
      </Reveal>
      <div className="section-head__main">
        <Reveal as="h2" className="h2" delay={80}>
          {title}
        </Reveal>
        {children && (
          <Reveal as="p" className="lede" delay={160}>
            {children}
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal className="section-head__aside" delay={240}>
          {aside}
        </Reveal>
      )}
    </div>
  )
}
