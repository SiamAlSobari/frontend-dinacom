"use client"
import BusinessService from '@/services/BusinessService'
import React from 'react'
import { clearSubscription } from '../stores/subscription'
import BillingService from '@/services/BillingService'

export default function SubscriptionGuard({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        const checkSubscription = async () => {
            try {
                await BillingService.getActiveSubscription ()
            } catch (error) {
                clearSubscription();

            }
        }
        checkSubscription()
    }, [])
    return (
        <>{children}</>
    )
}
