'use client'

import ExpertCard from '@/components/ExpertCard'
import TopNavBar from '@/components/TopNavBar'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ExpertsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session?.user) {
        setUserEmail(session.user.email ?? '')
      }
    }

    fetchUser()
  }, [])

  const experts = [
    {
      name: 'Ananya Rao',
      company: 'Google',
      logo: '/logos/google.png',
      link: 'https://forms.gle/dummyBookingLink1'
    },
    {
      name: 'John Smith',
      company: 'Microsoft',
      logo: '/logos/microsoft.png',
      link: 'https://forms.gle/dummyBookingLink2'
    },
    {
      name: 'Priya Sharma',
      company: 'Amazon',
      logo: '/logos/amazon.png',
      link: 'https://forms.gle/dummyBookingLink3'
    },
    {
      name: 'Rahul Mehta',
      company: 'Google',
      logo: '/logos/google.png',
      link: 'https://forms.gle/dummyBookingLink4'
    },
    {
      name: 'Emily Chen',
      company: 'Microsoft',
      logo: '/logos/microsoft.png',
      link: 'https://forms.gle/dummyBookingLink5'
    },
    {
      name: 'Arjun Verma',
      company: 'Amazon',
      logo: '/logos/amazon.png',
      link: 'https://forms.gle/dummyBookingLink6'
    }
  ]

  return (
    <>
      <TopNavBar userEmail={userEmail} />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Talk with an Expert</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {experts.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </div>
      </main>
    </>
  )
}
