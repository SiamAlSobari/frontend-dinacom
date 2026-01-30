"use client"

import AuthService from '@/services/AuthService'
import React, { useEffect } from 'react'

export default function AuthGuardEmpty({ children }: { children: React.ReactNode }) {

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
        await AuthService.session()
    }
    checkAuth()
  }, [])

  return <>{children}</>
}
