/**
 * ------------------------------------------------------------------
 * PORTFOLIO CONTENT - JOSEPH ALAN B. VERGARA
 * ------------------------------------------------------------------
 * Single source of truth for portfolio telemetry, projects, skills,
 * and academic / research achievements.
 * ------------------------------------------------------------------
 */

export const profile = {
  name: 'Joseph Vergara',
  callsign: 'JOAL',
  fullName: 'Joseph Alan B. Vergara',
  role: 'Embedded Systems & Edge AI Engineer',
  subRole: 'Firmware // TinyML // Full-Stack Telemetry',
  institution: 'Mindanao State University – Iligan Institute of Technology',
  department: 'College of Computer Studies • Dept. of Computer Applications',
  location: 'Iligan City, Philippines',
  address: 'Phase II-Doña Maria Subd, Tubod, Lanao Del Norte',
  email: 'josephalan.vergara@g.msuiit.edu.ph',
  personalEmail: 'hpesojnalab.aragrev@gmail.com',
  emails: {
    institutional: 'josephalan.vergara@g.msuiit.edu.ph',
    personal: 'hpesojnalab.aragrev@gmail.com',
  },
  phone: '+63 947-589-2995',
  website: 'https://joalvergs.tech',
  status: 'OPERATIONAL // 4TH YEAR EMBEDDED SYS',
  tagline: 'Engineering at the intersection of bare-metal silicon, real-time operating systems, and edge intelligence.',
  intro:
    '4th-year BS Computer Applications student majoring in Embedded Systems at MSU-IIT (CGPA: 1.96269). Architecting deterministic firmware in C/C++, FreeRTOS multitasking pipelines, TinyML edge inference (YOLOv8n / MediaPipe), and full-stack sensor telemetry.',
  bio: "I'm Joseph Alan B. Vergara ('Joal') — an embedded systems developer and edge AI researcher based in Iligan City, Philippines. Currently completing my BS Computer Applications (Major in Embedded Systems) at MSU-IIT, I focus on low-level firmware engineering (STM32, ESP32, AVR, Renesas RA6M3), RTOS deterministic task scheduling (FreeRTOS, RT-Thread), edge computer vision with zero cloud latency, and full-stack telemetry dashboards.",
  socials: {
    github: 'https://github.com/Joal0816',
    linkedin: 'https://www.linkedin.com/in/joseph-alan-vergara-638803348/',
    email: 'mailto:josephalan.vergara@g.msuiit.edu.ph',
    personalEmail: 'mailto:hpesojnalab.aragrev@gmail.com',
    gmailInstitutional: 'https://mail.google.com/mail/?view=cm&fs=1&to=josephalan.vergara@g.msuiit.edu.ph',
    gmailPersonal: 'https://mail.google.com/mail/?view=cm&fs=1&to=hpesojnalab.aragrev@gmail.com',
  },
  telemetry: {
    cgpa: '1.96269',
    yearLevel: '4th Year (Senior)',
    targetArchs: ['ARM Cortex-M', 'ESP32-P4 / Xtensa', 'AVR 8-bit', 'Renesas RA6M3', 'Intel 8051'],
    rtos: ['FreeRTOS', 'RT-Thread OS'],
    protocols: ['I2C', 'SPI', 'UART/USART', 'CAN', 'MQTT', 'HTTP/REST', 'WebSockets'],
    frameworks: ['Next.js 15/16', 'React 19', 'OpenCV', 'MediaPipe', 'YOLOv8', 'Flutter', 'Tailwind CSS'],
  },
}

export const education = [
  {
    degree: 'BS Computer Applications',
    major: 'Major in Embedded Systems',
    school: 'Mindanao State University – Iligan Institute of Technology (MSU-IIT)',
    period: 'Aug 2023 – Present',
    location: 'Iligan City, Philippines',
    gpa: 'CGPA: 1.96269',
    status: 'In Progress // 4th Year Senior',
    description:
      'Specialized curriculum in Microcontroller Programming, FreeRTOS & Real-Time Kernels, Edge AI & Computer Vision, Industrial PLC Automation (CODESYS), IoT Telemetry, and Digital Logic Design.',
    highlights: [
      'Focus: Deterministic RTOS task architectures, low-power state machines, and bare-metal register manipulation.',
      'Active researcher on multi-author PhD dissertation and Master’s research publications.',
    ],
  },
  {
    degree: 'Senior High School Diploma',
    major: 'Accountancy, Business & Management (ABM)',
    school: 'MSU-IIT Integrated Developmental School',
    period: '2021 – 2023',
    location: 'A. Bonifacio Ave, Brgy. Tibanga, Iligan City',
    status: 'Graduated with Academic Honors',
    description: 'Developed strong analytical and quantitative modeling foundations alongside independent engineering projects.',
    highlights: ['Academic Honors recipient.'],
  },
]

