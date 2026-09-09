import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Geist_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Joseph Vergara — Embedded Systems & Full-Stack Developer',
  description:
    'Portfolio of Joseph Vergara, an embedded systems and full-stack developer specializing in microcontroller firmware, Edge AI, and IoT solutions. Based in Iligan City, Philippines.',
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
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
