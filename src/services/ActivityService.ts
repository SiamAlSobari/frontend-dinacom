import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { Activity } from "@/common/response/activity";

class ActivityService {
    public async getActivities() {
        const response = await apiClient<ApiResponse<Activity[]>>({
            method: "get",
            url: `/activities`,
        });
        return response.data;
    }
}

export default new ActivityService();