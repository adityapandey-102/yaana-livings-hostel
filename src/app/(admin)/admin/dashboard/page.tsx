// app/admin/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()

  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')

    if (!storedUsername) {
      router.push('/admin/login')
      return
    }

    setUsername(storedUsername)
    setLoading(false)
  }, [router])

  async function handleSignOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yaana-lavender-base">
        <div className="text-yaana-charcoal-light">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yaana-lavender-base">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Yaana Group Admin</h1>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-yaana-charcoal-light mr-4 border-black border-[1px] rounded-lg">
                <span className='border-r-[1px] bg-black rounded-l-lg text-white p-2 inline-block'>Admin</span>
                <span className='inline-block p-2'>{username}</span> 
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-white hover:text-lavender-900 border-2 hover:bg-white hover:border-2 hover:border-lavender-500 bg-lavender-600 py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/blogs"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">Blogs</h3>
              <p className="text-yaana-charcoal-light">Manage blog posts</p>
            </Link>

            <Link 
              href="/admin/inquiries"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">Inquiries</h3>
              <p className="text-yaana-charcoal-light">Manage Customer Inquiries</p>
            </Link>

            <Link
              href="/admin/visits"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">Visits</h3>
              <p className="text-yaana-charcoal-light">Manage Customer Visits</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
