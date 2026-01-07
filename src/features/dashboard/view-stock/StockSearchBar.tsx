import { Card, CardContent } from '@/common/shadcn-ui/card'
import { Input } from '@/common/shadcn-ui/input'

interface Props {
  search: string
  setSearch: (value: string) => void
}

export default function StockSearchBar({ search, setSearch }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-5 flex-1"
            placeholder="Search stock items..."
          />

          <button className="ml-4 px-6 bg-blue-600 text-white rounded-lg font-medium">
            Search
          </button>

          <button className="ml-4 px-6 bg-gray-400/15 text-gray-500 rounded-lg font-medium">
            Quick Adjust
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
