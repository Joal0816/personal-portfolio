/**
 * ------------------------------------------------------------------
 * PORTFOLIO CONTENT
 * ------------------------------------------------------------------
 * This is the single source of truth for everything shown on the site.
 * ------------------------------------------------------------------
 */

/** Top-level personal info shown in the hero, contact section, and navbar. */
export const profile = {
  name: 'Joseph Vergara',
  fullName: 'Joseph Alan B. Vergara',
  role: 'Embedded Systems & Full-Stack Developer',
  location: 'Iligan City, Philippines',
  address: 'Phase II-Doña Maria Subd, Tubod, Lanao Del Norte',
  email: 'josephalan.vergara@g.msuiit.edu.ph',
  phone: '+63 947-589-2995',
  website: 'https://www.joalvergs.tech/',
  tagline: 'Building at the intersection of hardware and software.',
  intro:
    '4th-year BS Computer Applications student majoring in Embedded Systems at MSU-IIT (CGPA: 1.96269), specializing in microcontroller firmware, Edge AI deployment, and full-stack telemetry dashboards.',
  bio: "I'm Joseph Alan B. Vergara — an embedded systems and full-stack developer with a strong foundation in low-level hardware integration, Edge AI, and web development. Currently completing my BS in Computer Applications (Major in Embedded Systems) at Mindanao State University – Iligan Institute of Technology (MSU-IIT), I've contributed to academic and dissertation projects spanning deterministic sensor telemetry, computer vision on mobile/edge devices, IoT automation, and RTOS-based interactive systems.",
  socials: {
    github: 'https://github.com/Joal0816',
    linkedin: 'https://www.linkedin.com/in/joseph-alan-vergara-638803348/',
    email: 'https://mail.google.com/mail/?view=cm&fs=1&to=josephalan.vergara@g.msuiit.edu.ph',
  },
}

/** Education entries rendered in the About section. */
export const education = [
  {
    degree: 'BS Computer Applications',
    major: 'Major in Embedded Systems',
    school: 'Mindanao State University – Iligan Institute of Technology',
    period: 'Aug 2023 – Present',
    location: 'Iligan City, Philippines',
    gpa: 'CGPA: 1.96269',
    description: '4th Year Student. Relevant coursework: Embedded Systems, Microcontroller Programming, IoT, Computer Vision, Full-Stack Development, PLC Programming, Digital Logic Design.',
  },
  {
    degree: 'Senior High School',
    major: 'ABM Strand',
    school: 'MSU-IIT Integrated Developmental School',
    period: '2021 – 2023',
    location: 'A. Bonifacio Ave, Brgy. Tibanga, Iligan City',
    description: 'Academic Honors recipient.',
  },
]

/** Experience / research entries. */
export const experiences = [
  {
    role: 'Co-Author & Full-Stack / Embedded Developer',
    organization: 'PhD Dissertation Research Collaboration',
    period: '2024 – Present',
    description: 'Designed a specialized full-stack Learning Management System (React.js, Node.js, Supabase/PostgreSQL) to capture live microcontroller telemetry and automate laboratory scoring logic. Benchmarked standard web server deployments against an edge-hosted architecture on the ESP32-P4 microcontroller.',
  },
  {
    role: 'Co-Author & Mobile / Edge AI Developer',
    organization: 'Master\'s & Undergraduate Research Collaboration',
    period: '2024 – Present',
    description: 'Deployed an optimized YOLOv8n edge AI model into a cross-platform mobile app for zero-latency, on-device particle quantification. Configured Android SDK build environments to generate release APKs and established deployment bundles for iOS targets.',
  },
]

