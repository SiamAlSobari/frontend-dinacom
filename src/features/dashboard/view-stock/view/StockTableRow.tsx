import StatusBadgeColor from "../StatusBadgeColor";
import UnitStockViewColor from "../UnitStockViewColor";
import ProductRowStatus from "./ProductRowStatus";

export default function StockTableRow({ item }: { item: any }) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center py-4 px-7 border-b border-gray-100 last:border-0">
      <ProductRowStatus name={item.name} status={item.status} />
      <div className={`font-normal font-['Poppins'] text-lg text-center px-2 py-1 rounded-lg ${UnitStockViewColor(item.stock_in)}`}>
        {item.stock_in} Units
      </div>
      <div className="font-normal font-['Poppins'] text-lg text-center">
        {item.stock_out}
      </div>
      <div className="font-normal font-['Poppins'] text-lg text-center">
        {StatusBadgeColor(item.status)}
      </div>
      <div className="font-normal font-['Poppins'] text-lg text-center">
        ~ {item.day_left} days
      </div>
      <div className="font-normal font-['Poppins'] text-lg text-center">
        {item.caregory}
      </div>
    </div>
  )
}