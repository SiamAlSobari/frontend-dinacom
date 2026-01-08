import AuthGuard from '@/common/guards/AuthGuard'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthGuard>
                {children}
            </AuthGuard>
        </>
    )
}
