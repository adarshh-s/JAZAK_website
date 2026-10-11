import { contact, footer, nav } from '../data/content'
import { Contours } from './Graphics'
import mark from '../assets/jazak-mark.png'

export default function Footer() {
  return (
    <footer className="footer">
      <Contours className="footer__contours" width={1600} height={600} seed={11} hills={6} />
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="brand">
            <img src={mark} alt="" width="36" height="36" />
            <span className="brand__word">JAZAK</span>
          </a>
          <p className="mono muted">Trading Contracting &amp; Services</p>
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
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
