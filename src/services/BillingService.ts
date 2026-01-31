import { ApiResponse } from "@/common/interfaces/response";
import { apiClient } from "@/common/libs/axios";
import { Subscription } from "@/common/response/billing";
import { clearSubscription, setSubscription } from "@/common/stores/subscription";

interface WebHookPayload {
    order_id: string;
    status_code: string;
    gross_amount: string;
  //  signature_key: string;
    transaction_status: string;
    payment_type: string;
    fraud_status: string;
}

class BillingService {
    public async getActiveSubscription() {
        const response = await apiClient<ApiResponse<Subscription>>({ method: 'get', url: '/billing/subscription' });
        if (response.data !== null) {
            setSubscription(response.data);
        }
        else {
            clearSubscription();
        }
        return response;
    }

    public async subscribe(plan_duration: string) {
        const response = await apiClient<ApiResponse<{ redirectUrl: string, snap_token: string }>>({
            method: 'post',
            url: '/billing/subscribe',
            data: { plan_duration }
        });
        return response;
    }
    public async midtransWebhook(payload: WebHookPayload) {
        const response = await apiClient<ApiResponse<null>>({
            method: 'post',
            url: '/billing/webhook',
            data: payload
        });
        return response;
    }
}

export default new BillingService();