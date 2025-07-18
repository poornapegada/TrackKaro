'use client'

import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import dayjs from 'dayjs'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { supabase } from '@/lib/supabase'

interface HeatmapData {
  date: string
  count: number
}

export default function JobHeatmap({ userId }: { userId: string }) {
  const [values, setValues] = useState<HeatmapData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('date, count')
        .eq('user_id', userId)

      if (data) {
        const formatted = data.map((item) => ({
          date: item.date,
          count: item.count,
        }))
        setValues(formatted)
      }
    }

    if (userId) fetchData()
  }, [userId])

  const endDate = dayjs().format('YYYY-MM-DD')
  const startDate = dayjs().subtract(180, 'day').format('YYYY-MM-DD') // Last 6 months

  return (
    <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Your Job Application Activity</h2>

      <CalendarHeatmap
  startDate={startDate}
  endDate={endDate}
  values={values}
  classForValue={(value: any) => {
    if (!value || !value.count) return 'color-empty'
    if (value.count === 1) return 'color-scale-1'
    if (value.count === 2) return 'color-scale-2'
    if (value.count === 3) return 'color-scale-3'
    return 'color-scale-4'
  }}
  tooltipDataAttrs={(value: { date: string; count: number }) => {
    if (!value || !value.date) return {}
    const formattedDate = dayjs(value.date).format('MMM D YYYY')
    return {
      'data-tooltip-id': 'heatmap-tooltip',
      'data-tooltip-content': `${value.count} application${value.count === 1 ? '' : 's'} on ${formattedDate}`,
    }
  }}
  showWeekdayLabels={false}
      />
      <Tooltip id="heatmap-tooltip" />

      <style>
        {`
          .color-empty { fill: #ebedf0; }
          .color-scale-1 { fill: #c6e48b; }
          .color-scale-2 { fill: #7bc96f; }
          .color-scale-3 { fill: #239a3b; }
          .color-scale-4 { fill: #196127; }
        `}
      </style>
    </div>
  )
}