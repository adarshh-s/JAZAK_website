# JAZAK website

React + Vite build of the jazak.qa homepage, following *JAZAK Website Moodboard v1* (dark graphite, signal red, Archivo Expanded / Instrument Sans / JetBrains Mono) and the copy in *JAZAK Homepage Content 1st draft*.

```
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

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
