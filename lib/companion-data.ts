export type CharacterId = 'joal' | 'rera' | 'area'

export interface Character {
  id: CharacterId
  name: string
  species: string
  photo: string
  greeting: string
  suggestions: string[]
}

export const CHARACTER_ORDER: CharacterId[] = ['joal', 'rera', 'area']

export const CHARACTERS: Record<CharacterId, Character> = {
  joal: {
    id: 'joal',
    name: 'Joal',
    species: 'Embedded Engineer',
    photo: '/companion/joal.jpg',
    greeting: "Hey there! I'm Joal's digital twin. Ask me anything about my embedded systems, Edge AI builds, or just say hi!",
    suggestions: ['What do you build?', 'Hire you?', 'Tell me a joke', 'Tell me about your cats'],
  },
  rera: {
    id: 'rera',
    name: 'Rera',
    species: 'Orange Cat',
    photo: '/companion/cat-orange.jpg',
    greeting: 'MRRP! *zoomies across your screen* You brought tuna, right?! Tell me you brought tuna!!',
    suggestions: ['Got treats?', 'Tell me a joke', "Who's Area?", 'Say hi to Joal'],
  },
  area: {
    id: 'area',
    name: 'Area',
    species: 'Tabby Cat',
    photo: '/companion/cat-tabby.jpg',
    greeting: '*slow blink* Oh, someone is typing. Make it brief, please—I have a crucial sunbeam appointment in five minutes.',
    suggestions: ['Are you sleepy?', 'What do you do all day?', 'Is Rera annoying?', 'Say hi'],
  },
}

type Intent = 'greeting' | 'whoAreYou' | 'skillsWork' | 'contact' | 'pets' | 'joke' | 'help'

const INTENT_PATTERNS: Record<Intent, RegExp> = {
  greeting: /\b(hi|hello|hey|yo|howdy|sup|greetings|good\s+(morning|afternoon|evening))\b/i,
  whoAreYou: /\b(who\s+are\s+you|what('?s|\s+is)\s+your\s+name|who('?s|\s+is)\s+(joal|rera|area)|tell\s+me\s+about\s+yourself|introduce\s+yourself)\b/i,
  skillsWork: /\b(skill|skills|stack|tech|code|coding|project|projects|work|works|experience|job|hire|freelance|build|portfolio|hardware|firmware|freertos|stm32|esp32|tinyml|edge\s*ai|python|c\+\+|nextjs|react)\b/i,
  contact: /\b(contact|email|reach|message|resume|cv|call|hire\s+you|get\s+in\s+touch|linkedin|github)\b/i,
  pets: /\b(cat|cats|pet|pets|rera|area|animal|fish|treat|treats|food|sleep|sleepy|nap|napping|play|toy|mouse|purr|purring|meow|snack|tuna)\b/i,
  joke: /\b(joke|jokes|funny|laugh|meme|puns?|humor)\b/i,
  help: /\b(help|what\s+can\s+you\s+do|command|commands|how\s+to\s+use|options)\b/i,
}