/** Certifications and trainings */
export const certifications = [
  { name: 'AI Career Readiness Training', issuer: 'ICT 3D, CCS Building, MSU-IIT, Iligan City', date: 'August 20, 2026' },
  { name: 'Quantum Circuits as Pictures: An Introduction to ZX Calculus', issuer: 'Zoom Meeting, Webinar', date: 'March 20, 2026' },
  { name: 'Permaculture Webinar "From Code to Crops"', issuer: 'Zoom Meeting, Webinar', date: 'December 22, 2025' },
  { name: 'TechShowcase 2025 Innovation in Application Development and Emerging Technologies', issuer: 'PRISM Mini theater, MSU-IIT, Iligan City', date: 'December 17, 2025' },
  { name: 'my.ComApps Technology Symposium and Exhibit on RT-Thread Based Technology', issuer: '4th floor CCS Building, MSU-IIT, Iligan City', date: 'November 24-25, 2025' },
  { name: 'Seize Your Opportunity Internships and OJTs Workshop!', issuer: 'ICT 3D, CCS Building, MSU-IIT, Iligan City', date: 'November 24, 2025' },
  { name: 'Software Freedom Day 2023', issuer: 'CCS Building, MSU-IIT, Iligan City', date: 'September 16, 2023' },
]

/** Leadership activities */
export const leadership = [
  {
    role: 'College of Computer Studies Executive Council',
    organization: 'Sports & Development Affairs – Undersecretary',
    period: 'Aug 2025 – May 2026',
    description: 'MSU-Iligan Institute of Technology, Iligan City, Philippines',
  },
  {
    role: 'Titans Esports',
    organization: 'Mobile Legends BangBang Team Captain',
    period: '2021 – 2023',
    description: 'MSU-Iligan Institute of Technology, Iligan City, Philippines',
  },
]

/** Skill buckets rendered in the About section. */
export const skillGroups = [
  {
    category: 'Programming Languages',
    skills: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'Java', 'PLC (Ladder Logic)', 'Assembly', 'Bash/Shell Scripting', 'CSS'],
  },
  {
    category: 'Operating Systems & CLI',
    skills: ['Linux (Arch Linux, CachyOS)', 'Unix Shell & CLI', 'Zsh', 'Bash', 'Dotfiles', 'RT-Thread RTOS'],
  },
  {
    category: 'Networking & Web Infrastructure',
    skills: ['DNS Management (A, CNAME, TXT records, Nameservers)', 'Custom Domain Config', 'SSL/TLS', 'Vercel', 'Railway', 'Hostinger', 'Cisco Packet Tracer'],
  },
  {
    category: 'Software & Frameworks',
    skills: ['VS Code', 'Git', 'GitHub', 'Node.js', 'React.js', 'Express.js', 'Pictoblox', 'CodeBlocks', 'Microchip (ATMEL) Studio', 'Arduino IDE', 'Google Colab', 'Edge Impulse', 'TensorFlow', 'MATLAB', 'MARIE.js', 'Vivado', 'RT-Thread Studio', 'SquareLine Studio', 'MongoDB', 'Supabase', 'SQLite', 'CMake'],
  },
  {
    category: 'Hardware',
    skills: ['Microcontrollers (8051, ATmega328P, ATmega2560, ESP8266, ESP32)', 'Field Programmable Gate Arrays (FPGAs)', 'Basic & Advanced Electronics', 'Test Equipment (Multimeter, Oscilloscope)', 'PCB Layout & Design', 'Prototyping & Simulation', 'Soldering', 'Computer & Laptop Hardware Repair'],
  },
]

/**
 * Project category used for the filter pills in the Projects section.
 */
export type ProjectCategory =
  | 'Full-Stack & Embedded'
  | 'Mobile & Edge AI'
  | 'Web Development'
  | 'Embedded & HMI'

/** Ordered list of filter pills. 'All' is prepended automatically in the UI. */
export const projectCategories: ProjectCategory[] = [
  'Full-Stack & Embedded',
  'Mobile & Edge AI',
  'Web Development',
  'Embedded & HMI',
]

