export interface Subscription {
  id: string;
  user_id: string;
  plan_duration: string;
  start_date: Date ;   
  status: string;
  end_date: Date ;     
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}