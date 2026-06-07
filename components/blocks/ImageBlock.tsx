import { getMetafieldValue } from '@/lib/cosmic'
import type { ContentBlock } from '@/types'

export default function ImageBlock({ block }: { block: ContentBlock }) {
  const heading = getMetafieldValue(block.metadata?.heading)
  const image = block.metadata?.image

  if (!image?.imgix_url) return null

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {heading ? (
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
          {heading}
        </h2>
      ) : null}
      <figure className="overflow-hidden rounded-2xl">
        <img
          src={`${image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
          alt={heading || 'Image'}
          width={1000}
          height={600}
          className="h-auto w-full object-cover"
        />
      </figure>
    </section>
  )
}