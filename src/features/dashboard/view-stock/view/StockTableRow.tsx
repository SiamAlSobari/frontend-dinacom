import StatusBadgeColor from "../StatusBadgeColor";
import UnitStockViewColor from "../UnitStockViewColor";
import ProductRowStatus from "./ProductRowStatus";

export default function StockTableRow({ item }: { item: any }) {
  return (
    <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1.2fr] items-center py-4 px-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <ProductRowStatus name={item.name} status={item.status} />
      
      <div className="text-center">
        <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${UnitStockViewColor(item.stock_in)}`}>
          {item.stock_in} units
        </span>
      </div>
      
      <div className="text-sm text-gray-900 text-center">
        {item.stock_out}
      </div>
      
      <div className="text-center">
        {StatusBadgeColor(item.status)}
      </div>
      
      <div className="text-sm text-gray-900 text-center">
        ~{item.day_left} days
      </div>
      
      <div className="text-sm text-gray-900 text-center">
        {item.caregory}
      </div>
    </div>
  )
}