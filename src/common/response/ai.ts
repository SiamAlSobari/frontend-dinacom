export interface AiRuns {
  id: string
  business_id: string
  generated_at: string
  error_message: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

export enum AiRecommendationsAction {
  RESTOCK = "RESTOCK",
  WAIT = "WAIT",
  REDUCE = "REDUCE",
}

export enum AiRecommendationsRiskLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}


export interface NstInsights {
  id: string
  ai_run_id: string
  pattern_trend_summary: string
  urgent: string
  medium: string
  low: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface AiRecommendations {
  id: string
  ai_run_id: string
  product_id: string
  current_stock: number
  recommended_action: AiRecommendationsAction
  quantity_min: number
  quantity_max: number
  risk_level: AiRecommendationsRiskLevel
  days_until_stockout: number
  reason_text: string
  created_at: string
  updated_at: string
  deleted_at: string
product: any
  // relations
  ai_run: AiRuns
}


export interface PriorityAction {
  product_name: string
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW'
  days_left: number | null
  priority_score: number
  recommended_qty: string
}
