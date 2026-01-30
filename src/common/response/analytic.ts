export interface WeeklyPerMonthSales  {
  week: number       
  label: string       
  total_sold: number  
}

export interface DailyPerWeeklySales  {
  day: number        
  day_name: string  
  total_sold: number
}

export interface TopSellingProduct  {
  product_id: number      
  product_name: string    
  total_sold: number      
}

export interface WeeklyStabilityData {
  week: string;      // contoh: "Week 1"
  stable: number;    // jumlah stable
  unstable: number;  // jumlah unstable
}

export interface RevenueTrend {
  week: string
  revenue: number
}
