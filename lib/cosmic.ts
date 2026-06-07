import { createBucketClient } from '@cosmicjs/sdk'
import type { Page, NavigationMenu, SiteSettings, ContentBlock } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch all pages
export async function getPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Page[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pages')
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch page')
  }
}

// Fetch a navigation menu by location
export async function getNavigationByLocation(
  location: string
): Promise<NavigationMenu | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'navigation-menus' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const menus = response.objects as NavigationMenu[]
    const match = menus.find(
      (m) =>
        getMetafieldValue(m.metadata?.location).toLowerCase() ===
        location.toLowerCase()
    )
    return match ?? menus[0] ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch navigation')
  }
}

// Fetch all navigation menus
export async function getNavigationMenus(): Promise<NavigationMenu[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'navigation-menus' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as NavigationMenu[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch navigation menus')
  }
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'site-settings' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as SiteSettings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch site settings')
  }
}

// Fetch all content blocks
export async function getContentBlocks(): Promise<ContentBlock[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'content-blocks' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as ContentBlock[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch content blocks')
  }
}