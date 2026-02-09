'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BlogForm from '../../BlogForm'

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  metaTitle: string | null
  metaDescription: string | null
  published: boolean
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
        return
      }

      try {
        const res = await fetch(`/api/blogs?id=${encodeURIComponent(params.id)}`)
        if (res.status === 401) {
          router.push('/admin/login')
          return
        }
        const data = await res.json()
        if (!data.blog) {
          router.push('/admin/blogs')
          return
        }
        setBlog(data.blog)
      } catch (error) {
        console.error('Failed to fetch blog:', error)
        router.push('/admin/blogs')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!blog) {
    return null
  }

  return <BlogForm blog={blog} />
}
