'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BlogForm from '../BlogForm'

export default function NewBlogPage() {
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
        return
      }
      setReady(true)
    }

    checkAuth()
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-yaana-lavender-base flex items-center justify-center">
        <p className="text-yaana-charcoal-light">Loading...</p>
      </div>
    )
  }

  return <BlogForm />
}

