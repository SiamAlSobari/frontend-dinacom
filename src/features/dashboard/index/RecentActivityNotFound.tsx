"use client"

import { Activity } from "lucide-react"

export default function RecentActivityNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <Activity className="w-5 h-5 text-gray-500" />
      </div>

      <p className="text-sm font-medium text-gray-700">
        Belum ada aktivitas
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Aktivitas terbaru akan muncul di sini.
      </p>

    </div>
  )
}
