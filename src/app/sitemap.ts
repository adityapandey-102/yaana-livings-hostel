import { MetadataRoute } from 'next'
import { getAllPublishedBlogs } from '@/lib/blogs'
import { RENTAL_PROPERTIES } from '@/data/properties'

const SITE_URL = 'https://yaanalivings.com'
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllPublishedBlogs()
  const propertyRoutes = RENTAL_PROPERTIES.map(
    (property) => `/property-details/${property.slug}`
  )
  const staticRoutes = [
    '/',
    '/about',
    '/rental',
    '/blogs',
    '/contact',
    '/gallery',
    '/life-at-yaana',
    '/privacy',
    '/terms',
    '/refund',
    ...propertyRoutes,
  ]

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    // Prefer content timestamps for better SEO freshness signaling.
    lastModified: blog.updatedAt ?? blog.publishedAt ?? new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/blogs' ? 0.8 : 0.7,
  }))

  return [...staticUrls, ...blogUrls]
}
