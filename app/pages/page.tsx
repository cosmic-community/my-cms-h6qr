import Link from 'next/link'
import { getPages, getMetafieldValue } from '@/lib/cosmic'
import type { Page } from '@/types'

export const metadata = {
  title: 'All Pages',
}

export default async function PagesIndex() {
  const pages = await getPages()
  const publishedPages = pages.filter((p) => p.metadata?.published !== false)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pages</h1>
      <p className="mt-2 text-gray-500">Browse all published pages.</p>

      {publishedPages.length === 0 ? (
        <p className="mt-12 text-gray-500">No pages found.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedPages.map((page: Page) => {
            const title =
              getMetafieldValue(page.metadata?.page_title) || page.title
            const desc = getMetafieldValue(page.metadata?.seo_description)
            return (
              <Link
                key={page.id}
                href={`/pages/${page.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                  {title}
                </h2>
                {desc ? (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                    {desc}
                  </p>
                ) : null}
                <span className="mt-4 inline-block text-sm font-medium text-gray-900">
                  Read more →
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}