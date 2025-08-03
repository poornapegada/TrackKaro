'use client'

import Image from 'next/image'

type Props = {
  name: string
  company: string
  logo: string
  link: string
}

export default function ExpertCard({ name, company, logo, link }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center transition hover:shadow-lg hover:scale-[1.03]">
      <div className="w-16 h-16 mb-4 relative">
        <Image
          src={logo}
          alt={`${company} logo`}
          fill
          className="object-contain rounded-full"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mb-4">{company}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Book a Call
      </a>
    </div>
  )
}
