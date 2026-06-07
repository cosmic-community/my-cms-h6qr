import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { NavigationMenu, SiteSettings, MenuItem } from '@/types'

interface HeaderProps {
  settings: SiteSettings | null
  navigation: NavigationMenu | null
}

export default function Header({ settings, navigation }: HeaderProps) {
  const siteTitle = getMetafieldValue(settings?.metadata?.site_title) || 'My CMS'
  const logo = settings?.metadata?.logo
  const items: MenuItem[] = navigation?.metadata?.menu_items ?? []

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          {logo?.imgix_url ? (
            <img
              src={`${logo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={siteTitle}
              width={40}
              height={40}
              className="h-10 w-10 rounded-md object-cover"
            />
          ) : null}
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            {siteTitle}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item, idx) => {
            const label = getMetafieldValue(item?.label)
            const url = getMetafieldValue(item?.url) || '/'
            if (!label) return null
            return (
              <Link
                key={`${label}-${idx}`}
                href={url}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}