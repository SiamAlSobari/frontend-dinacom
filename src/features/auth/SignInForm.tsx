import React from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import FieldInfo from '@/common/components/FieldInfo'
import { useMutation } from '@tanstack/react-query'
import AuthService from '@/services/AuthService'

export default function SignInForm() {
  const validation = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Harus minimal 6 karakter'),
  })

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: AuthService.signIn,
    mutationKey: ['auth_signin'],
    onSuccess: (data) => {
      console.log('Sign in successful:', data)
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: validation,
    },
    onSubmit: ({value}) => {
      signIn(value) 
    },
  })

  const [showPassword, setShowPassword] = React.useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6" // naikkan spacing antar field agar lebih lega
    >
      {/* Email */}
      <form.Field name="email">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-stone-900 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white text-neutral-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      {/* Password */}
      <form.Field name="password">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-stone-900 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-12 py-3 text-sm bg-white text-neutral-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Bagian bawah: error + forgot password */}
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <FieldInfo field={field} />
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-right sm:text-left"
              >
                Lupa password?
              </a>
            </div>
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        Sign In
      </button>
    </form>
  )
}   