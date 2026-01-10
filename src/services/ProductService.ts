import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { ProductSoldStats, RankedProductPeriod, TopSellingProduct } from "@/common/response/product";
interface CreateProductPayload {
    name: string;
    unit: string;
    stock: number;
    price: number;
    image: File | null;
}


class ProductService {
    public async createProduct(data: CreateProductPayload[]) {
        // const response = await apiClient({ method: 'post', url: '/products', data: data });
        // return response;
        for (let item of data) {
            const formData = new FormData();
            formData.append('name', item.name);
            formData.append('unit', item.unit);
            formData.append('stock', item.stock.toString());
            formData.append('price', item.price.toString());
            formData.append('image', item.image!);
            await apiClient({ method: 'post', url: '/products', data: formData });
        }
        console.log("Simulating API call with data:", data);
    }

    public async getProductSoldStats() {
        const response = await apiClient<ApiResponse<ProductSoldStats[]>>({ method: 'get', url: '/products/sold-stats' });
        return response;
    }

    public async getTopSellingProducts() {
        const response = await apiClient<ApiResponse<TopSellingProduct[]>>({ method: 'get', url: '/products/top-selling' });
        return response;
    }

    public async getTopSellingProductsByPeriod(period: 'week' | 'month') {
        const response = await apiClient<ApiResponse<RankedProductPeriod[]>>({ method: 'get', url: `/products/top-selling-by-period?period=${period}` });
        return response;
    }
}

export default new ProductService();