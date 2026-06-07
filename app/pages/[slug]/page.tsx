// app/pages/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageBySlug, getMetafieldValue } from '@/lib/cosmic'
import BlockRenderer from '@/components/BlockRenderer'
import type { ContentBlock } from '@/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const title =
    getMetafieldValue(page.metadata?.seo_title) ||
    getMetafieldValue(page.metadata?.page_title) ||
    page.title
  const description = getMetafieldValue(page.metadata?.seo_description)

  return {
    title,
    description: description || undefined,
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  if (page.metadata?.published === false) {
    notFound()
  }

  const title =
    getMetafieldValue(page.metadata?.page_title) || page.title
  const blocks: ContentBlock[] = page.metadata?.content_blocks ?? []

  return (
    <article>
      {blocks.length === 0 ? (
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="mt-4 text-gray-500">This page has no content yet.</p>
        </div>
      ) : (
        <BlockRenderer blocks={blocks} />
      )}
    </article>
  )
}