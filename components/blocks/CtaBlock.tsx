import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { ContentBlock } from '@/types'

export default function CtaBlock({ block }: { block: ContentBlock }) {
  const heading = getMetafieldValue(block.metadata?.heading)
  const subheading = getMetafieldValue(block.metadata?.subheading)
  const buttonLabel = getMetafieldValue(block.metadata?.button_label)
  const buttonUrl = getMetafieldValue(block.metadata?.button_url)

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gray-900 px-8 py-14 text-center text-white">
        {heading ? (
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
        ) : null}
        {subheading ? (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {subheading}
          </p>
        ) : null}
        {buttonLabel && buttonUrl ? (
          <div className="mt-8">
            <Link
              href={buttonUrl}
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              {buttonLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}