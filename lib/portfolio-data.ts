/**
 * ------------------------------------------------------------------
 * PORTFOLIO CONTENT
 * ------------------------------------------------------------------
 * This is the single source of truth for everything shown on the site.
 * Replace the dummy text below with your real content — no component
 * files need to be touched.
 * ------------------------------------------------------------------
 */

import { title } from "process"

/** Top-level personal info shown in the hero, contact section, and navbar. */
export const profile = {
  name: 'Joseph Vergara', // Your full name
  role: 'Embedded Systems Developer / Full-Stack & Edge AI Developer', // Short title shown under your name
  location: 'Iligan City, Philippines', // City / region
  email: 'josephalan.vergara@g.msuiit.edu.ph', // Public contact email
  tagline: 'Embedded Systems Developer & Full-Stack / Edge AI Engineer', // One-line hook
  intro:
    '4th-year BS Computer Applications student majoring in Embedded Systems at MSU-IIT, specializing in microcontroller firmware, Edge AI deployment, and full-stack telemetry dashboards.',
  bio: "Joseph Alan B. Vergara is an embedded systems and full-stack developer with a strong foundation in low-level hardware integration, Edge AI, and web development. Currently completing his BS in Computer Applications (Major in Embedded Systems) at Mindanao State University – Iligan Institute of Technology (MSU-IIT), he has contributed to academic and dissertation projects spanning deterministic sensor telemetry, computer vision on mobile/edge devices, IoT automation, and RTOS-based interactive systems.",
  /** Social + contact links. `email` should keep the `mailto:` prefix. */
  socials: {
    github: 'https://github.com/Joal0816',
    linkedin: 'https://www.linkedin.com/in/joseph-alan-vergara-638803348/',
    email: 'https://mail.google.com/mail/?view=cm&fs=1&to=josephalan.vergara@g.msuiit.edu.ph',
  },
}

/** Skill buckets rendered in the About section. Add/remove groups freely. */
export const skillGroups = [
  {
    category: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'CSS', 'React.js', 'LVGL (Light and Versatile Graphics Library)', 'SquareLine Studio', 'Qt C++ (GUI)'],
  },
  {
    category: 'Backend',
    skills: ['C', 'C++', 'Python', 'Node.js (MERN)', 'Java', 'SQLite', 'MongoDB', 'RESTful APIs', 'MQTT'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Visual Studio Code', 'Git', 'GitHub', 'Vercel', 'Arduino IDE', 'RT-Thread Studio', 'Microchip (ATMEL) Studio', 'Vivado', 'MATLAB', 'Cisco Packet Tracer', 'Google Colab', 'Edge Impulse', 'TensorFlow', 'Roboflow', 'CODESYS V3', 'CMake'],
  },
]

/**
 * Project category used for the filter pills in the Projects section.
 * Every project below must use one of these values (except 'All', which
 * is the default "show everything" option).
 */
export type ProjectCategory =
  | 'Full-Stack & Embedded Systems'
  | 'Mobile & Edge AI'
  | 'Web Development / Full-Stack'
  | 'Embedded Systems & HMI'

