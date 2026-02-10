import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'
import { getBaseUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blogs | Yaana Livings',
  description: 'Read the latest articles and updates from Yaana Livings',
  openGraph: {
    title: 'Blogs | Yaana Livings',
    description: 'Read the latest articles and updates from Yaana Livings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs | Yaana Livings',
    description: 'Read the latest articles and updates from Yaana Livings',
  },
}

export const revalidate = 3600

function normalizeImageSrc(src?: string | null) {
  if (!src) return null
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src
  }
  return `/${src}`
}

function getBlogImageSrc(blog: { featuredImage?: string | null; featuredImageUrl?: string | null }) {
  return blog.featuredImageUrl || normalizeImageSrc(blog.featuredImage)
}

async function getBlogs() {
  const baseUrl = getBaseUrl()
  const res = await fetch(`${baseUrl}/api/blogs?limit=12`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) return []

  const data = await res.json()
  return Array.isArray(data.blogs) ? data.blogs : []
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <>
                 {/* Hero: dark, matching yaana contact */}
                      <section className="relative py-16 lg:py-24 bg-yaana-nearblack overflow-hidden">
                        <div className="absolute inset-0">
                          <Image
                            src="/assets/hero-bg.webp"
                            alt=""
                            fill
                            className="object-cover opacity-30"
                            sizes="100vw"
                          />
                          <div className="absolute inset-0 bg-yaana-nearblack/80" />
                        </div>
                        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white uppercase tracking-tight">
                            Insights from Yaana Livings
                          </h1>
                          <p className="text-white/90 mt-4 text-sm sm:text-base">
                           Explore curated updates, student living tips, and the latest from Yaana.
                          </p>
                        </div>
                      </section>
          
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>
      
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <article key={blog.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <div className="relative aspect-[4/3] bg-yaana-cream-dark flex items-center justify-center text-yaana-charcoal/70 text-xs font-semibold uppercase overflow-hidden">
                {getBlogImageSrc(blog) ? (
                  <Image
                    src={getBlogImageSrc(blog)!}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blogs/${blog.slug}`} className="hover:text-blue-600">
                    {blog.title}
                  </Link>
                </h2>
                {blog.excerpt && (
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                )}
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500">
                    {blog.publishedAt && new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-white bg-black px-4 py-2  hover:shadow-lg text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
    </>
  )
}
