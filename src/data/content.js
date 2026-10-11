// Homepage copy from "JAZAK Homepage Content 1st draft", extended with the
// company profile (About, Why choose JAZAK, full Chairman's message).
// Items marked TODO are waiting on the client (see the draft's summary page).
// Photos from the JAZAK company profile (pages 3, 7, 9 and 11–19).
import arched from '../assets/photos/profile/arched-villa-facade.jpg'
import majlis from '../assets/photos/profile/majlis-ceiling-lighting.jpg'
import kitchen from '../assets/photos/profile/kitchen-dining-ceiling.jpg'
import livingHall from '../assets/photos/profile/living-hall-feature-wall.jpg'
import slabRebar from '../assets/photos/profile/slab-reinforcement.jpg'
import columnCage from '../assets/photos/profile/column-cage-excavation.jpg'
import columnFormwork from '../assets/photos/profile/column-formwork.jpg'
import nightExcavation from '../assets/photos/profile/night-excavation.jpg'
import blockwork from '../assets/photos/profile/blockwork-scaffold.jpg'
import pool from '../assets/photos/profile/pool-mosaic-tiling.jpg'
import kerbs from '../assets/photos/profile/kerb-formwork.jpg'
import irrigation from '../assets/photos/profile/irrigation-planting.jpg'
import stoneClad from '../assets/photos/profile/stone-clad-elevation.jpg'
import villaStructure from '../assets/photos/profile/villa-structure.jpg'
import ceilingInstall from '../assets/photos/profile/ceiling-installation.jpg'
import materialsYard from '../assets/photos/profile/materials-yard.jpg'
import chairmanPhoto from '../assets/photos/profile/chairman.jpg'

export const contact = {
  phone: '+974 3366 3100',
  phoneHref: 'tel:+97433663100',
  email: 'info@jazak.qa',
  web: 'www.jazak.qa',
  // TODO: WhatsApp number not yet confirmed by the client.
  whatsapp: null,
  address: 'Unit 3, Box Park, Zone 19, Street 200, Building 415, Doha, Qatar',
  plate: { zone: '19', street: '200', building: '415', unit: '3, Box Park, Doha' },
}

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Materials', href: '#materials' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  headline: ['Where vision', 'meets', 'structure.'],
  supporting:
    'A licensed building contractor in Doha, Qatar. Civil and structural works, finishing, renovation, landscape and materials supply, all under one roof.',
  caption: 'Doha, Qatar · Est. 2021',
  cta: 'Request a quotation',
}

export const integrated = {
  eyebrow: 'The integrated line · 4 stages',
  headline: 'From excavation to handover, one contractor.',
  supporting: 'Four stages, all handled in-house. No hand-offs between firms.',
  stages: [
    { tag: 'Stage 1', title: 'Excavation', text: 'Site preparation and substructure' },
    { tag: 'Stage 2', title: 'Structure', text: 'Slabs, columns, beams, blockwork' },
    { tag: 'Stage 3', title: 'Finishing', text: 'Paint, ceilings, partitions, doors, hardscape' },
    { tag: 'Supply', title: 'Materials trading', text: 'Cement, blocks, aggregates, tiles, paints' },
  ],
  facts: [
    { value: 2021, label: 'Established in Doha' },
    { value: 7, label: 'Services in-house, from civil works to materials trading' },
    { value: 1, label: 'Contractor for the whole project' },
  ],
}

export const services = {
  eyebrow: 'Services · 7 disciplines',
  headline: 'Seven disciplines. One accountable team.',
  supporting:
    'Every service is delivered by JAZAK, so scope, schedule and supply stay coordinated.',
  cta: 'Discuss Your Project',
  items: [
    {
      title: 'General Building Construction',
      text: 'New builds for villas, offices, retail units, warehouses and staff accommodation.',
      image: villaStructure,
      grade: 'full',
    },
    {
      title: 'Civil & Structural Works',
      text: 'Excavation, substructure, reinforced concrete slabs, columns and beams.',
      image: slabRebar,
      grade: 'graded',
    },
    {
      title: 'Building Finishing Works',
      text: 'Painting, ceilings, gypsum-board partitions, doors and fixtures, ready for occupancy.',
      image: majlis,
      grade: 'full',
    },
    {
      title: 'Renovation & Refurbishment',
      text: 'Villas, offices and shops upgraded with minimal disruption.',
      image: ceilingInstall,
      grade: 'mono',
    },
    {
      title: 'Hardscape & Landscape',
      text: 'Interlock paving, kerbstones, boundary walls and external works.',
      image: kerbs,
      grade: 'full',
    },
    {
      title: 'General Contracting',
      text: 'Supply, manpower and subcontractor coordination under one accountable partner.',
      image: columnFormwork,
      grade: 'graded',
    },
    {
      title: 'Building Materials Trading',
      text: 'Cement, blocks, aggregates, tiles and paints from our licensed trading arm.',
      image: materialsYard,
      grade: 'full',
    },
  ],
}

