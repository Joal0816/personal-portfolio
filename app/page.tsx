import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { InstallPwa } from '@/components/install-pwa'

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <InstallPwa />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="overflow-x-hidden">
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
