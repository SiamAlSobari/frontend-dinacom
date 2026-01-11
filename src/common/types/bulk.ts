export type BulkRow = {
  date?: Date
  product: {
    id: string
    name: string
    price: number
  }
  quantity: string
  type: string,
  method: string
}
