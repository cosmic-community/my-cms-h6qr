// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image/file metafield shape
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Block types available in the content model
export type BlockType = 'Hero' | 'Text' | 'Image' | 'CTA';

// Content Block
export interface ContentBlock extends CosmicObject {
  type: 'content-blocks';
  metadata: {
    block_type?: BlockType | string;
    heading?: string;
    subheading?: string;
    body?: string;
    image?: CosmicImage;
    button_label?: string;
    button_url?: string;
  };
}

// Page
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_title?: string;
    url_path?: string;
    seo_title?: string;
    seo_description?: string;
    content_blocks?: ContentBlock[];
    published?: boolean;
  };
}

// Navigation menu item shape (repeater / json)
export interface MenuItem {
  label?: string;
  url?: string;
  [key: string]: unknown;
}

// Navigation Menu
export interface NavigationMenu extends CosmicObject {
  type: 'navigation-menus';
  metadata: {
    menu_name?: string;
    location?: string;
    menu_items?: MenuItem[];
  };
}

// Social links shape
export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  [key: string]: unknown;
}

// Site Settings
export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    site_title?: string;
    tagline?: string;
    logo?: CosmicImage;
    footer_text?: string;
    theme_color?: string;
    social_links?: SocialLinks;
  };
}

// Cosmic API response wrapper
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}

export function isContentBlock(obj: CosmicObject): obj is ContentBlock {
  return obj.type === 'content-blocks';
}