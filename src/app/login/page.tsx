'use client'

import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push('/')
      }
    }

    checkSession()
  }, [router])

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      alert('Login failed: ' + error.message)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
        TrackKaro
      </h1>
      <p className="text-lg text-gray-300 mb-12">
        Stay on top of your job hunt…
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-6xl">
        {/* Box 1 */}
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Effortless Job Tracking
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Track daily job applications</li>
            <li>Save your progress easily</li>
            <li>All in one place</li>
          </ul>
        </div>

        {/* Box 2 */}
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Visual Insights into Your Process
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>See your application history</li>
            <li>Heatmaps + streaks = motivation</li>
            <li>Understand your trends</li>
          </ul>
        </div>

        {/* Box 3 */}
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Designed for Consistency
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Simple + minimal UI</li>
            <li>Gamified experience</li>
            <li>Focused on building momentum</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition"
      >
        Sign in to Get Started →
      </button>
    </main>
  )
}