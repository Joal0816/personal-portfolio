import { Navbar } from '@/components/navbar'
import { InstallPwa } from '@/components/install-pwa'
import { SiteViewWrapper } from '@/components/site-view-wrapper'

export default function Page() {
  return (
    <>
      <InstallPwa />
      <Navbar />
      <SiteViewWrapper />
    </>
  )
}
