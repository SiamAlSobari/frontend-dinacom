import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPageHeader() {
  return (
 <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">

      <div className=" mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Image
              src="/icons/inventa_icon_white.png"
              alt="Logo"
              width={24}
              height={28}
            />
          </div>
          <span className="text-xl font-semibold text-gray-900">Inventa</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-gray-700 hover:text-gray-900 transition">
            How it works
          </Link>
          <Link href="#features" className="text-gray-700 hover:text-gray-900 transition">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-700 hover:text-gray-900 transition">
            Pricing
          </Link>
          <Link href="#help" className="text-gray-700 hover:text-gray-900 transition">
            Help
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-700 hover:text-gray-900 transition font-medium">
            Log in
          </Link>
          <Link
            href="/subscribe"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  )
}
