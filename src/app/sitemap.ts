import { MetadataRoute } from 'next'
import { getAllPublishedBlogs } from '@/lib/blogs'

const SITE_URL = 'https://yaanalivings.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllPublishedBlogs()
  const staticRoutes = [
    '/',
    '/about',
    '/rental',
    '/blogs',
    '/property-details/yaana7',
    '/property-details/yaana22',
    '/property-details/yaana',
    '/property-details/yaana2',
    '/contact',
    '/gallery',
    '/life-at-yaana',
    '/privacy',
    '/terms',
    '/refund',
  ] as const

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
