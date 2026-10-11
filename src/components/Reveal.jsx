import { useRef } from 'react'
import { gsap, useGSAP, reducedMotion } from '../motion/gsap'

const variants = {
  // "Stack up": rises in courses, like blockwork.
  up: { from: { y: 44, autoAlpha: 0 }, to: { y: 0, autoAlpha: 1, duration: 1.1 } },
  // Headings are uncovered from the bottom edge, like a slab being cast.
  mask: {
    from: { y: 36, clipPath: 'inset(0% 0% 100% 0%)' },
    to: { y: 0, clipPath: 'inset(0% 0% -10% 0%)', duration: 1.2 },
  },
  fade: { from: { autoAlpha: 0 }, to: { autoAlpha: 1, duration: 1.2 } },
}

export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className = '', children, ...rest }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      const v = variants[variant] ?? variants.up
      gsap.fromTo(ref.current, v.from, {
        ...v.to,
        delay: delay / 1000,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// "Line draw": a hairline rule that draws in from the left.
export function Rule({ accent = false, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true } },
      )
    },
    { scope: ref },
  )

  return <span ref={ref} aria-hidden="true" className={`rule ${accent ? 'rule--accent' : ''} ${className}`} />
}

// Images drift inside their frame as the page scrolls. Never applied to text.
export function useParallax(scopeRef, selector, amount = 8) {
  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap.utils.toArray(selector).forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -amount, scale: 1 + amount / 40 },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: scopeRef },
  )
}