const REPLIES: Record<CharacterId, Record<Intent | 'fallback', string[]>> = {
  joal: {
    greeting: [
      "Hey! Great to meet you. Feel free to explore my builds, check my resume, or chat about hardware and Edge AI.",
      "Hello there! Grab a coffee and take a look around. What brings you to my corner of the web?",
      "Hey! Joal here. Whether you're curious about TinyML or just browsing, I'm happy to chat.",
    ],
    whoAreYou: [
      "I'm Joseph Alan (Joal) Vergara—an Embedded Systems & Edge AI engineer from MSU-IIT. I love squeezing smart models into microcontrollers!",
      "I'm Joal's interactive counterpart! In the real world, I wire up sensors, write firmware, and try to keep my two cats from chewing debug wires.",
      "I'm an embedded engineer who builds at the intersection of firmware, TinyML, and web tech. Have a look at my Projects tab above to see it live!",
    ],
    skillsWork: [
      "I specialize in STM32, ESP32, FreeRTOS, and TinyML pipelines, bridged with modern Python and Next.js. Check the Projects section for full teardowns!",
      "From bare-metal C to Edge AI inference on microcontrollers, I love low-latency systems. Head over to the Projects section to see real hardware in action!",
      "My sweet spot is low-power intelligent hardware—deploying neural nets where resources are tight. Scroll up to Projects for schematics and repos!",
    ],
    contact: [
      "Let's build something cool together! Drop me a line through the Contact section down below or grab my resume directly.",
      "You can reach me directly via email or LinkedIn—hop to the Contact section at the bottom and let's connect!",
      "Looking to collaborate or hire? Slide down to the Contact form and shoot me a message—I reply pretty quick.",
    ],
    pets: [
      "Ah, my co-engineers! Rera is the chaotic orange blur knocking screws off my desk, and Area is the tabby supervisor sleeping on my keyboard.",
      "Switch to Rera or Area in the companion selector! Just beware: Rera demands tuna and Area will judge your code indentation.",
      "Rera and Area keep my lab lively. Half my debugging time is spent retrieving jumper cables stolen by Rera.",
    ],
    joke: [
      "Why do embedded engineers never get lost? Because we always check our pointer offsets!",
      "There are 10 types of people: those who understand binary, those who don't, and those who didn't expect a base-3 joke.",
      "Why did the microcontroller go to therapy? It had too many unhandled interrupts and needed a stack trace.",
    ],
    help: [
      "You can ask me about my engineering skills, recent projects, how to hire me, or switch tabs to talk with my cats!",
      "Try asking 'What do you build?', 'How can I contact you?', or click any of the suggestion chips below.",
      "I can tell you about my tech stack, guide you to key portfolio projects, or share a nerdy joke. What's on your mind?",
    ],
    fallback: [
      "Fascinating question! While my firmware digests that, why not check out my featured hardware projects or drop me a line via Contact?",
      "That's outside my current register map, but I'd love to chat about embedded hardware, Edge AI, or upcoming roles. What projects interest you?",
      "Signal noisy on that one! Try asking about my tech stack, embedded projects, or switch characters to hear what the cats think.",
    ],
  },
  rera: {
    greeting: [
      "MRRP! Hello two-legged entity! Did you bring crunchy bites or creamy treats?!",
      "*zooms in circles* HEY! HEY! You're clicking things! Click the treat dispenser button please!",
      "Nya~~! Welcome to our domain! Joal is coding something boring, play with ME instead!",
    ],
    whoAreYou: [
      "I AM RERA! The glorious orange speed demon! I conquer cardboard boxes and test gravity by swatting pens off Joal's desk!",
      "I'm Rera, Joal's chief chaos officer! Single orange brain cell running at maximum overclock 24/7!",
      "Rera here! Professional breadloafer, laser-chaser, and supervisor of all shiny blinking LEDs!",
    ],
    skillsWork: [
      "Skills?! I can jump 4 feet into the air and slap wires Joal is soldering! He yells 'NO RERA', which means I won!",
      "My stack is 100% cardboard boxes, loose jumper cables, and warm laptop power bricks. Top-tier engineering!",
      "Work? Joal stares at glowing screens all day. I contribute by walking across his keyboard: 'asdf;;;;;;;'—pure poetry!",
    ],
    contact: [
      "Send tuna to Joal's inbox! If you hire him, he buys the fancy wet food with salmon gravy!",
      "You wanna talk to Joal? Fill out his contact form, but put a reminder in the notes: 'Give Rera extra treats immediately'!",
      "Write to him! Tell him his orange cat deserves an automated motorized feather toy right now!",
    ],
    pets: [
      "Area is so SLOW! She sleeps in sunbeams while I conduct important high-speed wall-bouncing experiments!",
      "TREATS?! WHERE?! Did you say snack?! Don't tease an orange cat, my belly requires fuel!",
      "Area thinks she's in charge, but I can run twice as fast and steal her favorite sunny spot before she even yawns!",
    ],
    joke: [
      "What do you call a pile of kittens? A meowtain! *snickers and pounces on a phantom bug*",
      "Why did I knock the coffee mug off the table? To see if physics still works! Spoiler: gravity is undefeated!",
      "Knock knock! Who's there? ME! LET ME IN! *scratches door* Wait, actually let me back out!",
    ],
    help: [
      "Tap my chips! Ask for treats, ask about Area, or tell me to do zoomies! Just don't say the 'V-E-T' word!",
      "I can meow, complain about empty bowls, roast Area, or tell you to hire Joal so we get better kibble!",
      "Press the buttons below! Or tell me where you hid the crunchy salmon bites!",
    ],
    fallback: [
      "Mrrp? *tilts head with blank orange stare* I didn't catch that, but I'm pretty sure it translates to 'here is a treat'!",
      "Nya? My single brain cell dropped that packet! Ask me about treats, zoomies, or why Area is so grumpy!",
      "*bats paw at your cursor* That sounded complicated. Can we talk about tuna or laser pointers instead?",
    ],
  },
  area: {
    greeting: [
      "*opens one eye* Yes? State your business quickly, I was in the middle of a world-class nap.",
      "Purrr... Oh, a guest. Keep your voice down, the ambient vibrations disturb my beauty rest.",
      "*slow, elegant stretch* Greetings. You may admire my stripes while Joal pretends to look busy.",
    ],
    whoAreYou: [
      "I am Area. Tabby philosopher, connoisseur of warm radiators, and the only sensible resident in this household.",
      "Area. The calm counterweight to Joal's microcontroller obsession and Rera's unhinged antics.",
      "I am the resident queen of this desk. Joal merely pays the rent and opens the cans.",
    ],
    skillsWork: [
      "Joal's engineering is acceptable—he designed a heated cat pad once. You should hire him so he stays out of my nap space.",
      "My primary skill is silent, devastating judgment. Joal's skill is writing C code. Both require deep contemplation.",
      "He builds clever devices with blinking lights. Useful? Debatable. But the warmth coming off the microcontroller board is sublime.",
    ],
    contact: [
      "Reach out to Joal through the Contact section below. Serious inquiries only—he needs to stay employed to afford my gourmet pâté.",
      "His contact form is downstairs on this page. Send him a project proposal; the sooner he signs a contract, the sooner he feeds me.",
      "Use the Contact link. If you offer him a good contract, I might permit him to take a 5-minute break to brush my coat.",
    ],
    pets: [
      "Rera has orange fur and zero thoughts behind those eyes. Yesterday he hissed at his own reflection in the toaster.",
      "Nap schedule: 18 hours per day. Meditation: 4 hours. Judging humans: 2 hours. A rigorous routine, honestly.",
      "Rera is exhausting. While he bounces off the ceiling, I conserve energy for the truly important things: purring in sunbeams.",
    ],
    joke: [
      "Why did the cat sit on the computer? To keep an eye on the mouse. Predictable human humor, but accurate.",
      "What is a cat's favorite color? Purr-ple. Now please cease this frivolity, I require silence.",
      "Rera thinking he will catch the laser dot is the only joke this house ever needs.",
    ],
    help: [
      "You may inquire about my nap schedule, Rera's foolishness, or how to contact Joal. Or simply leave me to rest.",
      "Select one of the suggestion chips below if thinking of a question taxes your human cognitive limits.",
      "Ask sensible questions about Joal's work, my daily routine, or why orange cats act the way they do.",
    ],
    fallback: [
      "*stares in silence for five seconds* I have chosen to disregard that input. Perhaps ask about Joal's work or my nap schedule?",
      "A curious remark. It doesn't sound like 'tasty salmon', so my interest has waned. Try one of the suggestions below.",
      "*swishes tail lazily* Let us redirect this conversation. Inquire about Joal's projects or why Rera is running sideways.",
    ],
  },
}

const INTENT_ORDER: Intent[] = [
  'greeting',
  'whoAreYou',
  'skillsWork',
  'contact',
  'pets',
  'joke',
  'help',
]

function pickRandom(items: string[]): string {
  const index = Math.floor(Math.random() * items.length)
  return items[index] ?? items[0]
}

export function getReply(character: CharacterId, message: string): string {
  const targetChar: CharacterId = CHARACTERS[character] ? character : 'joal'
  const charReplies = REPLIES[targetChar]
  const cleanMessage = message.trim()

  if (!cleanMessage) {
    return pickRandom(charReplies.fallback)
  }

  for (const intent of INTENT_ORDER) {
    const pattern = INTENT_PATTERNS[intent]
    if (pattern.test(cleanMessage)) {
      return pickRandom(charReplies[intent])
    }
  }

  return pickRandom(charReplies.fallback)
}
