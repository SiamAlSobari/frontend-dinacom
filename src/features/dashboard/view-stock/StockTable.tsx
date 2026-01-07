import { Card, CardContent, CardHeader } from '@/common/shadcn-ui/card'
import StockTableHeader from './StockTableHeader'
import StockTableRow from './StockTableRow'

interface StockItem {
  name: string
  stock_in: number
  stock_out: number
  status: string
  day_left: number
  caregory: string
  image: string
}

export default function StockTable({ items }: { items: StockItem[] }) {
  return (
    <Card className="mt-10 pt-0">
      <CardHeader className="py-4 border-b border-gray-500/10 rounded-tl-xl rounded-tr-xl bg-gray-300/15">
        <StockTableHeader />
      </CardHeader>

      <CardContent>
        {items.map((item, index) => (
          <StockTableRow key={index} item={item} />
        ))}

        {items.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            Product not found
          </div>
        )}
      </CardContent>
    </Card>
  )
}
