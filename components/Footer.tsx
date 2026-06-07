import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { NavigationMenu, SiteSettings, MenuItem, SocialLinks } from '@/types'

interface FooterProps {
  settings: SiteSettings | null
  navigation: NavigationMenu | null
}

export default function Footer({ settings, navigation }: FooterProps) {
  const siteTitle = getMetafieldValue(settings?.metadata?.site_title) || 'My CMS'
  const footerText =
    getMetafieldValue(settings?.metadata?.footer_text) ||
    `© ${new Date().getFullYear()} ${siteTitle}. All rights reserved.`
  const items: MenuItem[] = navigation?.metadata?.menu_items ?? []
  const social: SocialLinks = settings?.metadata?.social_links ?? {}

  const socialEntries = Object.entries(social).filter(
    ([, value]) => typeof value === 'string' && value.length > 0
  )

  return (
    <footer className="mt-20 border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{siteTitle}</h3>
            {settings?.metadata?.tagline ? (
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                {getMetafieldValue(settings.metadata.tagline)}
              </p>
            ) : null}
          </div>

          {items.length > 0 ? (
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {items.map((item, idx) => {
                const label = getMetafieldValue(item?.label)
                const url = getMetafieldValue(item?.url) || '/'
                if (!label) return null
                return (
                  <Link
                    key={`${label}-${idx}`}
                    href={url}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          ) : null}
        </div>

        {socialEntries.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {socialEntries.map(([name, url]) => (
              <a
                key={name}
                href={String(url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm capitalize text-gray-500 transition-colors hover:text-gray-900"
              >
                {name}
              </a>
            ))}
          </div>
        ) : null}

        <p className="mt-8 text-sm text-gray-400">{footerText}</p>
      </div>
    </footer>
  )
}