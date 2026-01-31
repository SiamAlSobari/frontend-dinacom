import { DashboardHeader } from '@/common/components/DashboardHeader'
import AuthGuard from '@/common/guards/AuthGuard'
import BusinessGuard from '@/common/guards/BusinessGuard'
import SubscriptionGuard from '@/common/guards/SubscriptionGuard'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthGuard>
                <BusinessGuard>
                    <SubscriptionGuard>
                        <DashboardHeader />
                        {children}
                    </SubscriptionGuard>
                </BusinessGuard>
            </AuthGuard>
        </>
    )
}
