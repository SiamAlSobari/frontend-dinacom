import { Box } from 'lucide-react'
import React from 'react'
import StatusColor from '../StatusColor'

interface ProductBgColorProps {
  name: string
  status: string
}


export default function ProductRowStatus({ name, status }: ProductBgColorProps) {
  const color = StatusColor(status)

  return (
    <div className="flex items-center gap-4">
      <div className={`${color.bg} w-14 h-14 rounded-lg flex items-center justify-center`}>
        <Box className={`w-8 h-8 ${color.icon}`} />
      </div>

      <div className="font-normal font-['Poppins'] text-lg opacity-80">
        {name}
      </div>
    </div>
  )
}
