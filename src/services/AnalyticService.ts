import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { DailyPerWeeklySales, TopSellingProduct, WeeklyPerMonthSales } from "@/common/response/analytic";

class AnalyticService {
    public async getDailyPerWeeklySales() {
        const response  = await apiClient<ApiResponse<DailyPerWeeklySales[]>>({ method: 'get', url: '/analytics/sales-weekly' });
        return response;
    }

    public async getWeeklyPerMonthSales() {
        const response  = await apiClient<ApiResponse<WeeklyPerMonthSales[]>>({ method: 'get', url: '/analytics/sales-monthly' });
        return response;
    }

    public async getTopSellingProductsThisWeek() {
        const response  = await apiClient<ApiResponse<TopSellingProduct[]>>({ method: 'get', url: '/analytics/top-products-this-week' });
        return response;
    }

    public async getTopSellingProductsThisMonth() {
        const response  = await apiClient<ApiResponse<TopSellingProduct[]>>({ method: 'get', url: '/analytics/top-products-this-month' });
        return response;
    }
}

export default new AnalyticService();