export type Project = {
  title: string
  category: ProjectCategory
  role: string
  description: string
  longDescription: string
  features: string[]
  image: string
  tags: string[]
  demo: string
  repo: string
}

/** Your work. Reorder or trim this list — the grid + filters adapt. */
export const projects: Project[] = [
  {
    title: 'Microcontroller-Based Automated Feedback System',
    category: 'Full-Stack & Embedded',
    role: 'Co-Author & Full-Stack / Embedded Developer — PhD Dissertation Research Collaboration',
    description:
      'A full-stack LMS paired with live sensor telemetry and edge hosting on ESP32-P4 for automated assessment.',
    longDescription:
      'Designed a specialized full-stack Learning Management System (React.js, Node.js, Supabase/PostgreSQL) to capture live microcontroller telemetry and automate laboratory scoring logic. Reduced evaluation latency and eliminated manual record-keeping errors by engineering deterministic evaluation pipelines paired with interactive instructor dashboards for instant feedback. Benchmarked standard web server deployments against an edge-hosted architecture on the ESP32-P4 microcontroller to evaluate low-power, localized server reliability.',
    features: [
      'Full-stack MERN LMS (React.js, Node.js, Supabase/PostgreSQL).',
      'Real-time microcontroller telemetry capture and automated scoring.',
      'Deterministic evaluation pipelines with interactive dashboards.',
      'Benchmarked edge deployment on ESP32-P4 vs standard servers.',
    ],
    image: '/projects/manual-interface.png',
    tags: ['React.js', 'Node.js', 'Supabase', 'PostgreSQL', 'ESP32-P4', 'IoT'],
    demo: 'https://miow-lms.ter-ids.online/auth',
    repo: 'https://github.com/MIOW-CODES/lms',
  },
  {
    title: 'Mobile Microplastic Detection App',
    category: 'Mobile & Edge AI',
    role: 'Co-Author & Mobile / Edge AI Developer — Master\'s & Undergraduate Research Collaboration',
    description:
      'An on-device computer vision mobile app using optimized YOLOv8n for real-time microplastic classification.',
    longDescription:
      'Deployed an optimized YOLOv8n edge AI model into a cross-platform mobile app for zero-latency, on-device particle quantification. Configured Android SDK build environments to generate release APKs and established deployment bundles for iOS targets. Enhanced UI/UX flow to handle camera lifecycles, live bounding-box rendering, and research-grade inference visualization.',
    features: [
      'Zero-latency on-device particle quantification with YOLOv8n.',
      'Cross-platform deployment (Android APKs & iOS bundles).',
      'Camera lifecycle management with live bounding-box rendering.',
      'Research-grade inference visualization.',
    ],
    image: '/projects/mp-detect.jpg',
    tags: ['YOLOv8n', 'Edge AI', 'TFLite', 'Android SDK', 'Computer Vision'],
    demo: 'https://drive.google.com/drive/folders/1GOxtqUJavVIl_n6gHRzwyTU0WCLO-tB?usp=sharing',
    repo: 'https://github.com/Joal0816/Microplastic-Detection',
  },
  {
    title: 'Barangay Connect Web App',
    category: 'Web Development',
    role: 'Full-Stack Developer — Web Development, GitHub',
    description:
      'A full-stack portal streamlining local public service requests, document generation, and community reporting.',
    longDescription:
      'Built a full-stack portal streamlining local public service requests, document generation, and real-time community reporting. Features self-service document requests, incident logging, real-time status tracking, and announcement feeds for community members and barangay officials.',
    features: [
      'Full-stack portal with real-time community reporting.',
      'Self-service document request and generation system.',
      'Incident reporting and announcement feeds.',
      'Administrative dashboard for municipal staff.',
    ],
    image: '/projects/barangay-connect.png',
    tags: ['Full-Stack', 'JavaScript', 'Community Portal', 'GitHub'],
    demo: '#',
    repo: 'https://github.com/Joal0816/Barangay-Connect',
  },
  {
    title: 'Edge AI Glasses Object Detection',
    category: 'Full-Stack & Embedded',
    role: 'Edge AI Developer — Roboflow, Edge Impulse',
    description:
      'Low-latency on-device eyewear object detection trained in Roboflow and deployed via Edge Impulse.',
    longDescription:
      'Trained, quantized, and validated a low-latency edge vision model for wearable hardware via Edge Impulse and custom Roboflow datasets. The model runs directly on wearable glasses for real-time object detection without cloud dependency.',
    features: [
      'Low-latency edge-optimized vision inference on wearable hardware.',
      'Custom dataset curation and augmentation in Roboflow.',
      'Deployed via Edge Impulse for on-device processing.',
      'Quantized model for resource-constrained devices.',
    ],
    image: '/projects/object-detection.jpg',
    tags: ['Edge Impulse', 'Roboflow', 'Computer Vision', 'TinyML', 'Wearable'],
    demo: 'https://studio.edgeimpulse.com/studio/848525',
    repo: '#',
  },
  {
    title: 'Industrial Oven Simulation & Control',
    category: 'Embedded & HMI',
    role: 'PLC & Automation Developer — CODESYS V3, PLC, HMI',
    description:
      'Virtual PLC ladder logic and interactive HMI with automated heating logic, safety interlocks, and threshold alarms.',
    longDescription:
      'Engineered virtual PLC ladder logic and an interactive HMI with automated heating logic, safety interlocks, and threshold alarms. Features real-time temperature monitoring, adjustable setpoints, and safety mechanisms to prevent thermal overrun in simulated industrial environments.',
    features: [
      'Virtual PLC ladder logic in CODESYS V3.',
      'Interactive HMI with threshold alarms and safety interlocks.',
      'Automated heating logic with real-time monitoring.',
      'Adjustable setpoints for temperature regulation.',
    ],
    image: '/projects/industrial-oven.png',
    tags: ['CODESYS V3', 'PLC', 'Ladder Logic', 'HMI', 'Industrial Automation'],
    demo: 'https://sites.google.com/g.msuiit.edu.ph/hassanvergarafinalproject?usp=sharing',
    repo: 'https://github.com/Joal0816/CODESYS-Industrial-Oven-HMI',
  },
  {
    title: 'Snake OS: Embedded Interactive HMI Game',
    category: 'Embedded & HMI',
    role: 'Embedded Developer — Renesas RA6M3, RT-Thread OS, LVGL',
    description:
      'An arcade game engine utilizing RT-Thread RTOS and LVGL to deliver fluid real-time graphical rendering on bare metal.',
    longDescription:
      'Engineered an arcade game engine utilizing Renesas RA6M3, RT-Thread RTOS, and LVGL to deliver fluid real-time graphical rendering on bare metal. Implemented autonomous AI autopilot navigation, non-volatile high-score persistence, and dynamic multi-level obstacle logic.',
    features: [
      'Real-time 2D graphics via LVGL on RT-Thread OS.',
      'Autonomous AI autopilot navigation mode.',
      'Non-volatile high-score persistence.',
      'Dynamic multi-level obstacle logic.',
    ],
    image: '/projects/snake-os.png',
    tags: ['C', 'Renesas RA6M3', 'RT-Thread', 'LVGL', 'RTOS'],
    demo: 'https://www.hackster.io/josephalanvergara/snake-os-interactive-hmi-game-on-rt-thread-f8b988',
    repo: 'https://github.com/Joal0816/Snake-OS-RT-Thread-HMI',
  },
  {
    title: 'IoT Vermicomposting Monitor',
    category: 'Embedded & HMI',
    role: 'IoT Developer — ESP32, MQTT, Sensors',
    description:
      'Automated closed-loop irrigation based on real-time soil moisture (60-80%) with 5+ environmental parameters over MQTT.',
    longDescription:
      'Automated closed-loop irrigation triggered on real-time soil moisture levels (60-80%) and piped 5+ environmental parameters over MQTT to a centralized dashboard for continuous monitoring and analysis.',
    features: [
      'Real-time soil moisture monitoring (60-80% threshold).',
      'Automated closed-loop irrigation control.',
      '5+ environmental parameters via MQTT.',
      'Centralized dashboard for data visualization.',
    ],
    image: '/projects/vermicomposting.png',
    tags: ['ESP32', 'MQTT', 'IoT', 'Sensors', 'Environmental Monitoring'],
    demo: 'https://canva.link/k5sngerg431bggp',
    repo: '#',
  },
  {
    title: 'Line Following Robot',
    category: 'Embedded & HMI',
    role: 'Firmware Developer — Arduino Uno, AVR Assembly',
    description:
      'Hand-tuned AVR Assembly firmware and dual PWM hardware timers (Timer0/2) for a 5-channel IR array, 100% course completion.',
    longDescription:
      'Hand-tuned AVR Assembly firmware and dual PWM hardware timers (Timer0/2) for a 5-channel IR array, achieving a 100% course completion rate. Processes sensor readings with deterministic pattern matching for high-speed line tracking.',
    features: [
      'Low-level AVR Assembly on ATmega328P.',
      'Dual hardware PWM timer control (Timer0/2).',
      '5-channel IR sensor array.',
      '100% course completion rate.',
    ],
    image: '/projects/line-following-robot.png',
    tags: ['AVR Assembly', 'ATmega328P', 'Arduino Uno', 'Robotics', 'PWM'],
    demo: 'https://docs.google.com/document/d/1k9SudemZJafofm2p3hludQYK7nMUtvUpkMm6N-_rJvY/edit?usp=sharing',
    repo: '#',
  },
  {
    title: 'K-Bin: Automated Smart Waste Sorting',
    category: 'Embedded & HMI',
    role: 'Software & Embedded Developer — Qt C++, CMake, Sensors',
    description:
      'A Qt C++ GUI with real-time level tracking and multi-sensor routing (inductive, capacitive, ultrasonic) to sort 3 waste streams.',
    longDescription:
      'Developed a Qt C++ GUI with real-time level tracking and multi-sensor routing (inductive, capacitive, ultrasonic) to sort 3 waste streams. Integrated SQLite logging for maintenance tracking and automated waste classification.',
    features: [
      '3-stream classification (Wet, Dry, Metal) via sensor fusion.',
      'Qt C++/CMake desktop GUI with real-time bin tracking.',
      'Multi-sensor routing (inductive, capacitive, ultrasonic).',
      'SQLite logging for maintenance tracking.',
    ],
    image: '/projects/k-bin.png',
    tags: ['Qt C++', 'CMake', 'SQLite', 'Sensors', 'Desktop GUI'],
    demo: 'https://drive.google.com/drive/folders/1OVPIXr5QFTa3_Uin5QVysLJvsKLshUdQ?usp=sharing',
    repo: '#',
  },
  {
    title: 'Adjustable DC Power Supply',
    category: 'Embedded & HMI',
    role: 'Electronics Engineering',
    description:
      'Engineered a regulated benchtop power supply unit with variable output up to 12V and short-circuit protection.',
    longDescription:
      'Engineered a regulated benchtop power supply unit with variable output up to 12V and short-circuit protection. Designed for reliable operation in various electronic applications and embedded system prototyping.',
    features: [
      'Variable output up to 12V.',
      'Short-circuit protection.',
      'Regulated linear design.',
      'Compact form factor for prototyping.',
    ],
    image: '/projects/power-supply.png',
    tags: ['Power Electronics', 'Circuit Design', 'Linear Regulator'],
    demo: '#',
    repo: '#',
  },
]

/** Anchor links rendered in the navbar. `href` must match a section id. */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]
