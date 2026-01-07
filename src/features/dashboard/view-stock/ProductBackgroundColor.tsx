import { Box } from 'lucide-react'
import React from 'react'

interface ProductBgColorProps {
  name: string
  status: string
}

function getColorByStatus(status: string) {
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

export default function ProductBackgroundColor({ name, status }: ProductBgColorProps) {
  const color = getColorByStatus(status)

  return (
    <div className="flex items-center gap-4">
      <div className={`${color.bg} w-14 h-14 rounded-lg flex items-center justify-center`}>
        <Box className={`w-8 h-8 ${color.icon}`} />
      </div>

      <div className="font-medium text-lg opacity-80">
        {name}
      </div>
    </div>
  )
}
