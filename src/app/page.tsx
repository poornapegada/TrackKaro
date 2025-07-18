'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TopNavBar from '@/components/TopNavBar'

import dayjs from 'dayjs'
import JobHeatmap from '@/components/JobHeatmap'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [count, setCount] = useState<number>(0)
  const [monthlyCount, setMonthlyCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const router = useRouter()

  const today = dayjs().format('YYYY-MM-DD')

  // Helper to update monthly and total counts
  const fetchApplicationStats = async (userId: string) => {
    const start = dayjs().startOf('month').format('YYYY-MM-DD')
    const end = dayjs().endOf('month').format('YYYY-MM-DD')

    const { data: monthData, error: monthError } = await supabase
      .from('applications')
      .select('count')
      .eq('user_id', userId)
      .gte('date', start)
      .lte('date', end)

    if (monthData && !monthError) {
      const total = monthData.reduce((sum, entry) => sum + entry.count, 0)
      setMonthlyCount(total)
    }

    const { data: totalData, error: totalError } = await supabase
      .from('applications')
      .select('count')
      .eq('user_id', userId)

    if (totalData && !totalError) {
      const total = totalData.reduce((sum, entry) => sum + entry.count, 0)
      setTotalCount(total)
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      const user = session.user
      setUserId(user.id)
      setUserEmail(user.email ?? '')

      const { data, error } = await supabase
        .from('applications')
        .select('count')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (data) {
        setCount(data.count)
      } else {
        const { error: insertError } = await supabase
          .from('applications')
          .insert([
            {
              user_id: user.id,
              date: today,
              count: 0,
            },
          ])

        if (!insertError) {
          setCount(0)
        } else {
          console.error("Error inserting today's row:", insertError)
        }
      }

      await fetchApplicationStats(user.id)
      setLoading(false)
    }

    loadUserData()
  }, [router, today])

  const updateCount = async (change: number) => {
    const newCount = Math.max(0, count + change)
    setCount(newCount)

    if (!userId) return

    await supabase
      .from('applications')
      .upsert(
        {
          user_id: userId,
          date: today,
          count: newCount,
        },
        {
          onConflict: 'user_id,date',
        }
      )

    await fetchApplicationStats(userId)
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <>
      <TopNavBar userEmail={userEmail} />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center">
            <h1 className="text-xl font-semibold text-green-700 mb-1 truncate">
              Welcome, {userEmail}
            </h1>
            <p className="text-gray-500 mb-4">Today: {today}</p>

            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={() => updateCount(-1)}
                className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full text-xl shadow"
              >
                –
              </button>

              <div className="text-3xl font-bold text-gray-700">{count}</div>

              <button
                onClick={() => updateCount(1)}
                className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full text-xl shadow"
              >
                +
              </button>
            </div>

            <p className="text-gray-600 text-sm">Click + or – to update</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 w-80 text-left">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Applications</h2>
            <p className="text-gray-600 text-sm mb-2">
              📅 <strong>This month:</strong> {monthlyCount}
            </p>
            <p className="text-gray-600 text-sm">
              📌 <strong>So far:</strong> {totalCount}
            </p>
          </div>
        </div>

        <JobHeatmap key={count} userId={userId!} />
      </main>
    </>
  )
}