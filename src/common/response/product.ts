export interface SoldPerWeek {
  week: string;        // ISO date string
  total_sold: number;
}

export interface ProductSoldStats {
  id: string;
  name: string;
  unit: "PCS" | "KG" | "LITER" | "BOX" | "PACK"; 
  current_stock: number;
  total_sold: number;
  sold_per_week: SoldPerWeek[];
}

export interface TopSellingProduct {
  id: string;
  name: string;
  price: number;
  total_sold: number;
}

export interface RankedProductPeriod {
  period: string;        // ISO date string (misal: per minggu / per bulan)
  product_id: string;
  product_name: string;
  price: number;
  total_sold: number;
  rank: number;
}