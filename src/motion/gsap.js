import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase, useGSAP)

// Moodboard JZ-08: slow and mechanical, like a crane. Never bounces.
CustomEase.create('build', '0.6, 0, 0.2, 1')
gsap.defaults({ ease: 'build', duration: 1 })

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, Flip, useGSAP }
