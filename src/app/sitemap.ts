import { MetadataRoute } from 'next'
import { getAllPublishedBlogs } from '@/lib/blogs'

const SITE_URL = 'https://yaanalivings.com'
export const revalidate = 3600
// ISR for sitemap: refresh periodically, plus on-demand revalidation after blog mutations.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllPublishedBlogs()

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    // Prefer content timestamps for better SEO freshness signaling.
    lastModified: blog.updatedAt ?? blog.publishedAt ?? new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...blogUrls,
  ]
}
