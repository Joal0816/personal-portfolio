import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { CyberHudCursor } from '@/components/cyber-hud-cursor'

export default function Page() {
  return (
    <>
      <CyberHudCursor />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
