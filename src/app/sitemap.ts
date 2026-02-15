import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()

  let blogs: any[] = []
  try {
    const res = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 3600 },
    })
    const data = res.ok ? await res.json() : { blogs: [] }
    blogs = Array.isArray(data.blogs) ? data.blogs : []
  } catch {
    blogs = []
  }

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt || blog.publishedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...blogUrls,
  ]
}
