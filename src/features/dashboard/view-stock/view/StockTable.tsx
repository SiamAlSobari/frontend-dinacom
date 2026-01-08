import { Card, CardContent, CardHeader } from '@/common/shadcn-ui/card'
import StockTableHeader from './StockTableHeader'
import StockTableRowMobile from './StokTableRowMobile'
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
    <Card className="mt-6 lg:mt-8 shadow-sm">
      <CardHeader className="hidden lg:block py-0 border-b border-gray-200 bg-gray-50/50">
        <StockTableHeader />
      </CardHeader>

      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Product not found
          </div>
        ) : (
          <>
            <div className="hidden lg:block">
              {items.map((item, index) => (
                <StockTableRow key={index} item={item} />
              ))}
            </div>

            <div className="lg:hidden divide-y divide-gray-200">
              {items.map((item, index) => (
                <StockTableRowMobile key={index} item={item} />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}