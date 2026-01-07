export default function UnitStockViewColor(unit: number) {
    if (unit < 10) {
        return ' text-red-600'
    } else if (unit <= 25) {
        return ' text-yellow-700'
    } else if (unit <= 45) {
        return ' text-green-700'
    } else {
        return ' text-blue-700'
    }
}