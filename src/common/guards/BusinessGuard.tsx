"use client"

import BusinessService from '@/services/BusinessService'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function BusinessGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

//   const { data, isError } = useQuery({
//     queryKey: ['business_info'],
//     queryFn: () => BusinessService.getBusiness(),
//   })

//   useEffect(() => {
//     if ( (isError || !data)) {
//       router.push('/business')
//     }
//   }, [isError, data, router])


//   if (isError || !data) {
//     return null 
//   }

    useEffect(() => {
        const checkBusiness = async () => {
            try {
                await BusinessService.getBusiness()
            } catch (error) {
                router.push('/business')
            }
        }
        checkBusiness()
    }, [router])

  return <>{children}</>
}
