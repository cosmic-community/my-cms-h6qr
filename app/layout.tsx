import type { Metadata } from 'next'
import './globals.css'
import {
  getSiteSettings,
  getNavigationByLocation,
} from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = getMetafieldValue(settings?.metadata?.site_title) || 'My CMS'
  const description =
    getMetafieldValue(settings?.metadata?.tagline) ||
    'A modern headless CMS website built with Cosmic and Next.js'
  return {
    title,
    description,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  const settings = await getSiteSettings()
  const headerNav = await getNavigationByLocation('header')
  const footerNav = await getNavigationByLocation('footer')

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧱</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a24ccf2ce890493c7b83bff"></script>
      </head>
      <body className="font-sans">
        <Header settings={settings} navigation={headerNav} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} navigation={footerNav} />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}