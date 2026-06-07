import Link from 'next/link'
import { getPages, getMetafieldValue } from '@/lib/cosmic'
import BlockRenderer from '@/components/BlockRenderer'
import type { Page, ContentBlock } from '@/types'

export default async function HomePage() {
  const pages = await getPages()

  const publishedPages = pages.filter(
    (p) => p.metadata?.published !== false
  )

  // Try to find a page with url_path '/' or 'home'
  const homePage =
    publishedPages.find((p) => {
      const path = getMetafieldValue(p.metadata?.url_path)
      return path === '/' || path === '/home' || p.slug === 'home'
    }) ?? publishedPages[0]

  if (!homePage) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to My CMS</h1>
        <p className="mt-4 text-gray-500">
          No pages have been published yet. Add a page in your Cosmic bucket to
          get started.
        </p>
      </div>
    )
  }

  const blocks: ContentBlock[] = homePage.metadata?.content_blocks ?? []
  const otherPages = publishedPages.filter((p) => p.id !== homePage.id)

  return (
    <div>
      <BlockRenderer blocks={blocks} />

      {otherPages.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Explore Pages
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherPages.map((page: Page) => {
              const title =
                getMetafieldValue(page.metadata?.page_title) || page.title
              const desc = getMetafieldValue(page.metadata?.seo_description)
              return (
                <Link
                  key={page.id}
                  href={`/pages/${page.slug}`}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                    {title}
                  </h3>
                  {desc ? (
                    <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                      {desc}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-block text-sm font-medium text-gray-900">
                    View page →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}