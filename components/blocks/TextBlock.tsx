import { getMetafieldValue } from '@/lib/cosmic'
import type { ContentBlock } from '@/types'

export default function TextBlock({ block }: { block: ContentBlock }) {
  const heading = getMetafieldValue(block.metadata?.heading)
  const subheading = getMetafieldValue(block.metadata?.subheading)
  const body = getMetafieldValue(block.metadata?.body)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {heading ? (
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {heading}
        </h2>
      ) : null}
      {subheading ? (
        <p className="mt-2 text-lg text-gray-500">{subheading}</p>
      ) : null}
      {body ? (
        <div
          className="prose prose-gray mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ) : null}
    </section>
  )
}