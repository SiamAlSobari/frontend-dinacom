export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  meta: any;
  data: T;
}