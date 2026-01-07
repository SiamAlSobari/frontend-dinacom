export default function StockTableHeader() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center px-2">
      <div className="font-medium text-xl">Product</div>
      <div className="font-medium text-xl text-center">Current Stock</div>
      <div className="font-medium text-xl text-center">Sold (7d)</div>
      <div className="font-medium text-xl text-center">Status</div>
      <div className="font-medium text-xl text-center">Day Left</div>
      <div className="font-medium text-xl text-center">Category</div>
    </div>
  )
}