import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateBlogJsonLd } from '@/lib/seo'
import Image from 'next/image'
import { getBaseUrl } from '@/lib/site'
import { cache } from 'react'

type Props = {
  params: { slug: string }
}

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

const getBlog = cache(async (slug: string) => {
  const baseUrl = getBaseUrl()
  const res = await fetch(`${baseUrl}/api/blogs?slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.blog || null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  const title = blog.metaTitle || blog.title
  const description = blog.metaDescription || blog.excerpt || ''
  const url = `${getBaseUrl()}/blogs/${blog.slug}`
  const publishedIso = blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined
  const imageSrc = getBlogImageSrc(blog)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: publishedIso,
      authors: ['Yaana Livings'],
      images: imageSrc ? [imageSrc] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageSrc ? [imageSrc] : [],
    },
  }
}

export const revalidate = 3600

export default async function BlogPage({ params }: Props) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  const jsonLd = generateBlogJsonLd(blog)
  const imageSrc = getBlogImageSrc(blog)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
      
      <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          {blog.publishedAt && (
            <time className="text-gray-600">
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>

        <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden bg-yaana-cream-dark flex items-center justify-center text-yaana-charcoal/70 text-sm font-semibold uppercase">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <span>No Image</span>
          )}
        </div>

        {blog.excerpt && (
          <p className="text-xl text-gray-700 mb-8 italic">{blog.excerpt}</p>
        )}

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </>
  )
}
