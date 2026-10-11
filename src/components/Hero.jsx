import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/content'
import { Arrow, Contours, Diamond, SawtoothRing } from './Graphics'
import { gsap, useGSAP, reducedMotion } from '../motion/gsap'
import mark from '../assets/jazak-mark.png'

const FILM = '/media/hero-film.mp4'
const POSTER = '/media/hero-poster.jpg'

export default function Hero() {
  const videoRef = useRef(null)
  const rootRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reducedMotion()) {
      v.pause()
      setPlaying(false)
    }
  }, [])

  useGSAP(
    () => {
      if (reducedMotion()) return
      // Intro: film settles, headline lines rise out of their masks, then the details.
      gsap
        .timeline({ defaults: { ease: 'build' } })
        .from('.hero__video', { scale: 1.18, autoAlpha: 0, duration: 2.4 })
        .from('.hero__title .line > span', { yPercent: 108, duration: 1.4, stagger: 0.14 }, 0.3)
        .from('.hero__foot', { autoAlpha: 0, y: 24, duration: 1.1 }, 1.0)
        .from('.hero__foot', { '--rule': 0, duration: 1.4 }, 1.0)
        .from('.hero__badge', { autoAlpha: 0, scale: 0.8, rotate: -40, duration: 1.4 }, 1.1)
        .from('.hero__bar', { autoAlpha: 0, duration: 1 }, 1.4)

      // Scrolling away: the film pushes in and dims; text fades in place (no text parallax).
      const st = { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__media', { scale: 1.12, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__shade', { opacity: 1, backgroundColor: 'rgba(15,14,14,0.55)', ease: 'none', scrollTrigger: st })
      gsap.to(['.hero__body', '.hero__bar', '.hero__badge'], {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { ...st, end: '60% top' },
      })
    },
    { scope: rootRef },
  )

  const toggleFilm = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="top" ref={rootRef} className="hero" aria-label="Introduction">
      <div className="hero__media" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={FILM}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero__shade" />
        <Contours className="hero__contours" seed={21} hills={8} live />
        <div className="hero__grid" />
      </div>

      <div className="hero__body container">
        <h1 className="hero__title">
          <span className="line"><span>{hero.headline[0]}</span></span>
          <span className="line">
            <span>
              <span className="muted-stone">{hero.headline[1]}</span>{' '}
              <span className="accent">{hero.headline[2]}</span>
            </span>
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lede">{hero.supporting}</p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              {hero.cta} <Arrow />
            </a>
            <span className="mono hero__caption">
              <Diamond size={8} /> {hero.caption}
            </span>
          </div>
        </div>
      </div>

      <div className="hero__badge" aria-hidden="true">
        <SawtoothRing size={132} className="spin" />
        <img src={mark} alt="" width="54" height="54" />
      </div>

      <div className="hero__bar container">
        <a href="#integrated" className="mono hero__scroll">
          <span className="hero__scroll-line" /> Scroll · Foundation to handover
        </a>
        <button type="button" className="mono hero__film-toggle" onClick={toggleFilm} aria-label={playing ? 'Pause background film' : 'Play background film'}>
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
          )}
          {playing ? 'Pause film' : 'Play film'}
        </button>
      </div>
    </section>
  )
}
