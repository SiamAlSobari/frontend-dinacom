import ProductBackgroundColor from "./ProductRowStatus";
import StatusBadgeColor from "../StatusBadgeColor";
import UnitStockViewColor from "../UnitStockViewColor";
import ProductRowStatus from "./ProductRowStatus";

export default function StockTableRowMobile({ item }: { item: any }) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <ProductRowStatus name={item.name} status={item.status} />
        <div className={`px-3 py-1 rounded-lg text-sm font-medium ${UnitStockViewColor(item.stock_in)}`}>
          {item.stock_in} Units
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Sold (7d)</span>
          <p className="font-normal font-['Poppins']">{item.stock_out}</p>
        </div>
        <div>
          <span className="text-gray-500">Status</span>
          <p className="font-normal font-['Poppins']">{StatusBadgeColor(item.status)}</p>
        </div>
        <div>
          <span className="text-gray-500">Day Left</span>
          <p className="font-normal font-['Poppins']">~ {item.day_left} days</p>
        </div>
        <div>
          <span className="text-gray-500">Category</span>
          <p className="font-normal font-['Poppins']">{item.caregory}</p>
        </div>
      </div>
    </div>
  )
}