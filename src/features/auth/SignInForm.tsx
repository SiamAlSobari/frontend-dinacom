import React from 'react'

export default function SignInForm() {
    return (
        <form className="space-y-6">
            <div>
                <label className="block text-xl text-stone-900 mb-2">Email</label>
                <input
                    type="email"
                    className="w-full px-4 py-4 bg-white text-base text-neutral-600 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label className="block text-xl text-stone-900 mb-2">Password</label>
                <div className="relative">

                    <input
                        type="password"
                        className="w-full px-4 py-4 bg-white text-base text-neutral-600 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mt-3 text-right">
                    <a href="#" className="text-lg text-blue-600 hover:underline">
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
