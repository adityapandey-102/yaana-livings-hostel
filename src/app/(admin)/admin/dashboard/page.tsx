import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  async function handleSignOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Yaana Group Admin</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4 bg-blue-200 p-2 rounded-lg">UserName: {user.email}</span>
              <form action={handleSignOut}>
                <button className="text-sm text-white hover:text-red-800 border-2 hover:bg-white hover:border-2 hover:border-red-600 bg-red-600 p-2 rounded-md">
                  Logout
                </button>
              </form>
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
              <p className="text-gray-600">Manage blog posts</p>
            </Link>

            <Link 
            href={"/admin/inquiries"}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2">Inquiries</h3>
              <p className="text-gray-600">Manage Customer Inquiries</p>
            </Link>

            <Link
            href={"/admin/visits"}
             className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2">Visits</h3>
              <p className="text-gray-600">Manage Customer Visits</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
