import { Blog } from '@prisma/client'
import { getBaseUrl } from '@/lib/site'

function toIso(value?: Date | string | null) {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString()
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

export function generateBlogJsonLd(
  blog: Blog | (Omit<Blog, 'publishedAt' | 'updatedAt'> & { publishedAt?: string | null; updatedAt: string | Date })
) {
  const baseUrl = getBaseUrl()
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription,
    image: blog.featuredImage,
    datePublished: toIso(blog.publishedAt),
    dateModified: toIso(blog.updatedAt),
    author: {
      '@type': 'Organization',
      name: 'Yaana Livings',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yaana Livings',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${blog.slug}`,
    },
  }
}
