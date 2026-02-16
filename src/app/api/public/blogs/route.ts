import { NextRequest, NextResponse } from 'next/server'
import { getBlogBySlug, getBlogList, getPaginatedBlogs } from '@/lib/blogs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(Math.max(1, parseInt(searchParams.get('limit') || '10')), 50)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const q = searchParams.get('q') || ''
    const slug = searchParams.get('slug')
    const withMeta = searchParams.get('withMeta') === '1'

    if (slug) {
      const blog = await getBlogBySlug(slug)
      return NextResponse.json({ blog }, { headers: PUBLIC_CACHE_HEADERS })
    }

    if (withMeta) {
      const data = await getPaginatedBlogs(page, limit, q)
      return NextResponse.json(data, { headers: PUBLIC_CACHE_HEADERS })
    }

    const blogs = await getBlogList(limit, q)
    return NextResponse.json({ blogs }, { headers: PUBLIC_CACHE_HEADERS })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
