import { apiClient } from "@/common/libs/axios";

interface CreateBusinessPayload {
    name: string;
}

class BusinessService {
    public async getBusiness() {
        const response = await apiClient({ method: 'get', url: '/business' });
        return response;
    }

    public async createBusiness(payload: CreateBusinessPayload) {
        const response = await apiClient({ method: 'post', url: '/business', data: payload });
        return response;
    }
}

export default new BusinessService();