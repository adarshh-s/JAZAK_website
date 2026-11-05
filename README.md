# JAZAK website

React + Vite build of the jazak.qa homepage, following *JAZAK Website Moodboard v1* (dark graphite, signal red, Archivo Expanded / Instrument Sans / JetBrains Mono) and the copy in *JAZAK Homepage Content 1st draft*.

```
npm install
npm run dev      # local dev server
npm run build    # production build in dist/ (prerendered, see below)
npm run preview  # serve dist/ locally
```

## Pages and SEO
| URL | Page |
| --- | --- |
| `/` | Home (one scroll: hero to quote) |
| `/services` | Seven services, the integrated line, quote form |
| `/projects` | Map and full project gallery |
| `/materials` | Materials catalogue, quote form |
| `/about` | About, why choose JAZAK, values, Chairman's message |
| `/contact` | Quote form and address plate |

`/home` redirects to `/` (one canonical homepage avoids duplicate content).

- Each page's title, description and priority live in `src/data/routes.js`, which drives the router, nav, `<head>` tags and sitemap.
- `npm run build` prerenders every page to `dist/<page>/index.html` with real content and its own title, description, canonical and Open Graph tags. The homepage also carries `GeneralContractor` structured data. It writes `sitemap.xml`, `robots.txt` and `404.html` too.
- Any static host works (Netlify, Vercel, Cloudflare Pages, nginx): `/services` is served from `services/index.html`. Set the host's 404 page to `404.html`.
- The site URL is set to `https://www.jazak.qa` in `src/data/routes.js`; change it there if the live domain differs.

- All copy lives in `src/data/content.js`.
- Hero film: `public/media/hero-film.mp4` (+ `hero-poster.jpg`), a 21s loop cut from free Mixkit stock clips (Mixkit License: excavator, steel frames, concrete tower, sunset). Replace it with JAZAK's drone/site footage, keeping the same filenames.
- Photos in `src/assets/photos/profile/` come from the JAZAK company profile (pages 3, 7, 9, 11–19).

## Waiting on the client
- Project names, areas and JAZAK's role on each project; real map pin locations (pins are samples now)
- WhatsApp number (`contact.whatsapp`; the row appears once it is set)
- Chairman's confirmation that his message and photo can be used on the website
- Permission before showing the three past client names in the profile (not used)
- A projects page for the full gallery (the button currently expands the homepage gallery)
- A form backend. For now the quote form opens the visitor's mail app addressed to info@jazak.qa
