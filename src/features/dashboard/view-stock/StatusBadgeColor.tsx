import { Badge } from "@/common/shadcn-ui/badge"

export default function StatusBadgeColor(status: string) {
  const statusLower = status.toLowerCase()
  
  if (statusLower === 'critical') {
    return (
      <Badge className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-600">
        Critical
      </Badge>
    )
  } else if (statusLower === 'low') {
    return (
      <Badge className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-600">
        Low
      </Badge>
    )
  } else if (statusLower === 'good') {
    return (
      <Badge className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-600">
        Good
      </Badge>
    )
  } else if (statusLower === 'high') {
    return (
      <Badge className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-600">
        High
      </Badge>
    )
  }
  
  return (
    <Badge className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
      {status}
    </Badge>
  )
}
