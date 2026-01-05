import { Lock, Mail, User } from 'lucide-react'
import React from 'react'

export default function SignUpForm() {
    return (
        <form className="space-y-6">
            {/* Nama */}
                <div>
                    <label className="block text-xl text-stone-900 mb-2">
                        Nama
                    </label>

                    <div className="relative">
                        <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                        />
    
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 bg-white text-base text-neutral-600 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600"
                            placeholder="Enter your nama"
                        />
                    </div>
                </div>
            {/* Email */}
            <div>
                <label className="block text-xl text-stone-900 mb-2">
                    Email
                </label>

                <div className="relative">
                    <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                    />

                    <input
                        type="email"
                        className="w-full pl-12 pr-4 py-4 bg-white text-base text-neutral-600 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600"
                        placeholder="Enter your email"
                    />
                </div>
            </div>

            {/* Password */}
            <div>
                <label className="block text-xl text-stone-900 mb-2">
                    Password
                </label>

                <div className="relative">
                    <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                    />

                    <input
                        type="password"
                        className="w-full pl-12 pr-4 py-4 bg-white text-base text-neutral-600 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mt-3 text-right">
                    <a
                        href="#"
                        className="text-lg text-blue-600 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white text-xl rounded-xl hover:bg-blue-700 transition"
            >
                Sign In
            </button>
        </form>
    )
}
