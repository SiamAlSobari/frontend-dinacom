export interface WeeklyPerMonthSales  {
  week: number       
  label: string       
  total_sold: number  
}

export type DailyPerWeeklySales = {
  day: number        
  day_name: string  
  total_sold: number
}