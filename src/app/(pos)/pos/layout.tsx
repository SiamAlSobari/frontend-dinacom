

import type { Metadata } from "next"
import { POSHeader } from "./components/POSHeader"
import SubscriptionGuard from "@/common/guards/SubscriptionGuard"

export const metadata: Metadata = {
    title: "POS System - Dinacom",
    description: "Point of Sale System untuk manajemen penjualan",
}

export default function POSLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SubscriptionGuard>
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-50">
                {/* Header */}
                <POSHeader />

                {/* Main Content */}
                <main className="relative">
                    {children}
                </main>



                {/* Background Decorations */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </div>
        </SubscriptionGuard>
    )
}