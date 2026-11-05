import { SITE } from './data/routes'
import { contact } from './data/content'

const canonical = (path) => SITE.url + (path === '/' ? '/' : path)

// Structured data so search engines can show JAZAK as a local business.
export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/favicon.png`,
  image: SITE.url + SITE.image,
  telephone: contact.phone,
  email: contact.email,
  foundingDate: '2021',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 3, Box Park, Building 415, Street 200, Zone 19',
    addressLocality: 'Doha',
    addressCountry: 'QA',
  },
  areaServed: { '@type': 'Country', name: 'Qatar' },
}

export function headTags(route) {
  const url = canonical(route.path)
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE.url + SITE.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (route.path === '/') {
    tags.push(`<script type="application/ld+json">${JSON.stringify(businessSchema)}</script>`)
  }
  return tags.join('\n    ')
}

// Client-side navigation: keep <head> in sync with the current page.
export function applyHead(route) {
  document.title = route.title
  // Tags exist in prerendered HTML; create them in dev where they do not.
  const set = (selector, attr, value) => {
    let el = document.head.querySelector(selector)
    if (!el) {
      const [, tag, key, name] = selector.match(/^(\w+)\[(\w+(?::\w+)?)="([^"]+)"\]$/)
      el = document.createElement(tag)
      el.setAttribute(key, name)
      document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
  }
  const url = canonical(route.path)
  set('meta[name="description"]', 'content', route.description)
  set('link[rel="canonical"]', 'href', url)
  set('meta[property="og:title"]', 'content', route.title)
  set('meta[property="og:description"]', 'content', route.description)
  set('meta[property="og:url"]', 'content', url)
}
