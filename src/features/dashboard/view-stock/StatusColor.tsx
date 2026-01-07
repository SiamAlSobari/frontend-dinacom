import React from 'react'

export default function StatusColor(status: string) {
    switch (status) {
        case 'Critical':
            return {
                bg: 'bg-red-200/50',
                icon: 'text-red-600'
            }
        case 'Low':
            return {
                bg: 'bg-yellow-200/50',
                icon: 'text-yellow-600'
            }
        case 'Good':
            return {
                bg: 'bg-green-200/50',
                icon: 'text-green-600'
            }
        case 'High':
            return {
                bg: 'bg-blue-200/50',
                icon: 'text-blue-600'
            }
        default:
            return {
                bg: 'bg-gray-200/50',
                icon: 'text-gray-600'
            }
    }
}
