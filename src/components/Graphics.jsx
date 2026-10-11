import { useMemo } from 'react'

// Deterministic pseudo-random so contours don't change between renders.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Closed Catmull-Rom curve through points, as an SVG path.
function smoothLoop(pts) {
  const n = pts.length
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return `${d}Z`
}

function buildContours(width, height, seed, hills) {
  const rand = seeded(seed)
  const paths = []
  for (let h = 0; h < hills; h++) {
    const cx = rand() * width
    const cy = rand() * height
    const levels = 6 + Math.floor(rand() * 7)
    const gap = 26 + rand() * 22
    const ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28]
    const amp = [0.14 + rand() * 0.12, 0.06 + rand() * 0.08, 0.04 + rand() * 0.05]
    const stretch = 0.6 + rand() * 0.8
    for (let k = 1; k <= levels; k++) {
      const r = k * gap
      const pts = []
      const steps = 28
      for (let i = 0; i < steps; i++) {
        const t = (i / steps) * Math.PI * 2
        const wobble =
          1 +
          amp[0] * Math.sin(2 * t + ph[0] + k * 0.18) +
          amp[1] * Math.sin(3 * t + ph[1] - k * 0.12) +
          amp[2] * Math.sin(5 * t + ph[2])
        pts.push([cx + Math.cos(t) * r * wobble * (1 + stretch * 0.4), cy + Math.sin(t) * r * wobble])
      }
      paths.push({ d: smoothLoop(pts), level: k, hill: h })
    }
  }
  return paths
}

// Survey contours used as Mapbox-style brand texture.
export function Contours({ width = 1600, height = 900, seed = 7, hills = 7, accentEvery = 5, className = '', live = false }) {
  const paths = useMemo(() => buildContours(width, height, seed, hills), [width, height, seed, hills])
  return (
    <svg
      className={`contours ${live ? 'contours--live' : ''} ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          className={p.level % accentEvery === 0 ? 'contour contour--accent' : 'contour'}
          style={{ '--i': i % 9 }}
        />
      ))}
    </svg>
  )
}

// Sawtooth ring from the logo: loaders, dividers, the hero badge.
export function SawtoothRing({ size = 120, teeth = 44, className = '' }) {
  const d = useMemo(() => {
    const R = 50
    const rOuter = 44
    const rInner = 38
    let path = ''
    for (let i = 0; i < teeth * 2; i++) {
      const r = i % 2 === 0 ? rOuter : rInner
      const a = (i / (teeth * 2)) * Math.PI * 2 - Math.PI / 2
      path += `${i === 0 ? 'M' : 'L'}${(R + Math.cos(a) * r).toFixed(2)},${(R + Math.sin(a) * r).toFixed(2)}`
    }
    return `${path}Z`
  }, [teeth])
  return (
    <svg className={`sawtooth ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  )
}

export function Diamond({ filled = true, size = 10, className = '' }) {
  return (
    <svg className={`diamond ${className}`} width={size} height={size} viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 0.6 9.4 5 5 9.4 0.6 5Z" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg className={`arrow ${className}`} width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
      <path d="M0 5h12M8.5 1.2 12.4 5 8.5 8.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

// Section eyebrow in drawing-sheet style: "JZ-03 · SERVICES".
export function Eyebrow({ code, children }) {
  return (
    <p className="eyebrow">
      {code && <span className="eyebrow__code">{code}</span>}
      <span>{children}</span>
    </p>
  )
}
