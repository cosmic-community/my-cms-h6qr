import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { ContentBlock } from '@/types'

export default function HeroBlock({ block }: { block: ContentBlock }) {
  const heading = getMetafieldValue(block.metadata?.heading)
  const subheading = getMetafieldValue(block.metadata?.subheading)
  const buttonLabel = getMetafieldValue(block.metadata?.button_label)
  const buttonUrl = getMetafieldValue(block.metadata?.button_url)
  const image = block.metadata?.image

  return (
    <section className="relative overflow-hidden bg-gray-900 text-white">
      {image?.imgix_url ? (
        <img
          src={`${image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
          alt={heading || 'Hero'}
          width={1200}
          height={600}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      ) : null}
      <div className="relative mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-36">
        {heading ? (
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
        ) : null}
        {subheading ? (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
            {subheading}
          </p>
        ) : null}
        {buttonLabel && buttonUrl ? (
          <div className="mt-10">
            <Link
              href={buttonUrl}
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
            >
              {buttonLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}