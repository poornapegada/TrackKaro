"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

// Accept props from parent
type TopNavBarProps = {
  userEmail: string | null
}

export default function TopNavBar({ userEmail }: TopNavBarProps) {
  const [monthlyCount, setMonthlyCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchMonthlyCount = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      const user = session.user

      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')

      const { data, error } = await supabase
        .from('applications')
        .select('count')
        .eq('user_id', user.id)
        .gte('date', start)
        .lte('date', end)

      if (data && !error) {
        const total = data.reduce((sum, entry) => sum + entry.count, 0)
        setMonthlyCount(total)
      }
    }

    fetchMonthlyCount()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-blue-600">TrackKaro</h1>
      <div className="flex items-center gap-6">
        <span className="text-gray-700 text-sm">
          📧 {userEmail}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}