// TODO: project names, areas and JAZAK's role are pending from the client.
// Photos are JAZAK's own site photos from the company profile. Pins ([lon, lat])
// are sample positions, not real project locations.
export const projects = {
  eyebrow: 'Projects · Proof of work',
  headline: 'Proof of work, straight from site.',
  supporting:
    "From reinforcement and formwork to finished interiors, a selection of work from JAZAK's project files.",
  cta: 'View projects',
  filters: ['All', 'Structure', 'Finishing', 'External works'],
  items: [
    { caption: 'Arched villa façade, structure and finishes in progress', category: 'Structure', image: arched, grade: 'full', pin: [51.46, 25.36] },
    { caption: 'Majlis seating with ceiling and lighting works', category: 'Finishing', image: majlis, grade: 'full', pin: [51.55, 25.2] },
    { caption: 'Slab reinforcement ready for the pour', category: 'Structure', image: slabRebar, grade: 'graded', pin: [51.52, 25.37] },
    { caption: 'Open kitchen and dining with feature ceiling', category: 'Finishing', image: kitchen, grade: 'full', pin: [51.33, 25.6] },
    { caption: 'Foundation reinforcement and formwork', category: 'Structure', image: columnCage, grade: 'graded', pin: [51.19, 25.14] },
    { caption: 'Pool shell with mosaic tiling and overflow grating', category: 'External works', image: pool, grade: 'full', pin: [51.5, 24.98] },
    { caption: 'Column formwork at upper level', category: 'Structure', image: columnFormwork, grade: 'graded', pin: [51.4, 25.3] },
    { caption: 'Living hall with mirrored timber feature wall', category: 'Finishing', image: livingHall, grade: 'full', pin: [51.5, 25.4] },
    { caption: 'Kerb formwork and external civil works', category: 'External works', image: kerbs, grade: 'full', pin: [51.04, 24.82] },
    { caption: 'Blockwork and scaffolding, villa shell', category: 'Structure', image: blockwork, grade: 'graded', pin: [51.25, 25.45] },
    { caption: 'Villa elevation with stone cladding', category: 'Finishing', image: stoneClad, grade: 'full', pin: [51.43, 25.15] },
    { caption: 'Drip irrigation and planting beds', category: 'External works', image: irrigation, grade: 'full', pin: [51.3, 25.85] },
    { caption: 'Night shift bulk excavation', category: 'Structure', image: nightExcavation, grade: 'graded', pin: [51.47, 25.62] },
  ],
}

export const materials = {
  eyebrow: 'Supply · Building materials trading',
  headline: 'Materials, supplied by the contractor who uses them.',
  supporting:
    "JAZAK's trading division supplies contractors, developers and homeowners with building materials, quality-assured and competitively priced.",
  cta: 'Request a materials quote',
  more: 'Also in stock: gypsum and partition materials, general construction consumables and other permitted building materials. The right materials, in the right quantities, at the right time.',
  items: [
    { name: 'Cement', text: 'Cement and concrete-related materials', glyph: 'cement' },
    { name: 'Blocks', text: 'Blocks and masonry products', glyph: 'blocks' },
    { name: 'Sand & Aggregates', text: 'For structural and external works', glyph: 'aggregates' },
    { name: 'Tiles', text: 'Tiles and flooring materials', glyph: 'tiles' },
    { name: 'Paints', text: 'Paints and decorative finishing supplies', glyph: 'paints' },
    { name: 'Gypsum', text: 'Gypsum and partition materials', glyph: 'gypsum' },
  ],
}

