export interface Product {
  id: string
  business_id: string
  name: string
  unit: string
  price: number
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  stocks?: {
    id: string
    product_id: string
    stock_on_hand: number
    updated_at: string
    deleted_at: string | null
  }[]
}

export interface ProductSummary  {
  productId: string
  product: string
  currentStock: number
  sold7d: number
  status: "SAFE" | "LOW" | "OUT" | "CRITICAL"
}
