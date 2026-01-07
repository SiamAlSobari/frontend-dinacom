import { Badge } from "@/common/shadcn-ui/badge"

export default function StatusBadgeColor(status: string) {
    switch (status) {
        case 'Critical':
            return <Badge className='bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium'>Critical</Badge>
        case 'Low':
            return <Badge className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium'>Low</Badge>
        case 'Good':
            return <Badge className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>Good</Badge>
        case 'High':
            return <Badge className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium'>High</Badge>
        default:
            return <Badge className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium'>Unknown</Badge>
    }
}
