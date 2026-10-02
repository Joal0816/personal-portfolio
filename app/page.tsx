import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { CyberHudCursor } from '@/components/cyber-hud-cursor'
import { InstallPwa } from '@/components/install-pwa'

export default function Page() {
  return (
    <>
      <CyberHudCursor />
      <InstallPwa />
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
