'use client'

import React from 'react'
import { Card } from '@/common/shadcn-ui/card'
import SignInForm from '@/features/auth/SignInForm'
import SignUpForm from '@/features/auth/SignUpForm'
import Image from 'next/image'

export default function AuthPage() {
  const [tab, setTab] = React.useState<'signin' | 'signup'>('signin')

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
      
      {/* Left image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/backgrounds/auth_bg.png"
          alt=""
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
              <Image
                src="/icons/inventa_icon_white.png"
                alt="Logo"
                width={28}
                height={32}
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Inventa</h1>
            <p className="text-sm text-gray-500">
              {tab === 'signin' ? 'Welcome back' : 'Create your account'}
            </p>
          </div>

          {/* Card */}
          <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            
            {/* Tabs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setTab('signin')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all
                  ${tab === 'signin'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                Sign In
              </button>

              <button
                onClick={() => setTab('signup')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all
                  ${tab === 'signup'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            {tab === 'signin' ? <SignInForm /> : <SignUpForm />}
          </Card>
        </div>
      </div>
    </div>
  )
}
