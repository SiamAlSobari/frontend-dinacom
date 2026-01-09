"use client"

import AuthService from '@/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // const { data, isError } = useQuery({
  //   queryKey: ['auth'],
  //   queryFn: () => AuthService.session(),
  // })

  // useEffect(() => {
  //   if ((isError || !data)) {
  //     router.push('/auth')
  //   }
  // }, [isError, data, router])

  // if (isError || !data) {
  //   return <div>Loading...</div>
  // }

  // if (isError || !data) {
  //   return null
  // }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await AuthService.session()
      } catch (error) {
        router.push('/auth')
      }
    }
    checkAuth()
  }, [])

  return <>{children}</>
}
