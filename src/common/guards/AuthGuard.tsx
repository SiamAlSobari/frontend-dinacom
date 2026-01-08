"use client"

import AuthService from '@/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['auth'],
        queryFn: () => AuthService.session(),
        
    })
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError || !data) {
        router.push('/signin')
    }
  return (
    <>{children}</>
  )
}
