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