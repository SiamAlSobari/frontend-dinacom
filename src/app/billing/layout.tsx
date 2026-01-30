import AuthGuardEmpty from '@/common/guards/AuthGuardEmpty'
import React from 'react'

export default function BillingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthGuardEmpty>
                {children}
            </AuthGuardEmpty>
        </>
    )
}
