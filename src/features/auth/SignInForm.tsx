import React from 'react'
import { Mail, Lock } from 'lucide-react'

export default function SignInForm() {
  return (
    <form className="space-y-4">
      
      {/* Email */}
      <div>
        <label className="block text-sm text-stone-900 mb-1">
          Email
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />

          <input
            type="email"
            className="w-full pl-10 pr-3 py-3 text-sm bg-white text-neutral-700 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
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
            className="w-full pl-10 pr-3 py-3 text-sm bg-white text-neutral-700 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
            placeholder="Enter your password"
          />
        </div>

        <div className="mt-2 text-right">
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </form>
  )
}
