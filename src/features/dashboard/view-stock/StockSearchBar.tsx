import { Card, CardContent } from '@/common/shadcn-ui/card'
import { Input } from '@/common/shadcn-ui/input'

interface Props {
  search: string
  setSearch: (value: string) => void
  tabs: string
  setTabs: (value: string) => void
}

export default function StockSearchBar({
  search,
  setSearch,
  tabs,
  setTabs,
}: Props) {
  return (
    <Card className="mb-6">
      <CardContent >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          {/* Input Search */}
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:flex-1 p-5"
            placeholder="Search stock items..."
          />

          {/* Buttons */}
          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={() => setTabs('view')}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                tabs === 'view'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Search
            </button>

            <button
              onClick={() => setTabs('adjust')}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                tabs === 'adjust'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Quick Adjust
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}