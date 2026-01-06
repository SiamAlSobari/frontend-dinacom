'use client'

import React, { useState } from 'react'
import { Card } from '@/common/shadcn-ui/card'
import SignInForm from '@/features/auth/SignInForm'
import SignUpForm from '@/features/auth/SignUpForm'
import Image from 'next/image'

export default function AuthPage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="/backgrounds/auth_bg.png"
          alt=""
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-3">
              <Image
                src="/icons/inventa_icon_white.png"
                alt="Logo"
                width={32}
                height={36}
              />
            </div>
            <h1 className="text-3xl font-normal text-stone-900">Inventa</h1>
            <p className="mt-2 text-base text-gray-600">
              {tab === 'signin' ? 'Welcome back' : 'Create your account'}
            </p>
          </div>

          {/* Card */}
          <Card className="bg-white rounded-2xl shadow-lg p-6">
            
            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setTab('signin')}
                className={`px-6 py-2 text-sm rounded-lg transition
                  ${tab === 'signin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Sign In
              </button>

              <button
                onClick={() => setTab('signup')}
                className={`px-6 py-2 text-sm rounded-lg transition
                  ${tab === 'signup'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
