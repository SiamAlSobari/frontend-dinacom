export default function StockTableHeader() {
  return (
    <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1.2fr] items-center px-6 py-3">
      <div className="text-sm font-medium text-gray-600">Product</div>
      <div className="text-sm font-medium text-gray-600 text-center">Current Stock</div>
      <div className="text-sm font-medium text-gray-600 text-center">Sold (7d)</div>
      <div className="text-sm font-medium text-gray-600 text-center">Status</div>
      <div className="text-sm font-medium text-gray-600 text-center">Days Left</div>
      <div className="text-sm font-medium text-gray-600 text-center">Category</div>
    </div>
  )
}