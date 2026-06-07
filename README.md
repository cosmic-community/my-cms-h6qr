# My CMS

![App Preview](https://imgix.cosmicjs.com/8e2a5b70-6212-11f1-afc4-733c79006ae7-autopilot-photo-1538481199705-c710c4e965fc-1780796725920.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, fully-responsive headless CMS-powered website built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). It dynamically renders pages composed of reusable content blocks, navigation menus, and site-wide settings — all managed in your Cosmic bucket.

## Features

- 🧱 **Dynamic Content Blocks** — Hero, text, image, and CTA blocks rendered from your content model
- 📄 **Dynamic Pages** — Each page is assembled from ordered content blocks with full SEO metadata
- 🧭 **Navigation Menus** — Header and footer menus driven entirely by Cosmic
- ⚙️ **Site Settings** — Global site title, tagline, logo, theme color, footer text, and social links
- 🎨 **Modern Responsive UI** — Tailwind CSS with a clean, accessible design
- ⚡ **Server Components** — Fast, secure data fetching directly from Cosmic
- 🔍 **SEO Optimized** — Per-page dynamic metadata

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a24ccf2ce890493c7b83c01&clone_repository=6a24cdc9ce890493c7b83c2e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a headless CMS API backend with pages, reusable content blocks, navigation menus, and site-wide settings.
>
> User instructions: build litsense system full litsense system generate litsense full go build php gamecms module site gamecms.ru"

### Code Generation Prompt

> Build a Next.js application for a content management system called "My CMS". The content is managed in Cosmic CMS with the following object types: content-blocks, pages, navigation-menus, site-settings. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with the bucket containing your content

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables in a `.env.local` file:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all pages with nested content blocks
const { objects: pages } = await cosmic.objects
  .find({ type: 'pages' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single page by url_path
const { object: page } = await cosmic.objects
  .findOne({ type: 'pages', 'metadata.url_path': '/about' })
  .depth(1)

// Fetch site settings
const { object: settings } = await cosmic.objects
  .findOne({ type: 'site-settings' })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with the following object types in your Cosmic bucket:

- **content-blocks** — Reusable blocks (block_type, heading, subheading, body, image, button_label, button_url)
- **pages** — Pages composed of ordered content_blocks with SEO fields
- **navigation-menus** — Header/footer navigation menus
- **site-settings** — Global site configuration

Read more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add the environment variables in Site Settings
4. Deploy

<!-- README_END -->