export const experiences = [
  {
    role: 'Co-Author & Full-Stack / Embedded Developer',
    organization: 'PhD Dissertation Research Collaboration',
    period: '2024 – Present',
    badge: 'Research Publication',
    description:
      'Designed a full-stack Learning Management System (React.js, Node.js, Supabase/PostgreSQL) to ingest live microcontroller hardware telemetry and automate laboratory scoring logic with zero manual intervention. Benchmarked standard cloud server deployments against an edge-hosted architecture on the ESP32-P4 microcontroller.',
    tags: ['ESP32-P4', 'Microcontroller Telemetry', 'React', 'Node.js', 'PostgreSQL', 'Edge Benchmarking'],
  },
  {
    role: 'Co-Author & Mobile / Edge AI Developer',
    organization: "Master's & Undergraduate Research Collaboration",
    period: '2024 – Present',
    badge: 'Edge AI Research',
    description:
      'Quantized and deployed an optimized YOLOv8n edge AI model into a cross-platform mobile application for zero-latency, on-device microplastic particle quantification. Configured native Android SDK build toolchains, automated OpenCV preprocessing pipelines, and established on-device inference benchmarking.',
    tags: ['YOLOv8n', 'Edge Impulse', 'TFLite', 'Android SDK', 'Computer Vision', 'Mobile AI'],
  },
]

export const certifications = [
  {
    name: 'IEEE Sumpai Hackathon 2026',
    issuer: '1st floor, CCS Building, ICTD, MSU-IIT, Iligan City',
    date: 'September 14, 2026',
    image: '/certificates/TECH/ieee-sumpai-hackathon-2026.jpg',
    category: 'Hackathon & AI',
  },
  {
    name: 'AI Career Readiness Training',
    issuer: 'ICT 3D, CCS Building, MSU-IIT, Iligan City',
    date: 'August 20, 2026',
    image: '/certificates/TECH/AI Career Readiness Training.png',
    category: 'Edge AI & Professional',
  },
  {
    name: 'Quantum Circuits as Pictures: An Introduction to ZX Calculus',
    issuer: 'Zoom Meeting, Webinar Series',
    date: 'March 20, 2026',
    image: '/certificates/TECH/Quantum Circuits as Pictures_ An Introduction to ZX Calculus.pdf',
    category: 'Quantum Computing',
  },
  {
    name: 'Permaculture Webinar "From Code to Crops"',
    issuer: 'Zoom Meeting, Webinar Series',
    date: 'December 22, 2025',
    image: '/certificates/TECH/Permaculture Webinar \u201cFrom Code to Crops\u201d.png',
    category: 'Smart Agriculture & IoT',
  },
  {
    name: 'TechShowcase 2025 Innovation in Application Development and Emerging Technologies',
    issuer: 'PRISM Mini theater, MSU-IIT, Iligan City',
    date: 'December 17, 2025',
    image: '/certificates/TECH/techshowcase-2025.jpg',
    category: 'Innovation Award',
  },
  {
    name: 'my.ComApps Technology Symposium and Exhibit on RT-Thread Based Technology',
    issuer: '4th floor CCS Building, MSU-IIT, Iligan City',
    date: 'November 24-25, 2025',
    image: '/certificates/TECH/my-comapps-tech-symposium.jpg',
    category: 'RTOS & Embedded',
  },
  {
    name: 'Seize Your Opportunity Internships and OJTs Workshop!',
    issuer: 'ICT 3D, CCS Building, MSU-IIT, Iligan City',
    date: 'November 24, 2025',
    image: '/certificates/TECH/Seize Your Opportunity Internships and OJTs Workshop!.png',
    category: 'Professional Dev',
  },
  {
    name: 'Software Freedom Day 2023',
    issuer: 'CCS Building, MSU-IIT, Iligan City',
    date: 'September 16, 2023',
    image: '/certificates/TECH/Software Freedom Day 2023.png',
    category: 'Open Source',
  },
  {
    name: 'Academic Honors Recognition (Grade 11)',
    issuer: 'MSU-IIT Integrated Developmental School',
    date: '2022 – 2023',
    image: '/certificates/OTHERS/ids-academic-honor-g11.pdf',
    category: 'Academic Honors',
  },
  {
    name: 'MSU-IIT SASE 2023 Official Admission & Acceptance',
    issuer: 'Mindanao State University – IIT Admissions',
    date: 'August 2023',
    image: '/certificates/OTHERS/msuiit-sase-admission-acceptance.pdf',
    category: 'Academic Merit',
  },
  {
    name: 'TUKISayod Research & Academic Symposium',
    issuer: 'MSU-IIT Research Colloquium Series',
    date: '2023',
    image: '/certificates/OTHERS/tukisayod-certificate-of-participation.pdf',
    category: 'Research Colloquium',
  },
  {
    name: 'TEENPRENEUR 2021 Business & Innovation Bootcamp',
    issuer: 'Youth Entrepreneurship Program & Mentorship',
    date: '2021',
    image: '/certificates/OTHERS/teenpreneur-2021.pdf',
    category: 'Technopreneurship',
  },
  {
    name: 'Statistics: Bridging Gaps For Every Juan in the Digital Age',
    issuer: 'Department of Mathematics and Statistics, MSU-IIT',
    date: 'October 2023',
    image: '/certificates/OTHERS/statistics-bridging-gaps-digital-age.pdf',
    category: 'Data & Analytics',
  },
  {
    name: 'DMS National Statistics Month Webinar Series',
    issuer: 'Department of Mathematics & Statistics (DMS)',
    date: '2023',
    image: '/certificates/OTHERS/dms-statistics-webinar-participation.pdf',
    category: 'Data & Analytics',
  },
  {
    name: 'MSU-IIT Official Certificate of Registration & Enrolment',
    issuer: 'Office of the Institute Registrar, MSU-IIT',
    date: '2023 – Present',
    image: '/certificates/OTHERS/msuiit-certificate-of-registration.pdf',
    category: 'Academic Records',
  },
]

