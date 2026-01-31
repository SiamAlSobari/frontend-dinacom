import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { Product, ProductSummary } from "@/common/response/product";
interface CreateProductPayload {
    name: string;
    unit: string;
    stock: number;
    price: number;
    image: File | null;
}

class ProductService {
    public async createProduct(data: CreateProductPayload[]) {
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

    public async getProduct(){
        const response = await apiClient<ApiResponse<Product[]>>({ method: 'get', url: '/products' });
        return response.data
    }

    public async getProductPaginated(page: number, limit: number){
        const response = await apiClient<ApiResponse<Product[]>>({ method: 'get', url: `/products?page=${page}&limit=${limit}` });
        return response
    }

    public async deleteProduct(productId: string){
        const response = await apiClient({ method: 'delete', url: `/products/${productId}` });
        return response
    }

    public async getProductSummary(){
        const response = await apiClient<ApiResponse<ProductSummary[]>>({ method: 'get', url: '/products/summary' });
        return response
    }

    public async updateProduct(id: string, formData: FormData) {
        const response = await apiClient({ 
            method: 'put', 
            url: `/products/${id}`, 
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response
    }
}

export default new ProductService();