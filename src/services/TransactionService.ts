import { apiClient } from "@/common/libs/axios"

export interface BulkTransactionPayload {
    items: {
        product_id: string
        quantity: number
        unit_price: number
        trx_type: string
        trx_date: string
        trx_method: string
    }[]
}

class TransactionService {
    public async bulkTransaction(data: BulkTransactionPayload) {
        const response = await apiClient({
            method: "post",
            url: "/transactions/bulk",
            data,
        })
        return response
    }
}


export default new TransactionService();