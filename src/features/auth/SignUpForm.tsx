import { Lock, Mail, User } from 'lucide-react'
import React from 'react'

export default function SignUpForm() {
  return (
    <form className="space-y-4">
      
      {/* Nama */}
      <div>
        <label className="block text-sm text-stone-900 mb-1">
          Nama
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
            placeholder="Enter your name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-stone-900 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="email"
            className="w-full pl-10 pr-3 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-stone-900 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="password"
            className="w-full pl-10 pr-3 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
            placeholder="Enter your password"
          />
        </div>

        <div className="mt-2 text-right">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  )
}
