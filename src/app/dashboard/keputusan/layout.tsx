import KeputusanBar from '@/features/dashboard/keputusan/KeputusanBar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 sm:p-6  lg:p-10 min-h-screen bg-gray-50">
        <KeputusanBar />
        {children}
    </div>
  )
}
