import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { cache } from 'react'
import { getBlogBySlug } from '@/lib/blogs'
import { prisma } from '@/lib/prisma'
import { LavenderWallpaper } from '@/components/decor/LavenderWallpaper'
import Link from 'next/link'

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
      <section className="relative overflow-hidden bg-yaana-nearblack-- bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70 py-20 md:py-28">
        <div className="absolute inset-0">
          <LavenderWallpaper />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] ">
            Yaana Journal
          </span>
          <h1 className="mt-5 text-3xl font-semibold uppercase tracking-tight text-white-- sm:text-4xl md:text-5xl">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/85-- sm:text-base md:text-lg">
              {blog.excerpt}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.28em] text-white/60--">
            {blog.publishedAt && (
              <span>
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span>Yaana Livings</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white-- transition hover:bg-white/10"
            >
              Back to Blogs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-yaana-nearblack transition hover:bg-white/90"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BLOG CONTENT ================= */}
      <section className="relative py-16 md:py-20">
        <LavenderWallpaper/>

        <article className="relative z-10 mx-auto max-w-4xl px-6">
          {imageSrc && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-lavender-200 bg-lavender-100 shadow-lg">
              <Image
                src={imageSrc}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          <div className="rounded-2xl border border-lavender-200 bg-white/90 p-6 shadow-sm backdrop-blur md:p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-yaana-charcoal prose-p:text-yaana-charcoal/90 prose-a:text-yaana-dark-lavender"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </section>
    </>
  )
}
