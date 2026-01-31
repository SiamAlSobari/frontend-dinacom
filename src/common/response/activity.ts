export interface Activity {
  id: string
  business_id: string
  activity_text: string
  activity_type: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}


