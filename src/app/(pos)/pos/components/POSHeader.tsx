"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

export function POSHeader() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentTime(new Date())
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Image src="/icons/inventa_icon_white.png" alt="Dinacom Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inventa</h1>
              <p className="text-xs text-gray-500">Inventa</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Current Date & Time */}
            <div className="hidden md:flex flex-col items-end">
              {currentTime ? (
                <>
                  <p className="text-sm font-semibold text-gray-900">
                    {currentTime.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentTime.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </>
              ) : (
                <div className="h-10 w-48 animate-pulse bg-gray-200 rounded"></div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}