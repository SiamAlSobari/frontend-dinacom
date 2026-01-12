import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { Product } from "@/common/response/product";
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

    public async getProduct(){
        const response = await apiClient<ApiResponse<Product[]>>({ method: 'get', url: '/products' });
        return response.data
    }

}

export default new ProductService();