export const leadership = [
  {
    role: 'College of Computer Studies Executive Council',
    organization: 'Sports & Development Affairs – Undersecretary',
    period: 'Aug 2025 – May 2026',
    description: 'Directed student engagement, inter-collegiate tournaments, and technical community sports initiatives at MSU-IIT.',
  },
  {
    role: 'Titans Esports',
    organization: 'Mobile Legends: Bang Bang Team Captain',
    period: '2021 – 2023',
    description: 'Competitive tactical leadership, communication orchestration, and high-pressure team execution in regional tournaments.',
  },
]

export const skillGroups = [
  {
    category: 'Embedded Systems & RTOS',
    tag: 'FIRMWARE_CORE',
    skills: [
      'C',
      'C++',
      'FreeRTOS',
      'RT-Thread RTOS',
      'STM32 (Blue Pill / Cortex-M3)',
      'ESP32 / ESP32-P4',
      'Renesas RA6M3',
      'ATmega328P / AVR',
      'Intel 8051',
      'Bare-Metal Firmware',
      'Task Synchronization & Queues',
      'Hardware Timers & Interrupts (ISR)',
    ],
  },
  {
    category: 'Edge AI & Computer Vision',
    tag: 'TINYML_INFERENCE',
    skills: [
      'YOLOv8n / Ultralytics',
      'MediaPipe Pose Kinematics',
      'OpenCV',
      'Edge Impulse',
      'Roboflow',
      'TensorFlow Lite / Micro',
      'MLX90640 Thermal Radiometry',
      'Model Quantization (INT8/FP16)',
      'Zero-Latency Mobile Inference',
    ],
  },
  {
    category: 'Protocols & Hardware Design',
    tag: 'BUS_&_CIRCUITS',
    skills: [
      'I2C',
      'SPI',
      'UART / USART',
      'CAN Bus',
      'MQTT / Mosquitto',
      'PLC Ladder Logic (CODESYS V3)',
      'PCB Layout & Soldering',
      'Oscilloscope & Logic Analyzers',
      'Rotary Encoders & OLEDs (SSD1306)',
      'Sensor Fusion (IR, Inductive, Ultrasonic)',
    ],
  },
  {
    category: 'Web & Telemetry Architecture',
    tag: 'FULLSTACK_IOT',
    skills: [
      'TypeScript',
      'Next.js 15/16',
      'React 19',
      'Node.js',
      'Tailwind CSS v4',
      'Supabase',
      'PostgreSQL',
      'SQLite',
      'REST APIs & WebSockets',
      'Flutter (Web & Android)',
    ],
  },
  {
    category: 'Toolchains, DevOps & OS',
    tag: 'SYS_ENVIRONMENT',
    skills: [
      'Linux (Arch Linux, CachyOS)',
      'Git & GitHub CI/CD',
      'CMake / Makefiles',
      'Microchip (ATMEL) Studio',
      'RT-Thread Studio',
      'SquareLine Studio / LVGL',
      'VS Code / Neovim',
      'Cloudflare Pages / Vercel',
      'Bash & Zsh Scripting',
    ],
  },
]

export type ProjectCategory =
  | 'Full-Stack & Embedded'
  | 'Mobile & Edge AI'
  | 'Embedded & HMI'
  | 'Web Development'

export const projectCategories: ProjectCategory[] = [
  'Full-Stack & Embedded',
  'Mobile & Edge AI',
  'Embedded & HMI',
  'Web Development',
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
  demoLabel?: string
  repo: string
  repoLabel?: string
  badge?: string
  telemetrySpec?: {
    target: string
    protocol: string
    latency?: string
    clockSpeed?: string
    memoryFootprint?: string
  }
  codeSnippet?: {
    filename: string
    language: string
    code: string
  }
  architectureFlow?: string[]
}

