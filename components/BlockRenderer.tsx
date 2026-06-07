import { getMetafieldValue } from '@/lib/cosmic'
import HeroBlock from '@/components/blocks/HeroBlock'
import TextBlock from '@/components/blocks/TextBlock'
import ImageBlock from '@/components/blocks/ImageBlock'
import CtaBlock from '@/components/blocks/CtaBlock'
import type { ContentBlock } from '@/types'

export default function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        if (!block || !block.id) return null
        const blockType = getMetafieldValue(block.metadata?.block_type)

        switch (blockType) {
          case 'Hero':
            return <HeroBlock key={block.id} block={block} />
          case 'Text':
            return <TextBlock key={block.id} block={block} />
          case 'Image':
            return <ImageBlock key={block.id} block={block} />
          case 'CTA':
            return <CtaBlock key={block.id} block={block} />
          default:
            return <TextBlock key={block.id} block={block} />
        }
      })}
    </>
  )
}