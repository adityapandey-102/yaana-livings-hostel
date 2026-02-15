import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'
import { getBlogs } from '@/lib/blogs'
import { LavenderPairTwoCorners } from '@/components/decor/LavenderPairTwoCorners'

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

export default async function BlogsPage() {
  const { blogs } = await getBlogs({ limit: 12 })

  return (
    <>
      {/* ================= HERO ================= */}
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

      {/* ================= BLOG LIST ================= */}
      <section className="relative py-16 overflow-hidden">
        {/* Decorative corners FULL WIDTH */}
        <LavenderPairTwoCorners />

        {/* Centered content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            {/* <h2 className="text-3xl md:text-4xl font-semibold text-yaana-charcoal">
              Blogs
            </h2> */}
            {/* <div className="w-16 h-[2px] bg-yaana-charcoal mx-auto mt-4" /> */}
          </div>

          {blogs.length === 0 ? (
            <p className="text-center text-yaana-charcoal-light">
              No blogs published yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-card shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-lavender-100 overflow-hidden">
                    {getBlogImageSrc(blog) ? (
                      <Image
                        src={getBlogImageSrc(blog)!}
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs font-semibold uppercase text-yaana-charcoal/60">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 leading-snug">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="hover:text-lavender-700 transition"
                      >
                        {blog.title}
                      </Link>
                    </h3>

                    {blog.excerpt && (
                      <p className="text-sm text-yaana-charcoal-light mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <time className="text-xs text-yaana-charcoal-light">
                        {blog.publishedAt &&
                          new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                      </time>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-white bg-black px-4 py-2 text-xs font-medium rounded-btn hover:shadow-md transition"
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
      </section>
    </>
  )
}