export const projects: Project[] = [
  {
    title: 'O.I.N.K. — Swine Thermal Fever Surveillance',
    category: 'Full-Stack & Embedded',
    role: 'Lead Firmware & Edge CV Developer',
    badge: 'Live Telemetry System',
    description:
      'Continuous thermal screening pipeline utilizing an MLX90640 32x24 IR array on ESP32 streaming to edge CV inference and a live Flutter telemetry dashboard.',
    longDescription:
      'Engineered an automated non-invasive fever surveillance system for livestock biosecurity. Streams real-time 768-pixel thermal heatmaps from an MLX90640 sensor over ESP32 Wi-Fi to an edge laptop processing pipeline. Employs OpenCV false-color visualization, radiometric temperature calibration, and automated febrile threshold triggers with cross-platform Flutter Web/Android telemetry monitoring.',
    features: [
      'MLX90640 32x24 (768-pixel) thermal matrix streaming at 4-8 Hz over ESP32 Wi-Fi.',
      'Edge OpenCV radiometric calibration, isotherm filtering, and thermal heatmaps.',
      'Automated febrile state classification triggers for early swine illness intervention.',
      'Full cross-platform telemetry monitoring deployed live via Flutter Web and Android.',
    ],
    image: '/projects/oink-system.png',
    tags: ['ESP32', 'MLX90640', 'Thermal Imaging', 'Flutter', 'OpenCV', 'IoT Telemetry'],
    demo: 'https://oink.joalvergs.tech',
    demoLabel: 'Live Platform',
    repo: 'https://github.com/Joal0816/oink',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'ESP32-WROOM-32',
      protocol: 'I2C / Wi-Fi UDP Stream',
      latency: '< 120ms pipeline',
      clockSpeed: '240 MHz Dual-Core',
      memoryFootprint: '520 KB SRAM',
    },
    codeSnippet: {
      filename: 'mlx90640_telemetry.c',
      language: 'c',
      code: `void vTaskThermalAcquire(void *pvParameters) {
  float frame[768];
  for(;;) {
    if (mlx90640_get_frame_data(MLX_I2C_ADDR, frame) == ESP_OK) {
      calibrate_radiometry(frame, &g_telemetry.max_temp);
      if (g_telemetry.max_temp > FEVER_THRESHOLD_C) {
        gpio_set_level(ALARM_PIN, 1);
        send_udp_fever_packet(&g_telemetry);
      }
    }
    vTaskDelay(pdMS_TO_TICKS(125)); // 8 Hz acquisition
  }
}`,
    },
    architectureFlow: [
      'MLX90640 32x24 Sensor',
      'I2C 400kHz DMA Bus',
      'ESP32 FreeRTOS Kernel',
      'UDP Wi-Fi Streamer',
      'OpenCV False-Color & Flutter App',
    ],
  },
  {
    title: 'Agap AI — Multimodal Emergency Triage Platform',
    category: 'Web Development',
    role: 'Lead Full-Stack & AI Systems Architect — IEEE Sumpai Hackathon 2026',
    badge: 'IEEE Hackathon 2026',
    description:
      'Emergency response platform translating panicked SOS voice calls into structured responder situational intelligence and real-time GIS dispatch queues.',
    longDescription:
      'Developed during the IEEE Sumpai Hackathon 2026, Agap AI addresses 911/emergency dispatch bottlenecks during natural disasters and mass-casualty incidents. Uses multimodal speech-to-text and NLP extraction to turn unstructured audio calls into immediate dispatch telemetry: geolocation extraction, injury severity grading, hazard categorization, and interactive geospatial mapping for rapid response teams.',
    features: [
      'Multimodal SOS ingestion transforming frantic voice calls into structured incident logs.',
      'NLP extraction for automated caller geolocation, injury severity, and danger levels.',
      'Real-time GIS emergency dispatch map with instant priority queue ordering.',
      'Designed for extreme low-bandwidth resiliency during regional network disruptions.',
    ],
    image: '/projects/agap-ai.jpg',
    tags: ['Next.js', 'TypeScript', 'AI / NLP', 'GIS Mapping', 'Speech-to-Text', 'Hackathon'],
    demo: 'https://github.com/Joal0816/agap-ai',
    demoLabel: 'View Repository',
    repo: 'https://github.com/Joal0816/agap-ai',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'Next.js 15 & AI Engine',
      protocol: 'WebSockets / REST',
      latency: 'Sub-second NLP parsing',
      clockSpeed: 'Multi-Core Edge Host',
      memoryFootprint: 'V8 Isolate / 64MB',
    },
    codeSnippet: {
      filename: 'emergency_nlp_triage.ts',
      language: 'typescript',
      code: `export async function classifySosPayload(audioBuffer: ArrayBuffer) {
  const transcript = await whisperEdgeInference(audioBuffer);
  const triage = await nlpEngine.extractTelemetry({
    text: transcript,
    entities: ['injury_severity', 'gps_coordinates', 'hazard_type'],
  });
  await broadcastGisPriorityQueue(triage);
  return { status: 'DISPATCHED', priority: triage.priorityScore };
}`,
    },
    architectureFlow: [
      'Caller Audio Stream',
      'Whisper Edge ASR',
      'NLP Triage Classifier',
      'GIS Geospatial Map',
      'First Responder Dispatch',
    ],
  },
  {
    title: 'BCA182 Multisensor Room Monitor',
    category: 'Embedded & HMI',
    role: 'Firmware & Systems Engineer',
    badge: 'Hackster.io Published',
    description:
      'Real-time environmental telemetry system built on STM32 ARM Cortex-M3 (Blue Pill) running a 5-task FreeRTOS architecture with SSD1306 OLED and rotary encoder.',
    longDescription:
      'Architected a deterministic environmental monitoring workstation running FreeRTOS on the STM32F103C8T6 (Blue Pill). Employs a pre-emptive 5-task priority structure for sensor acquisition, SSD1306 OLED graphical rendering, rotary encoder UI navigation, serial logging, and sleep mode management. Validated with 33 unit tests and complete technical schematics published on Hackster.io.',
    features: [
      'Preemptive FreeRTOS 5-task priority kernel on STM32 Cortex-M3 (Blue Pill).',
      'I2C SSD1306 OLED display driver paired with quadrature rotary encoder menu navigation.',
      'Power-saving idle state machine with wake-on-interrupt external triggers.',
      '33 automated unit tests validating sensor queue synchronization and telemetry integrity.',
    ],
    image: '/projects/room-monitor.png',
    tags: ['FreeRTOS', 'STM32 Blue Pill', 'ARM Cortex-M3', 'C', 'I2C/SPI', 'Hackster.io'],
    demo: 'https://www.hackster.io/554910/real-time-multisensor-room-monitoring-system-with-freertos-450a00',
    demoLabel: 'Hackster Writeup',
    repo: 'https://github.com/Joal0816/BCA182-RoomMonitor',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'STM32F103C8T6',
      protocol: 'I2C / Hardware EXTI',
      latency: 'Deterministic 5ms Tick',
      clockSpeed: '72 MHz ARM Cortex-M3',
      memoryFootprint: '20 KB SRAM / 64 KB Flash',
    },
    codeSnippet: {
      filename: 'freertos_scheduler.c',
      language: 'c',
      code: `xTaskCreate(vTaskSensorRead,   "SENS", 128, NULL, 4, &xSensorHandle);
xTaskCreate(vTaskOledDisplay,  "DISP", 256, NULL, 2, &xOledHandle);
xTaskCreate(vTaskEncoderInput, "ENC",  128, NULL, 3, &xEncoderHandle);
xTaskCreate(vTaskSerialLog,    "LOG",  128, NULL, 1, &xLogHandle);

/* Preemptive tick scheduler started */
vTaskStartScheduler();`,
    },
    architectureFlow: [
      'DHT22 & Light Sensors',
      'STM32 EXTI & ADC Timers',
      'FreeRTOS Priority Queues',
      'SSD1306 OLED Rendering',
      'Rotary Encoder HMI',
    ],
  },
  {
    title: 'ARUGA Fall Detection & Inactivity Monitoring',
    category: 'Mobile & Edge AI',
    role: 'Computer Vision & Edge AI Engineer',
    badge: 'Biomechanical Kinematics',
    description:
      'Zero-dataset real-time computer vision system using 33-point MediaPipe Pose kinematics, spine inclination vectors, and inactivity timers for eldercare safety.',
    longDescription:
      'Engineered an edge computer vision fall-detection and prolonged inactivity monitoring system that bypasses training dataset constraints through direct kinematic vector math. Tracks MediaPipe Pose 33-point skeletal landmarks to calculate vertical centroid drop velocity and spine inclination angles, sounding emergency alerts and updating a live telemetry dashboard upon hazardous immobilization.',
    features: [
      'Deterministic zero-dataset kinematic analysis using MediaPipe Pose 33-point tracking.',
      'Real-time calculation of spine inclination angles and centroid velocity vectors.',
      'Prolonged inactivity timer with automated alert thresholds for elder safety.',
      'Live visual telemetry dashboard with skeleton wireframe overlay and alarm state machine.',
    ],
    image: '/projects/aruga-system.png',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Kinematics', 'Edge AI', 'Computer Vision'],
    demo: 'https://github.com/Joal0816/ARUGA-fall-detection-and-inactivity-monitoring-system',
    demoLabel: 'View Repository',
    repo: 'https://github.com/Joal0816/ARUGA-fall-detection-and-inactivity-monitoring-system',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'Edge Compute (Python/CV)',
      protocol: 'Real-Time Video Stream',
      latency: '30 FPS Real-Time',
      clockSpeed: 'Zero-Cloud Local Host',
      memoryFootprint: '120 MB RAM',
    },
    codeSnippet: {
      filename: 'kinematic_fall_classifier.py',
      language: 'python',
      code: `def evaluate_kinematic_pose(landmarks, prev_centroid_y, dt):
    spine_vector = landmarks[NOSE] - landmarks[MID_HIP]
    pitch_angle = np.degrees(np.arctan2(spine_vector.y, spine_vector.x))
    drop_velocity = (landmarks[MID_HIP].y - prev_centroid_y) / dt

    if pitch_angle > 65.0 and drop_velocity > 2.8:
        trigger_fall_alarm(pitch_angle, drop_velocity)
        return State.CRITICAL_FALL
    return State.STABLE_AMBULATION`,
    },
    architectureFlow: [
      'Camera Video Feed',
      'MediaPipe 33-pt Skeleton',
      'Spine Vector Calculation',
      'Drop Velocity Thresholding',
      'Emergency Telemetry Alert',
    ],
  },
  {
    title: 'Microcontroller-Based Automated Feedback System',
    category: 'Full-Stack & Embedded',
    role: 'Co-Author & Full-Stack / Embedded Developer — PhD Research Collaboration',
    badge: 'PhD Dissertation Research',
    description:
      'Full-stack LMS paired with live sensor telemetry and edge hosting on ESP32-P4 for automated laboratory assessment.',
    longDescription:
      'Designed a specialized full-stack Learning Management System (React.js, Node.js, Supabase/PostgreSQL) to capture live microcontroller telemetry and automate laboratory scoring logic. Reduced evaluation latency and eliminated manual record-keeping errors by engineering deterministic evaluation pipelines paired with interactive instructor dashboards for instant feedback. Benchmarked standard web server deployments against an edge-hosted architecture on the ESP32-P4 microcontroller to evaluate low-power, localized server reliability.',
    features: [
      'Full-stack LMS architecture (React.js, Node.js, Supabase/PostgreSQL).',
      'Real-time microcontroller telemetry capture and automated scoring logic.',
      'Deterministic evaluation pipelines with interactive dashboards.',
      'Benchmarked edge deployment on ESP32-P4 vs standard cloud servers.',
    ],
    image: '/projects/manual-interface.png',
    tags: ['React.js', 'Node.js', 'Supabase', 'PostgreSQL', 'ESP32-P4', 'IoT Telemetry'],
    demo: 'https://miow-lms.ter-ids.online/auth',
    demoLabel: 'Live Platform',
    repo: 'https://github.com/MIOW-CODES/lms',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'ESP32-P4 Dual Core RISC-V',
      protocol: 'HTTP / REST Telemetry',
      latency: '< 50ms Edge Scoring',
      clockSpeed: '400 MHz RISC-V / Xtensa',
      memoryFootprint: '768 KB L2 Cache',
    },
    codeSnippet: {
      filename: 'edge_lms_sync.c',
      language: 'c',
      code: `void handle_lab_telemetry_packet(telemetry_pkt_t *pkt) {
  bool passed = verify_pin_waveform(pkt->pin, pkt->expected_hz);
  grade_record_t record = {
    .student_uid = pkt->student_uid,
    .score = passed ? 100 : 0,
    .timestamp = esp_timer_get_time()
  };
  sqlite3_insert_lab_grade(&record);
}`,
    },
    architectureFlow: [
      'Microcontroller Lab Bench',
      'Hardware Waveform Monitor',
      'ESP32-P4 Edge Ingest',
      'Automated Scoring Logic',
      'Full-Stack LMS Telemetry',
    ],
  },
  {
    title: 'Mobile Microplastic Detection App',
    category: 'Mobile & Edge AI',
    role: 'Co-Author & Edge AI Developer — Master’s & Undergraduate Collaboration',
    badge: 'Published Collaboration',
    description:
      'On-device computer vision mobile app using quantized YOLOv8n for real-time microplastic classification with zero cloud latency.',
    longDescription:
      'Deployed an optimized YOLOv8n edge AI model into a cross-platform mobile app for zero-latency, on-device particle quantification. Configured Android SDK build environments to generate release APKs and established deployment bundles for iOS targets. Enhanced UI/UX flow to handle camera lifecycles, live bounding-box rendering, and research-grade inference visualization.',
    features: [
      'Zero-latency on-device particle quantification with quantized YOLOv8n.',
      'Cross-platform deployment (Android APKs & iOS bundles).',
      'Camera lifecycle management with live bounding-box rendering.',
      'Research-grade inference visualization and statistical reporting.',
    ],
    image: '/projects/mp-detect.jpg',
    tags: ['YOLOv8n', 'Edge AI', 'TFLite', 'Android SDK', 'Computer Vision'],
    demo: 'https://drive.google.com/drive/folders/1GQxtqUJavVlL_n6gHiRzwvTUOWCLO-tB?usp=sharing',
    demoLabel: 'View Documentation',
    repo: 'https://github.com/MP-DETECT-CODE/Mp-Detect',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'Mobile Neural Engine (NPU/GPU)',
      protocol: 'TFLite Model Runner',
      latency: '22ms per frame',
      clockSpeed: 'On-Device Mobile GPU',
      memoryFootprint: '4.2 MB INT8 Model',
    },
    codeSnippet: {
      filename: 'tflite_runner.kt',
      language: 'kotlin',
      code: `val inputTensor = preprocessMicroscopeBitmap(frameBitmap)
val outputBuffer = TensorBuffer.createFixedSize(intArrayOf(1, 84, 8400), DataType.FLOAT32)
tfliteInterpreter.run(inputTensor.buffer, outputBuffer.buffer)

val particles = postprocessNms(outputBuffer, confidenceThreshold = 0.65f)
updateParticleTelemetryCount(particles.size)`,
    },
    architectureFlow: [
      'Microscope Video Feed',
      'OpenCV Filter & Crop',
      'TFLite INT8 Quantized YOLO',
      'Non-Max Suppression (NMS)',
      'Real-Time Particle Count',
    ],
  },
  {
    title: 'Barangay Connect Web App',
    category: 'Web Development',
    role: 'Full-Stack Developer — TechShowcase 2025 Award Winner',
    badge: '2nd Best Innovation Award',
    description:
      'Full-stack civic management platform streamlining local governance with incident reporting, document requests, and real-time polls.',
    longDescription:
      'Built a full-stack community management platform with React, Supabase, and PostgreSQL that enables residents to report incidents, request documents, vote in polls, and receive real-time notifications — streamlining barangay governance through a modern, accessible web application. Won 2nd Best Innovation and 3rd Best Pitch at TechShowcase 2025, MSU-IIT.',
    features: [
      'Full-stack platform with Supabase Auth and PostgreSQL Row Level Security.',
      'Incident reporting with photo uploads via Supabase Storage.',
      'Document request system with real-time status tracking.',
      'Community polls with instant voting and results visualization.',
      'Admin analytics dashboard with user role management.',
    ],
    image: '/projects/barangay-connect.png',
    tags: ['React', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    demo: 'https://barangay-connect.joalvergs.tech',
    demoLabel: 'Live Platform',
    repo: 'https://github.com/Joal0816/Barangay-Connect',
    repoLabel: 'GitHub Repo',
  },
  {
    title: 'Snake OS: Embedded Interactive HMI Game',
    category: 'Embedded & HMI',
    role: 'Embedded Developer — Renesas RA6M3, RT-Thread OS, LVGL',
    badge: 'Hackster.io Showcase',
    description:
      'Arcade game engine utilizing RT-Thread RTOS and LVGL to deliver fluid real-time graphical rendering and autonomous AI autopilot on bare metal.',
    longDescription:
      'Engineered an arcade game engine utilizing Renesas RA6M3, RT-Thread RTOS, and LVGL to deliver fluid real-time graphical rendering on bare metal. Implemented autonomous AI autopilot navigation, non-volatile high-score persistence, and dynamic multi-level obstacle logic.',
    features: [
      'Real-time 2D graphics engine powered by LVGL on RT-Thread OS.',
      'Autonomous AI autopilot navigation mode with pathfinding.',
      'Non-volatile high-score persistence in onboard flash.',
      'Dynamic multi-level obstacle generation and physics loop.',
    ],
    image: '/projects/snake-os.png',
    tags: ['C', 'Renesas RA6M3', 'RT-Thread', 'LVGL', 'RTOS', 'HMI'],
    demo: 'https://www.hackster.io/josephalanvergara/snake-os-interactive-hmi-game-on-rt-thread-f8b988',
    demoLabel: 'Hackster Writeup',
    repo: 'https://github.com/Joal0816/Snake-OS-RT-Thread-HMI',
    repoLabel: 'GitHub Repo',
    telemetrySpec: {
      target: 'Renesas RA6M3 (120MHz Cortex-M4)',
      protocol: 'SPI Display + LVGL GUI',
      latency: '60 FPS display refresh',
    },
  },
  {
    title: 'Sustainability in the Cup Web',
    category: 'Web Development',
    role: 'Frontend & Data Visualization Engineer',
    badge: 'Latest Release // Production',
    description:
      'Interactive research platform examining green marketing claims and consumer trust across Northern Mindanao cafés.',
    longDescription:
      'Engineered an interactive web platform presenting empirical environmental science research on the claim–practice gap in café culture across Western Misamis Oriental, Northern Mindanao. Features the 8Ps green marketing mix, the Seven Sins of Greenwashing matrix, interactive survey questionnaires, an authenticity scoring tool, and full document previews. Deployed on custom domain cup.joalvergs.tech with sub-50ms global edge delivery.',
    features: [
      'Interactive Green Claim Evaluator with live authenticity & greenwashing risk scoring.',
      'Comprehensive 8Ps green marketing mix and TerraChoice Seven Sins matrix.',
      'Interactive survey questionnaire instruments for consumers, owners, and baristas.',
      'Full research thesis proposal preview with PDF viewer and methodology charts.',
    ],
    image: '/projects/sustainability-in-the-cup.png',
    tags: ['React', 'Data Visualization', 'Cloudflare Pages', 'Tailwind CSS', 'Chart.js'],
    demo: 'https://cup.joalvergs.tech',
    demoLabel: 'Live System (cup.joalvergs.tech)',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
    telemetrySpec: {
      target: 'Cloudflare Pages Edge',
      protocol: 'HTTPS / TLS 1.3 / Custom Domain',
      latency: '< 45ms Edge Delivery',
    },
  },
  {
    title: 'Edge AI Glasses Object Detection',
    category: 'Full-Stack & Embedded',
    role: 'Edge AI Developer — Roboflow, Edge Impulse',
    badge: 'Wearable TinyML',
    description:
      'Low-latency on-device eyewear object detection trained via Roboflow and quantized with Edge Impulse for wearable assistance.',
    longDescription:
      'Trained, quantized, and validated a low-latency edge vision model for wearable hardware via Edge Impulse and custom Roboflow datasets. The model executes directly on wearable microcontrollers for real-time visual assistance without external cloud dependencies.',
    features: [
      'Low-latency edge-optimized vision inference on wearable hardware.',
      'Custom dataset curation and augmentation in Roboflow.',
      'Quantized INT8 model for resource-constrained wearable MCUs.',
      'Standalone operation with zero cloud latency and full privacy.',
    ],
    image: '/projects/object-detection.jpg',
    tags: ['Edge Impulse', 'Roboflow', 'TinyML', 'Computer Vision', 'Wearable'],
    demo: 'https://studio.edgeimpulse.com/studio/848525',
    demoLabel: 'Edge Impulse Studio',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
  },
  {
    title: 'Industrial Oven Simulation & Control',
    category: 'Embedded & HMI',
    role: 'PLC & Automation Developer — CODESYS V3, PLC, HMI',
    badge: 'Industrial Automation',
    description:
      'Virtual PLC ladder logic and interactive HMI with automated heating logic, safety interlocks, and threshold alarms.',
    longDescription:
      'Engineered virtual PLC ladder logic and an interactive HMI with automated heating logic, safety interlocks, and threshold alarms. Features real-time temperature monitoring, adjustable setpoints, and safety mechanisms to prevent thermal overrun in simulated industrial environments.',
    features: [
      'Virtual PLC ladder logic in CODESYS V3.',
      'Interactive HMI with threshold alarms and safety interlocks.',
      'Automated heating logic with real-time feedback loops.',
      'Adjustable setpoints for thermal regulation.',
    ],
    image: '/projects/industrial-oven.png',
    tags: ['CODESYS V3', 'PLC', 'Ladder Logic', 'HMI', 'Industrial Automation'],
    demo: 'https://sites.google.com/g.msuiit.edu.ph/hassanvergarafinalproject?usp=sharing',
    demoLabel: 'View Documentation',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
  },
  {
    title: 'IoT Vermicomposting Monitor',
    category: 'Embedded & HMI',
    role: 'IoT Developer — ESP32, MQTT, Sensors',
    badge: 'Smart Agriculture',
    description:
      'Automated closed-loop irrigation triggered on real-time soil moisture (60-80%) with 5+ environmental parameters over MQTT.',
    longDescription:
      'Automated closed-loop irrigation triggered on real-time soil moisture levels (60-80%) and piped 5+ environmental parameters over MQTT to a centralized dashboard for continuous monitoring and biological cultivation analysis.',
    features: [
      'Real-time soil moisture monitoring (60-80% threshold).',
      'Automated closed-loop relay irrigation control.',
      '5+ environmental parameters streamed via MQTT.',
      'Centralized telemetry dashboard for continuous monitoring.',
    ],
    image: '/projects/vermicomposting.png',
    tags: ['ESP32', 'MQTT', 'IoT', 'Sensors', 'Environmental Monitoring'],
    demo: 'https://canva.link/k5sngerg431bggp',
    demoLabel: 'View Documentation',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
  },
  {
    title: 'Line Following Robot',
    category: 'Embedded & HMI',
    role: 'Firmware Developer — Arduino Uno, AVR Assembly',
    badge: 'Bare-Metal AVR',
    description:
      'Hand-tuned AVR Assembly firmware and dual PWM hardware timers (Timer0/2) for a 5-channel IR array, achieving 100% course completion.',
    longDescription:
      'Hand-tuned AVR Assembly firmware and dual PWM hardware timers (Timer0/2) for a 5-channel IR array, achieving a 100% course completion rate. Processes sensor readings with deterministic pattern matching for high-speed line tracking.',
    features: [
      'Low-level AVR Assembly on ATmega328P.',
      'Dual hardware PWM timer control (Timer0/2).',
      '5-channel IR sensor array with fast debounce.',
      '100% course completion rate.',
    ],
    image: '/projects/line-following-robot.png',
    tags: ['AVR Assembly', 'ATmega328P', 'Arduino Uno', 'Robotics', 'PWM'],
    demo: 'https://docs.google.com/document/d/1k9SudemZJafofm2p3hludQYK7nMUtvUpkMm6N-_rJvY/edit?usp=sharing',
    demoLabel: 'Project Report',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
  },
  {
    title: 'K-Bin: Automated Smart Waste Sorting',
    category: 'Embedded & HMI',
    role: 'Software & Embedded Developer — Qt C++, CMake, Sensors',
    badge: 'Desktop HMI & Sensors',
    description:
      'A Qt C++ GUI with real-time level tracking and multi-sensor routing (inductive, capacitive, ultrasonic) to sort 3 waste streams.',
    longDescription:
      'Developed a Qt C++ GUI with real-time level tracking and multi-sensor routing (inductive, capacitive, ultrasonic) to sort 3 waste streams. Integrated SQLite logging for maintenance tracking and automated waste classification.',
    features: [
      '3-stream classification (Wet, Dry, Metal) via sensor fusion.',
      'Qt C++/CMake desktop GUI with real-time bin tracking.',
      'Multi-sensor routing (inductive, capacitive, ultrasonic).',
      'SQLite logging for maintenance and fill-level tracking.',
    ],
    image: '/projects/k-bin.png',
    tags: ['Qt C++', 'CMake', 'SQLite', 'Sensors', 'Desktop GUI'],
    demo: 'https://drive.google.com/drive/folders/1OVPIXr5QFTa3_Uin5QVysLJvsKLshUdQ?usp=sharing',
    demoLabel: 'View Documentation',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
  },
  {
    title: 'Adjustable DC Power Supply',
    category: 'Embedded & HMI',
    role: 'Electronics Engineering',
    badge: 'Hardware Prototyping',
    description:
      'Regulated benchtop power supply unit with variable output up to 12V and short-circuit protection for embedded development.',
    longDescription:
      'Engineered a regulated benchtop power supply unit with variable output up to 12V and short-circuit protection. Designed for reliable benchtop operation during embedded system prototyping and sensor calibration.',
    features: [
      'Variable output up to 12V regulated DC.',
      'Integrated short-circuit protection circuitry.',
      'Clean low-ripple linear regulation for sensitive MCUs.',
      'Compact lab bench chassis with terminal lugs.',
    ],
    image: '/projects/power-supply.png',
    tags: ['Power Electronics', 'Circuit Design', 'Linear Regulator', 'Hardware'],
    demo: '#',
    repo: 'https://github.com/Joal0816',
    repoLabel: 'GitHub Profile',
  },
]

export const navLinks = [
  { label: 'About', href: '#about', code: '01' },
  { label: 'Telemetry', href: '#telemetry', code: '02' },
  { label: 'Projects', href: '#projects', code: '03' },
  { label: 'Certifications', href: '#certifications', code: '04' },
  { label: 'Contact', href: '#contact', code: '05' },
]
