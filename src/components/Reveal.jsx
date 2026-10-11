import { useInView } from '../hooks/motion'

// "Stack up": children rise in courses, like blockwork.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// "Line draw": a hairline rule that draws in from the left.
export function Rule({ accent = false, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`rule ${accent ? 'rule--accent' : ''} ${inView ? 'is-in' : ''} ${className}`}
    />
  )
}
