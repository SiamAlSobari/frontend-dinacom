import AuthGuard from '@/common/guards/AuthGuard'
import BusinessGuard from '@/common/guards/BusinessGuard'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthGuard>
                <BusinessGuard>
                    {children}
                </BusinessGuard>
            </AuthGuard>
        </>
    )
}
