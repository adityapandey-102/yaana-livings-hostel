import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')
    const limitParam = searchParams.get('limit')
    const all = searchParams.get('all') === '1'

    const requiresAuth = all || Boolean(id)

    if (requiresAuth) {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    if (id) {
      const blog = await prisma.blog.findUnique({
        where: { id },
      })

      return NextResponse.json({ blog })
    }

    if (slug) {
      const blog = await prisma.blog.findFirst({
        where: {
          slug,
          ...(all ? {} : { published: true }),
        },
      })

      return NextResponse.json({ blog })
    }

    const limit = limitParam ? Math.max(1, Number(limitParam)) : undefined

    const blogs = await prisma.blog.findMany({
      where: all ? {} : { published: true },
      orderBy: all ? { createdAt: 'desc' } : { publishedAt: 'desc' },
      ...(limit ? { take: limit } : {}),
    })

    return NextResponse.json({ blogs })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        featuredImage: body.featured_image || body.featuredImage,
        metaTitle: body.meta_title || body.metaTitle,
        metaDescription: body.meta_description || body.metaDescription,
        published: body.published,
        publishedAt: body.published ? new Date() : null,
      },
    })

    return NextResponse.json({ blog }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updates } = body

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: updates.title,
        slug: updates.slug,
        excerpt: updates.excerpt,
        content: updates.content,
        featuredImage: updates.featured_image || updates.featuredImage,
        metaTitle: updates.meta_title || updates.metaTitle,
        metaDescription: updates.meta_description || updates.metaDescription,
        published: updates.published,
        publishedAt: updates.published ? (updates.published_at ? new Date(updates.published_at) : new Date()) : null,
      },
    })

    return NextResponse.json({ blog })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
