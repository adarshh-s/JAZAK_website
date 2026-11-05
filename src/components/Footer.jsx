import { Link } from 'react-router-dom'
import { contact, footer } from '../data/content'
import { navRoutes } from '../data/routes'
import { Contours } from './Graphics'
import mark from '../assets/jazak-mark.png'

export default function Footer() {
  return (
    <footer className="footer">
      <Contours className="footer__contours" width={1600} height={600} seed={11} hills={6} />
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="brand">
            <img src={mark} alt="" width="36" height="36" />
            <span className="brand__word">JAZAK</span>
          </Link>
          <p className="mono muted">Trading Contracting &amp; Services</p>
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {navRoutes.map((r) => (
            <Link key={r.path} to={r.path}>
              {r.label}
            </Link>
          ))}
        </nav>
        <div className="footer__contact">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.web}</span>
        </div>
      </div>
      <div className="container footer__base mono">
        <span>{footer.copyright}</span>
        <span>Box Park · Zone 19 · Doha</span>
      </div>
      <div className="footer__word" aria-hidden="true">JAZAK</div>
    </footer>
  )
}
