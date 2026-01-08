export default function UnitStockViewColor(stock: number) {
  if (stock <= 5) {
    return 'bg-red-100 text-red-600'
  } else if (stock <= 25) {
    return 'bg-orange-100 text-orange-600'
  } else if (stock <= 50) {
    return 'bg-green-100 text-green-600'
  } else {
    return 'bg-blue-100 text-blue-600'
  }
}