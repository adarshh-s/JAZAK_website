// One entry per page: drives the router, the nav, <head> tags, the prerender
// script and sitemap.xml. Keep titles under ~60 chars, descriptions ~150.
export const SITE = {
  url: 'https://www.jazak.qa',
  name: 'JAZAK Trading Contracting & Services',
  image: '/media/hero-poster.jpg',
}

export const routes = [
  {
    path: '/',
    label: 'Home',
    title: 'JAZAK | Building Contractor in Doha, Qatar',
    description:
      'Licensed building contractor in Doha, Qatar. Civil and structural works, finishing, renovation, landscape and building materials supply, all under one roof.',
    priority: '1.0',
  },
  {
    path: '/services',
    label: 'Services',
    title: 'Construction Services in Qatar | JAZAK',
    description:
      'Seven disciplines from one contractor: general building, civil and structural works, finishing, renovation, hardscape and landscape, contracting and materials trading.',
    priority: '0.9',
  },
  {
    path: '/projects',
    label: 'Projects',
    title: 'Projects | Villas & Civil Works in Qatar | JAZAK',
    description:
      'Proof of work from JAZAK sites across Qatar: reinforcement and formwork, villa structures, finished interiors, pools and external works.',
    priority: '0.8',
  },
  {
    path: '/materials',
    label: 'Materials',
    title: 'Building Materials Supplier in Doha | JAZAK Trading',
    description:
      'Cement, blocks, sand and aggregates, tiles, paints and gypsum from JAZAK’s licensed trading division. Quality-assured and competitively priced in Doha.',
    priority: '0.8',
  },
  {
    path: '/about',
    label: 'About',
    title: 'About JAZAK | Contractor in Doha Since 2021',
    description:
      'Established in Doha in 2021, JAZAK is a licensed, multi-disciplinary construction firm. Our values, why clients choose us, and a message from our Chairman.',
    priority: '0.7',
  },
  {
    path: '/contact',
    label: 'Contact',
    title: 'Request a Quotation | Contact JAZAK Doha',
    description:
      'Tell us about your project and receive a clear, itemised quotation. Call +974 3366 3100, email info@jazak.qa or visit us at Box Park, Zone 19, Doha.',
    priority: '0.9',
  },
]

export const navRoutes = routes.filter((r) => r.path !== '/')
export const routeFor = (path) => routes.find((r) => r.path === path)
