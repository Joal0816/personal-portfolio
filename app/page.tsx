import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { ImpeccableCompare } from '@/components/impeccable-compare'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { InstallPwa } from '@/components/install-pwa'

export default function Page() {
  return (
    <>
      <InstallPwa />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <ImpeccableCompare />
        <About />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
