"use client"

import React from 'react'
import { Bell, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DashboardHeader() {
  const pathname = usePathname()

const isActive = (path: string) => {
  if (path === "/dashboard") {
    return pathname === "/dashboard"
  }

  return pathname === path || pathname.startsWith(path + "/")
}


  const navClass = (path: string) =>
    isActive(path)
      ? "text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
      : "text-sm text-gray-600 hover:text-gray-900"

  return (
    <header className="bg-white/95 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Inventa</h1>
            <p className="text-xs text-gray-500">Recomendations</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="/dashboard" className={navClass("/dashboard")}>Home</Link>
          <Link href="/dashboard/record-activity" className={navClass("/dashboard/record-activity")}>Record Activity</Link>
          <Link href="/dashboard/keputusan" className={navClass("/dashboard/keputusan")}>Keputusan</Link>
          <Link href="/dashboard/lorem" className={navClass("/dashboard/lorem")}>Lorem</Link>
          <Link href="/dashboard/stock" className={navClass("/dashboard/stock")}>Stock</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-md">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">POS: Active</span>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">30 Day Left</span>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
