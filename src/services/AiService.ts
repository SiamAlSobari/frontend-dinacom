import { AI_RECO_DUMMY } from "@/common/dummy/ai_reco";
import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { AiRecommendations, AiRuns, PriorityAction } from "@/common/response/ai";

class AiService {
    public async aiRun(){
        const response = await apiClient<ApiResponse<AiRuns>>({ method: 'get', url: `/ai/latest` });
        return response.data
    }
    
    public async generateAiRecommendations(){
        const response = await apiClient<ApiResponse<AiRecommendations[]>>({ method: 'get', url: `/ai/recommendation` });
        return response.data
    }

    public async applyRecommendation(recommendationId: string){
        const response = await apiClient({ 
            method: 'patch', 
            url: `/ai/recommendation/${recommendationId}` 
        });
        return response
    }

    public async getPriorityActions(){
        const response = await apiClient<ApiResponse<PriorityAction[]>>({ method: 'get', url: `/ai/priority` });
        return response.data
    }

    public async runAiAnalysis(from: string, to: string){
        const response = await apiClient({ 
            method: 'post', 
            url: `/ai/analyze`,
            data: { from, to }
        });
        return response
    }
}

export default new AiService();