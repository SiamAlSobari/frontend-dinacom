import FieldInfo from '@/common/components/FieldInfo'
import AuthService from '@/services/AuthService'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Lock, Mail, User } from 'lucide-react'
import React from 'react'
import z from 'zod'

export default function SignUpForm() {

  const validate = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  })

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: AuthService.signUp,
    mutationKey: ['auth_signup'],
    onSuccess: (data) => {
      console.log('Sign up successful:', data)
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onChange: validate,
    },
    onSubmit: ({ value }) => {
      signUp({
        name: value.name,
        email: value.email,
        password: value.password,
      })
    },
  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }} className="space-y-4">

      {/* Nama */}
      <form.Field name="name">
        {(field) => (
          <div>
            <label className="block text-sm text-stone-900 mb-1">
              Nama
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                className="w-full pl-10 pr-3 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      {/* Email */}
      <form.Field name="email">
        {(field) => (
          <div>
            <label className="block text-sm text-stone-900 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                className="w-full pl-10 pr-3 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
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
            <label className="block text-sm text-stone-900 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                className="w-full pl-10 pr-3 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
                placeholder="Enter your password"
              />
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  )
}
