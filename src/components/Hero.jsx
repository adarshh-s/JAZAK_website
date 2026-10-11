import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/content'
import { Arrow, Contours, Diamond, SawtoothRing } from './Graphics'
import { prefersReducedMotion } from '../hooks/motion'
import mark from '../assets/jazak-mark.png'

const FILM = '/media/hero-film.mp4'
const POSTER = '/media/hero-poster.jpg'

export default function Hero() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (prefersReducedMotion()) {
      v.pause()
      setPlaying(false)
    }
  }, [])

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
    <section id="top" className="hero" aria-label="Introduction">
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