export const about = {
  eyebrow: 'About · Since 2021',
  headline: 'Focused on stability and a client-first approach.',
  intro:
    "Established in the heart of Doha in 2021, JAZAK Trading Contracting & Services has quickly positioned itself as a reliable partner in Qatar's dynamic building sector. Built on a foundation of integrity, precision and uncompromising quality, we are a fully licensed, multi-disciplinary construction firm capable of delivering projects from the ground up.",
  body: [
    'Constructing a building is more than erecting walls; it is about creating safe, functional and lasting spaces for people to live, work and grow. Whether it is a private villa, a commercial retail unit or a large-scale civil project, JAZAK brings the same dedication to every site.',
    'From the initial excavation and structural framing to the final coat of paint and interior fit-out, our in-house team keeps every stage coordinated, and our Building Materials Trading division secures premium materials at competitive prices.',
  ],
  why: [
    {
      title: 'Integrated one-stop solution',
      text: 'From foundation to finishing, we handle it all under one roof. In-house civil works, finishing services and our own materials trading division remove the need for multiple contractors, saving you time, cost and coordination.',
    },
    {
      title: 'Quality assurance and transparent pricing',
      text: 'We source premium-grade materials through our licensed trading arm and pass the savings on. Our quotations are clear, detailed and honest, with no hidden fees or last-minute surprises.',
    },
    {
      title: 'On-time delivery with local expertise',
      text: "Operating in Doha since 2021, we know Qatar's regulations, climate and construction standards. A skilled workforce and proactive project management keep your project on schedule, within budget and fully compliant.",
    },
  ],
}

export const values = {
  eyebrow: 'Values · Chairman',
  headline: 'What we hold ourselves to.',
  supporting: 'Six values that shape how we quote, build and hand over.',
  items: [
    { title: 'Quality First', text: "Precision craftsmanship built to stand up to Qatar's climate and time." },
    { title: 'Total Transparency', text: 'Honest pricing and clear communication, with no hidden fees.' },
    { title: 'Safety Obsessed', text: 'We protect our people and your property through strict safety protocols.' },
    { title: 'Client-Focused', text: 'We listen, adapt and deliver what your project needs.' },
    { title: 'On-Time Delivery', text: 'We respect your schedule as much as your budget.' },
    { title: 'Integrated Excellence', text: 'Our materials trading licence secures premium supplies on every project.' },
  ],
  // TODO: confirm the Chairman approves web use of this message and his photo.
  chairman: {
    photo: chairmanPhoto,
    full: [
      'Welcome to JAZAK.',
      'Since our establishment in Doha in 2021, we have been driven by a clear mission: to deliver construction excellence with integrity, quality, and unwavering commitment to our clients.',
      'We offer a truly integrated solution, handling everything from civil works and structural framing to finishing touches and building materials supply through our own trading division. This integration ensures we control quality at every stage, eliminate delays, and pass cost savings directly to you.',
      'At JAZAK, we believe a building is more than bricks and mortar. It is a home, a workplace, a legacy. That is why we treat every project as if it were our own, with the same care, precision, and safety standards we expect for ourselves.',
      'We operate with full transparency: honest quotations, realistic timelines, and open communication. Our promise is simple: we will always deliver on our word, respect your vision, and build lasting relationships.',
      'Thank you for trusting JAZAK. Together, let us build something remarkable.',
    ],
    quote:
      'We offer a truly integrated solution, handling everything from civil works and structural framing to finishing touches and building materials supply through our own trading division. This integration ensures we control quality at every stage, eliminate delays, and pass cost savings directly to you.',
    name: 'Sultan Mahri A M Al-Mohannadi',
    role: 'Chairman & Managing Director',
    cta: 'Read the full message',
  },
}

export const quote = {
  eyebrow: 'Quote · Contact',
  headline: 'Tell us about your project.',
  supporting: 'One short form. Our team responds with a clear, itemised quotation.',
  cta: 'Request a quotation',
}

export const footer = {
  tagline: 'A licensed construction and materials trading company in Doha, Qatar.',
  copyright: '© 2026 JAZAK Trading Contracting & Services. All rights reserved.',
}
