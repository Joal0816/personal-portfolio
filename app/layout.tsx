import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Bricolage_Grotesque,
  Schibsted_Grotesk,
  Caveat,
  Spline_Sans_Mono,
} from 'next/font/google'
import { SwRegister } from './sw-register'
import { AiCompanion } from '@/components/ai-companion'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

const splineMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-spline-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  metadataBase: new URL('https://joalvergs.tech'),
  title: 'Joseph Vergara — Embedded Systems & Edge AI Engineer',
  description:
    'Portfolio of Joseph Vergara, embedded systems and edge AI engineer specializing in microcontroller firmware (C/C++, FreeRTOS), TinyML, and full-stack sensor telemetry. MSU-IIT.',
  openGraph: {
    title: 'Joseph Vergara — Embedded Systems & Edge AI Engineer',
    description: 'Hardware firmware, real-time operating systems, and edge computer vision without the cloud.',
    url: 'https://joalvergs.tech',
    siteName: 'Joseph Vergara Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Joseph Vergara — Embedded Systems & Edge AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joseph Vergara — Embedded Systems & Edge AI Engineer',
    description: 'Hardware firmware, real-time operating systems, and edge computer vision without the cloud.',
    images: ['/profile.jpg'],
  },
  keywords: [
    'embedded systems',
    'full-stack developer',
    'edge AI',
    'IoT',
    'ESP32',
    'microcontroller',
    'React',
    'Next.js',
    'Joseph Vergara',
  ],
  authors: [{ name: 'Joseph Vergara' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joalvergs.tech',
    siteName: 'Joseph Vergara Portfolio',
    title: 'Joseph Vergara — Embedded Systems & Full-Stack Developer',
    description:
      'Portfolio of Joseph Vergara, an embedded systems and full-stack developer specializing in microcontroller firmware, Edge AI, and IoT solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joseph Vergara — Embedded Systems & Full-Stack Developer',
    description:
      'Portfolio of Joseph Vergara, an embedded systems and full-stack developer specializing in microcontroller firmware, Edge AI, and IoT solutions.',
  },
  icons: {
    icon: [
      { url: '/icon.svg?v=3', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png?v=3', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-light-32x32.png?v=3', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/apple-icon.png?v=3',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eceee5' },
    { media: '(prefers-color-scheme: dark)', color: '#141a21' },
  ],
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${bricolage.variable} ${schibsted.variable} ${caveat.variable} ${splineMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        <AiCompanion />
        <SwRegister />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          defer
          src="https://pulse.joalvergs.tech/p.js"
          data-site="root"
        />

      </body>
    </html>
  )
}
