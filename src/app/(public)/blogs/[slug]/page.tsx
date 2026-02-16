import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { cache } from 'react'
import { getBlogBySlug } from '@/lib/blogs'
import { prisma } from '@/lib/prisma'
import { LavenderPairOneCorners } from '@/components/decor/LavenderPairOneCorners'

const SITE_URL = 'https://yaanalivings.com'

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
  return getBlogBySlug(slug)
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return { title: 'Blog Not Found' }
  }

  const title = blog.metaTitle || blog.title
  const description = blog.metaDescription || blog.excerpt || ''
  const url = `${SITE_URL}/blogs/${blog.slug}`
  const publishedIso = blog.publishedAt
    ? new Date(blog.publishedAt).toISOString()
    : undefined
  const imageSrc = getBlogImageSrc(blog)

  return {
    title,
    description,
    alternates: { canonical: url },
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

export async function generateStaticParams() {
  // Partial SSG: prebuild only latest slugs to reduce build time and keep hot pages fast.
  // Remaining published slugs are generated on demand and later refreshed by admin-triggered revalidation.
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    select: { slug: true },
  })

  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function BlogPage({ params }: Props) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription,
    image: blog.featuredImage,
    datePublished: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined,
    dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: 'Yaana Livings',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yaana Livings',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${blog.slug}`,
    },
  }
  const imageSrc = getBlogImageSrc(blog)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 bg-yaana-nearblack overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt="Insights from Yaana Livings"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-yaana-nearblack/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white uppercase tracking-tight">
            Insights from Yaana Livings
          </h1>
          <p className="text-white/90 mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Explore curated updates, student living tips, and the latest from Yaana.
          </p>
        </div>
      </section>

      {/* ================= BLOG CONTENT ================= */}
      <section className="relative py-16 md:py-20">
        {/* Decorative corners FULL WIDTH */}
        <LavenderPairOneCorners />

        {/* Centered content */}
        <article className="relative z-10 max-w-4xl mx-auto px-6">
          <header className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blog.title}
            </h2>

            {blog.publishedAt && (
              <time className="text-yaana-charcoal-light text-sm md:text-base">
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-10 rounded-xl overflow-hidden bg-lavender-100 flex items-center justify-center text-yaana-charcoal/70 text-sm font-semibold uppercase">
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
            <p className="text-lg md:text-xl text-yaana-charcoal mb-10 italic leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:text-yaana-charcoal prose-p:text-yaana-charcoal/90"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </section>
    </>
  )
}