/** Ordered list of filter pills. 'All' is prepended automatically in the UI. */
export const projectCategories: ProjectCategory[] = [
  'Full-Stack & Embedded Systems',
  'Mobile & Edge AI',
  'Web Development / Full-Stack',
  'Embedded Systems & HMI',
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
    title: 'Microcontroller-Based Automated Feedback and Scoring System',
    category: 'Full-Stack & Embedded Systems',
    description:
      'A full-stack Learning Management System paired with live sensor telemetry and edge hosting for instant automated assessment.',
    longDescription:
      'Developed for a PhD dissertation collaboration, this system streamlines real-time evaluation workflows by capturing live sensor telemetry directly to an interactive instructor dashboard. It benchmarks standard web server architectures against an edge-hosted deployment directly on an ESP32-P4 microcontroller.',
    features: [
      'Real-time sensor telemetry capture and automated scoring logic.',
      'Deterministic evaluation pipelines paired with instructor feedback dashboards.',
      'Benchmarked edge-hosted deployment on ESP32-P4 vs. cloud/standard servers.',
    ],
    image: '/projects/manual-interface.png',
    tags: ['MERN', 'ESP32-P4', 'IoT', 'Edge Computing', 'Telemetry', 'Full-Stack'],
    demo: 'N/A (In Progress)',
    repo: 'Private / Research Collaboration',
  },
  {
    title: 'Mobile Application Development for Computer Vision AI in Detecting Microplastics',
    category: 'Mobile & Edge AI',
    description:
      'Description: An on-device computer vision mobile app utilizing an optimized YOLOv8n model for real-time microplastic classification.',
    longDescription:
      'Long Description: Built in collaboration with Master’s and undergraduate research, this project deploys a lightweight, highly optimized YOLOv8n deep learning model directly into a cross-platform mobile application. It eliminates cloud dependency to provide zero-latency particle inference in laboratory and field settings.',
    features: [
      'Zero-dependency, on-device real-time particle detection and bounding-box inference.',
      'Lightweight mobile UI designed for rapid visual verification and counting.',
      'Optimized model pipeline tailored for microplastic quantification.',    
    ],
    image: '/projects/mp-detect.jpg',
    tags: ['Computer Vision', 'YOLOv8n', 'Edge AI', 'Mobile App', 'Python'],
    demo: 'N/A (In Progress)',
    repo: 'Private / Research Collaboration',
  },
  {
    title: 'Barangay Connect Web Application',
    category: 'Web Development / Full-Stack',
    description:
      'Description: A full-stack community portal connecting local residents directly with barangay officials for service requests and incident reporting.',
    longDescription:
      'Long Description: Designed to digitize and streamline local public services, Barangay Connect provides community members with self-service document requests, incident logging, real-time status tracking, and announcement feeds, reducing manual turnaround time for administrative staff.  ',
    features: [
      'Self-service document request system with live status tracking.',
      'Incident reporting and community announcement portal.',
      'Administrative dashboard for municipal staff.'
    ],
    image: '/projects/barangay-connect.png',
    tags: ['Web Development', 'Full-Stack', 'JavaScript', 'Community Portal', 'GitHub'],
    demo: 'Demo: N/A',
    repo: 'https://github.com/Joal0816/Barangay-Connect',
  },
  {
    title: 'Snake OS: Embedded Interactive HMI Game',
    category: 'Embedded Systems & HMI',
    description:
      'A real-time retro arcade game engine built for the Renesas RA6M3 microcontroller with an AI autopilot mode.',
    longDescription:
      'Long Description: Developed on RT-Thread RTOS with the LVGL graphics library, Snake OS runs an arcade game directly on embedded hardware. The engine features non-volatile persistent storage for high scores, multi-level obstacle logic, and an autonomous AI navigation mode.',
    features: [
      'Real-time 2D graphics rendering via LVGL on RT-Thread OS.',
      'Autonomous AI autopilot navigation mode.',
      'Non-volatile EEPROM/flash persistent high-score memory.',
      'Dynamic level speed and obstacle logic.',
    ],
    image: '/projects/snake-os.png',
    tags: ['Tags: C, Renesas RA6M3', 'RT-Thread OS', 'LVGL', 'Embedded GUI', 'HMI'],
    demo: 'https://www.hackster.io/josephalanvergara/snake-os-interactive-hmi-game-on-rt-thread-f8b988',
    repo: 'https://github.com/josephalanvergara/snake-os',
  },
  {
    title: 'Project Development of a Line Following Robot using Arduino Uno R3',
    category: 'Embedded Systems & HMI',
    description:
      'A high-speed line-tracking robot driven by low-level AVR Assembly firmware and dual hardware PWM timers.',
    longDescription:
      'Engineered with AVR Assembly on the ATmega328P, this project executes low-latency pattern matching and trajectory correction. It achieved a 100% course completion rate and a 12-second lap record using dual hardware PWM timers (Timer0/Timer2) and a 5-channel IR sensor array with directional memory.',
    features: [
      'Low-level AVR Assembly implementation on ATmega328P.',  
      'Hardware PWM timer control for smooth motor response via L298N.',
      '5-channel IR sensor array with directional state memory.'
    ],
    image: '/projects/line-following-robot.png',
    tags: ['AVR Assembly', 'ATmega328P', 'Arduino Uno', 'Robotics', 'PWM'],
    demo: 'https://docs.google.com/document/d/1k9SudemZJafofm2p3hludQYK7nMUtvUpkMm6N-_rJvY/edit?usp=sharing',
    repo: 'N/A',
  },
  {
    title: 'Edge AI Glasses Object Detection',
    category: 'Full-Stack & Embedded Systems',
    description:
      'Low-latency on-device eyewear object detection model trained in Roboflow and deployed via Edge Impulse.',
    longDescription:
      'Low-latency on-device eyewear object detection model trained in Roboflow and deployed via Edge Impulse.',
    features: [
      'Low-latency edge-optimized vision inference.',
      'Custom dataset curation and augmentation in Roboflow.',
    ],
    image: '/projects/object-detection.jpg',
    tags: ['Edge Impulse', 'Roboflow', 'Computer Vision', 'TinyML'],
    demo: 'https://studio.edgeimpulse.com/studio/848525',
    repo: 'N/A',
  },

  {
    title: 'Industrial Oven Simulation & Control System',
    category: 'Embedded Systems & HMI',
    description:
      'Virtual PLC control architecture and interactive HMI for simulated industrial thermal regulation.',
    longDescription:
      'Engineered in CODESYS V3 to simulate precise industrial temperature regulation and automated heating logic. Features an interactive HMI with adjustable setpoints, safety interlocks, and real-time threshold alarm management to prevent thermal overrun.',
    features: [
      'Virtual PLC control logic in CODESYS V3.',
      'Interactive HMI with threshold alarms and safety interlocks.',
    ],
    image: '/projects/industrial-oven.png',
    tags: ['CODESYS V3', 'PLC', 'Ladder Logic', 'HMI', 'Industrial Automation'],
    demo: 'https://sites.google.com/g.msuiit.edu.ph/hassanvergarafinalproject?usp=sharing',
    repo: 'N/A',
    },
  {
    title: 'IoT-Based Monitoring System for Vermicomposting',
    category: 'Embedded Systems & HMI',
    description:
      'Virtual PLC control architecture and interactive HMI for simulated industrial thermal regulation.',
    longDescription:
      'Engineered in CODESYS V3 to simulate precise industrial temperature regulation and automated heating logic. Features an interactive HMI with adjustable setpoints, safety interlocks, and real-time threshold alarm management to prevent thermal overrun.',
    features: [
      'Virtual PLC control logic in CODESYS V3.',
      'Interactive HMI with threshold alarms and safety interlocks.',
    ],
    image: '/projects/vermicomposting.png',
    tags: ['CODESYS V3', 'PLC', 'Ladder Logic', 'HMI', 'Industrial Automation'],
    demo: 'https://canva.link/k5sngerg431bggp',
    repo: 'N/A',
  },
{
  title: 'K-Bin: Automated Smart Waste Sorting System',
  category: 'Embedded Systems & HMI',
  description:
    'A smart waste segregation station with a Qt C++ desktop monitoring interface and multi-sensor classification.',
  longDescription:
    'Integrates inductive, capacitive, moisture, and ultrasonic sensors to categorize waste into Wet, Dry, and Metal streams. Accompanied by a desktop GUI application written in Qt C++ and CMake to provide live bin fill-level visualization, maintenance alerts, and SQLite issue logging.',
  features: [
    '3-stream automatic classification (Wet, Dry, Metal) via sensor fusion.',  'Desktop GUI with fill-level indicators and alarm toggles.',  
    'SQLite database integration for maintenance logs.',
  ],
  image: '/projects/k-bin.png',
  tags: ['Qt C++', 'CMake', 'SQLite', 'Sensors', 'Desktop GUI', 'Hardware Integration'],
  demo: 'https://drive.google.com/drive/folders/1OVPIXr5QFTa3_Uin5QVysLJvsKLshUdQ?usp=sharing',
  repo: 'N/A',
},
{
  title: 'Power Supply',
  category: 'Embedded Systems & HMI',
  description:
    'A compact and efficient power supply unit designed for reliable operation in various electronic applications.',
  longDescription:
    'This power supply unit is engineered to provide stable voltage and current output, ensuring optimal performance for connected devices. It features overcurrent and overvoltage protection mechanisms, making it suitable for sensitive electronics.',
  features: [
    'Stable voltage and current output.',
    'Overcurrent and overvoltage protection.',
  ],
  image: '/projects/power-supply.png',
  tags: ['Power Electronics', 'Circuit Design', 'Embedded Systems'],
  demo: 'N/S',
  repo: 'N/A',
}
]

/** Anchor links rendered in the navbar. `href` must match a section id. */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
