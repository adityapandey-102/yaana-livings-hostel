// app/admin/blogs/BlogForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import RichTextEditor from '@/components/editor/RichTextEditor'

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  featuredImageUrl?: string | null
  metaTitle: string | null
  metaDescription: string | null
  published: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function BlogForm({ blog }: { blog?: Blog }) {
  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '')
  const [content, setContent] = useState(blog?.content || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(blog?.featuredImageUrl || '')
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(blog?.metaDescription || '')
  const [published, setPublished] = useState(blog?.published || false)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!blog) {
      setSlug(generateSlug(value))
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setImageError('')

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError('Image size must be less than 5MB')
        e.target.value = ''
        return
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setImageError('Only JPEG, PNG, and WebP images are allowed')
        e.target.value = ''
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!blog && !imageFile) {
      setError('Image is required for new blog')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('excerpt', excerpt)
    formData.append('content', content)
    formData.append('metaTitle', metaTitle || title)
    formData.append('metaDescription', metaDescription || excerpt)
    formData.append('published', published.toString())
    formData.append('publishedAt', published ? new Date().toISOString() : '')

    if (blog) {
      formData.append('id', blog.id)
    }

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await fetch('/api/blogs', {
        method: blog ? 'PUT' : 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save blog')
      }

      router.push('/admin/blogs')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/admin/blogs" className="text-blue-600 hover:text-blue-800">
              ← Back to Blogs
            </Link>
            <h1 className="ml-4 text-xl font-bold">
              {blog ? 'Edit Blog' : 'New Blog'}
            </h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              URL: /blogs/{slug || 'your-slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            {/* <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            /> */}
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image {!blog && '*'}
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {imageError && (
              <p className="mt-1 text-sm text-red-600">{imageError}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Max size: 5MB. Allowed: JPEG, PNG, WebP
            </p>
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative w-full h-64 border border-gray-300 rounded-md overflow-hidden">
                  {imagePreview.startsWith('data:') ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || 'Will use title if empty'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder={excerpt || 'Will use excerpt if empty'}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
            </button>
            <Link
              href="/admin/blogs"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}