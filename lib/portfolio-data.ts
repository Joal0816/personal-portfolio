/**
 * ------------------------------------------------------------------
 * PORTFOLIO CONTENT
 * ------------------------------------------------------------------
 * This is the single source of truth for everything shown on the site.
 * Replace the dummy text below with your real content — no component
 * files need to be touched.
 * ------------------------------------------------------------------
 */

/** Top-level personal info shown in the hero, contact section, and navbar. */
export const profile = {
  name: 'Alex Rivera', // Your full name
  role: 'Software Engineer', // Short title shown under your name
  location: 'San Francisco, CA', // City / region
  email: 'hello@alexrivera.dev', // Public contact email
  tagline: 'Building fast, accessible, and thoughtful web experiences.', // One-line hook
  intro:
    'I design and engineer end-to-end products — from clean interfaces to the systems that power them. Currently focused on performant web apps and developer tooling.',
  bio: "I'm a full-stack engineer with 6+ years of experience shipping products used by millions. I care deeply about the details: accessibility, performance budgets, and interfaces that feel effortless. When I'm not writing code, I'm contributing to open source or mentoring early-career developers.",
  /** Social + contact links. `email` should keep the `mailto:` prefix. */
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:hello@alexrivera.dev',
  },
}

/** Skill buckets rendered in the About section. Add/remove groups freely. */
export const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'GraphQL', 'Redis', 'tRPC'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Playwright'],
  },
]

/**
 * Project category used for the filter pills in the Projects section.
 * Every project below must use one of these values (except 'All', which
 * is the default "show everything" option).
 */
export type ProjectCategory =
  | 'Full Stack'
  | 'Frontend'
  | 'Machine Learning'
  | 'Embedded / IoT'

/** Ordered list of filter pills. 'All' is prepended automatically in the UI. */
export const projectCategories: ProjectCategory[] = [
  'Full Stack',
  'Frontend',
  'Machine Learning',
  'Embedded / IoT',
]

export type Project = {
  title: string // Project name
  category: ProjectCategory // Used by the filter pills
  description: string // Short summary shown on the card
  longDescription: string // Expanded copy shown inside the detail modal
  features: string[] // Key highlights (bullet list in the modal)
  image: string // Path under /public (e.g. '/projects/foo.png')
  tags: string[] // Tech stack chips
  demo: string // Live demo URL
  repo: string // Source code URL
}

/** Your work. Reorder or trim this list — the grid + filters adapt. */
export const projects: Project[] = [
  {
    title: 'Pulse Analytics',
    category: 'Full Stack',
    description:
      'A real-time analytics dashboard with customizable widgets, live data streams, and sub-second query performance.',
    longDescription:
      'Pulse Analytics gives product teams a live view of their key metrics without waiting on nightly batch jobs. It streams events over WebSockets, aggregates them in a time-series store, and renders customizable widget layouts that each user can arrange to fit their workflow.',
    features: [
      'Sub-second query performance over billions of rows',
      'Drag-and-drop customizable widget dashboards',
      'Live data streaming via WebSockets',
      'Role-based access control and shareable views',
    ],
    image: '/projects/analytics-dashboard.png',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSockets'],
    demo: 'https://example.com',
    repo: 'https://github.com',
  },
  {
    title: 'Marketplace Mobile',
    category: 'Frontend',
    description:
      'A cross-platform commerce app with an optimized checkout flow, offline caching, and a 4.8-star rating.',
    longDescription:
      'A cross-platform shopping experience built for speed and reliability on flaky mobile networks. The checkout flow was rebuilt from the ground up to reduce drop-off, and an offline-first cache keeps browsing snappy even without a connection.',
    features: [
      'One-tap checkout with Stripe and Apple/Google Pay',
      'Offline-first product browsing and cart',
      'Optimistic UI with background sync',
      'Shipped to 200k+ users at a 4.8-star rating',
    ],
    image: '/projects/ecommerce-app.png',
    tags: ['React Native', 'Stripe', 'GraphQL'],
    demo: 'https://example.com',
    repo: 'https://github.com',
  },
  {
    title: 'Converse AI',
    category: 'Machine Learning',
    description:
      'A streaming AI assistant with tool calling, conversation memory, and a keyboard-first interface.',
    longDescription:
      'Converse AI is a production chat assistant that streams responses token-by-token, calls external tools mid-conversation, and remembers context across sessions. The entire interface is keyboard-navigable for power users.',
    features: [
      'Token-by-token streaming responses',
      'Tool calling with structured outputs',
      'Persistent, per-user conversation memory',
      'Fully keyboard-first command interface',
    ],
    image: '/projects/ai-chat.png',
    tags: ['AI SDK', 'Next.js', 'Edge Functions'],
    demo: 'https://example.com',
    repo: 'https://github.com',
  },
  {
    title: 'VisionScan ML',
    category: 'Machine Learning',
    description:
      'An on-device image classification pipeline with real-time confidence scoring and an annotation studio.',
    longDescription:
      'VisionScan runs image classification models directly in the browser and on edge devices, returning labeled predictions with confidence scores in real time. It ships with an annotation studio for building and refining custom datasets.',
    features: [
      'In-browser inference with WebGPU acceleration',
      'Real-time confidence scoring and heatmaps',
      'Built-in dataset annotation studio',
      'Export to ONNX and TensorFlow Lite',
    ],
    image: '/projects/ml-vision.png',
    tags: ['Python', 'PyTorch', 'ONNX', 'WebGPU'],
    demo: 'https://example.com',
    repo: 'https://github.com',
  },
  {
    title: 'Forge CLI',
    category: 'Full Stack',
    description:
      'An open-source developer toolkit for scaffolding and deploying full-stack apps in a single command.',
    longDescription:
      'Forge CLI removes the boilerplate from starting new projects. A single command scaffolds a typed full-stack app, wires up CI, and deploys it — with sensible, swappable defaults for teams that want to move fast.',
    features: [
      'One-command scaffold, build, and deploy',
      'Pluggable templates and generators',
      'Zero-config CI/CD pipelines',
      '3k+ GitHub stars and an active community',
    ],
    image: '/projects/devtools-cli.png',
    tags: ['Node.js', 'TypeScript', 'Open Source'],
    demo: 'https://example.com',
    repo: 'https://github.com',
  },
  {
    title: 'Beacon IoT Hub',
    category: 'Embedded / IoT',
    description:
      'A smart-home hub firmware and dashboard managing hundreds of sensors with real-time telemetry.',
    longDescription:
      'Beacon is an embedded hub that bridges low-power sensors to the cloud. The firmware handles device pairing and local automation, while the companion dashboard visualizes live telemetry and lets users build rules without code.',
    features: [
      'Low-power firmware for ESP32 / ARM devices',
      'Local-first automation rules engine',
      'Real-time telemetry over MQTT',
      'OTA firmware updates across the fleet',
    ],
    image: '/projects/iot-hub.png',
    tags: ['C++', 'Rust', 'MQTT', 'Embedded'],
    demo: 'https://example.com',
    repo: 'https://github.com',
  },
]

/** Anchor links rendered in the navbar. `href` must match a section id. */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
