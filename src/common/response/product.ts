export interface Product {
    id: string
    name: string,
    unit: string,
    stock: number,
    price: number,
    image_url: string
}

export interface ProductSummary  {
  productId: string
  product: string
  currentStock: number
  sold7d: number
  status: "SAFE" | "LOW" | "OUT" | "CRITICAL"
}
