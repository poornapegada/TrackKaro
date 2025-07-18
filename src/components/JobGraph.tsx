'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import dayjs from 'dayjs'

interface DataPoint {
  date: string
  count: number
}

export default function JobGraph({ userId }: { userId: string }) {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('date, count')
        .eq('user_id', userId)
        .order('date', { ascending: true })

      if (data) {
        const formatted = data.map((item) => ({
          date: dayjs(item.date).format('MMM D'),
          count: item.count,
        }))
        setData(formatted)
      }
    }

    if (userId) {
      fetchData()
    }
  }, [userId])

  return (
    <div className="w-full max-w-3xl h-80 mt-8 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
        Applications per Day
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}