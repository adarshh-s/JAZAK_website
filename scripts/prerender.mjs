// Renders every route to static HTML so each URL (/services, /projects, ...)
// ships real content, its own <title>/description/canonical, and works on any
// static host. Runs after `vite build` and the SSR build (see package.json).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, routes, SITE, headTags } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const page = (route, html) =>
  template.replace('<!--head-tags-->', headTags(route)).replace('<div id="root"></div>', `<div id="root">${html}</div>`)

for (const route of routes) {
  const out = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, page(route, render(route.path)))
  console.log('  prerendered', route.path)
}

// 404 page (served by most static hosts for unknown URLs), kept out of the index.
const notFound = { path: '/404', title: 'Page not found | JAZAK', description: 'This page could not be found.' }
fs.writeFileSync(
  path.join(dist, '404.html'),
  page(notFound, render('/404')).replace('<link rel="canonical"', '<meta name="robots" content="noindex" />\n    <link rel="canonical"'),
)

// /home is a friendly alias: permanent pointer to the canonical homepage.
fs.mkdirSync(path.join(dist, 'home'), { recursive: true })
fs.writeFileSync(
  path.join(dist, 'home', 'index.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>JAZAK</title>` +
    `<link rel="canonical" href="${SITE.url}/"><meta name="robots" content="noindex">` +
    `<meta http-equiv="refresh" content="0; url=/"></head><body><a href="/">JAZAK home</a></body></html>`,
)

const today = new Date().toISOString().slice(0, 10)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes
      .map((r) => `  <url><loc>${SITE.url}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`)
      .join('\n') +
    `\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)

fs.rmSync(serverDir, { recursive: true, force: true })
console.log('  wrote 404.html, home/, sitemap.xml, robots.txt')
