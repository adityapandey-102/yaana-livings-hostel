"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Blog = {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/blogs?all=1')
        if (res.status === 401) {
          router.push('/admin/login')
          return
        }
        const data = await res.json()
        setBlogs(Array.isArray(data.blogs) ? data.blogs : [])
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router])

  return (
    <div className="min-h-screen bg-yaana-lavender-base ">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-lavender-700 hover:text-lavender-900">
              â† Dashboard
              </Link>
              <h1 className="text-xl font-bold">Blogs</h1>
            </div>
            <div className="flex items-center">
              <Link
                href="/admin/blogs/new"
                className="bg-lavender-600 text-white px-4 py-2 rounded hover:bg-lavender-700"
              >
                Create Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-yaana-charcoal-light">Loading...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-yaana-charcoal-light">No blogs yet</p>
              <Link
                href="/admin/blogs/new"
                className="mt-4 inline-block text-lavender-700 hover:text-lavender-900"
              >
                Create your first blog
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-yaana-soft-lavender">
                <thead className="bg-yaana-lavender-base">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-yaana-soft-lavender">
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-yaana-charcoal">
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-yaana-charcoal-light">{blog.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.published
                              ? 'bg-yaana-soft-lavender text-yaana-deep-lavender'
                              : 'bg-yaana-lavender-base text-yaana-charcoal'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yaana-charcoal-light">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="text-lavender-700 hover:text-lavender-900 mr-4"
                        >
                          Edit
                        </Link>
                        {blog.published && (
                          <Link
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            className="text-yaana-charcoal-light hover:text-yaana-charcoal"
                          >
                            View
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

