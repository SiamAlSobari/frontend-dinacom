import ProductBackgroundColor from "./ProductRowStatus";
import StatusBadgeColor from "../StatusBadgeColor";
import UnitStockViewColor from "../UnitStockViewColor";
import ProductRowStatus from "./ProductRowStatus";

export default function StockTableRowMobile({ item }: { item: any }) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <ProductRowStatus name={item.name} status={item.status} />
        <div className={`px-3 py-1 rounded-md text-sm font-medium ${UnitStockViewColor(item.stock_in)}`}>
          {item.stock_in} units
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500 text-xs">Sold (7d)</span>
          <p className="font-medium text-gray-900 mt-1">{item.stock_out}</p>
        </div>
        <div>
          <span className="text-gray-500 text-xs">Status</span>
          <div className="mt-1">{StatusBadgeColor(item.status)}</div>
        </div>
        <div>
          <span className="text-gray-500 text-xs">Days Left</span>
          <p className="font-medium text-gray-900 mt-1">~{item.day_left} days</p>
        </div>
        <div>
          <span className="text-gray-500 text-xs">Category</span>
          <p className="font-medium text-gray-900 mt-1">{item.caregory}</p>
        </div>
      </div>
    </div>
  )
}