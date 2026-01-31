"use client"

import { Card } from "@/common/shadcn-ui/card"
import { BulkRow } from "@/common/types/bulk"
import { BulkInfoBanner } from "@/features/dashboard/bulk/BulkInfoBanner"
import { BulkTransactionRow } from "@/features/dashboard/bulk/BulkStransactionRow"
import { BulkTableHeader } from "@/features/dashboard/bulk/BulkTableHeader"
import ActivityService from "@/services/ActivityService"
import TransactionService, { BulkTransactionPayload } from "@/services/TransactionService"
import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"

export default function BulkTransactionPage() {
    const [rows, setRows] = React.useState<BulkRow[]>([
        { date: undefined, product: { id: "", name: "", price: 0 }, quantity: "", type: "SALE", method: "" },
    ])

    const [openProductIndex, setOpenProductIndex] = React.useState<number | null>(null)
    const [openTypeIndex, setOpenTypeIndex] = React.useState<number | null>(null)
    const [openMethodIndex, setOpenMethodIndex] = React.useState<number | null>(null)

    const { mutate: bulkTransaction, isPending: isBulkTransactionPending } = useMutation({
        mutationKey: ["bulk-transaction"],
        mutationFn: TransactionService.bulkTransaction,
        onSuccess: () => {
            alert("Bulk transaction successful!")
        }
    })

    const { data: activities} = useQuery({
        queryKey: ['user-activities'],
        queryFn: () => ActivityService.getActivities(),
    })

    const handleAddRow = () => {
        setRows((prev) => [
            ...prev,
            { date: undefined, product: { id: "", name: "", price: 0 }, quantity: "", type: "SALE", method: "" },
        ])
    }

    const updateRow = (index: number, data: Partial<BulkRow>) => {
        setRows((prev) =>
            prev.map((row, i) => (i === index ? { ...row, ...data } : row))
        )
    }

    const handleSubmit = () => {
        const payload: BulkTransactionPayload = {
            items: rows.map(row => ({
                product_id: row.product?.id as string,
                quantity: Number(row.quantity),
                unit_price: row.product?.price as number,
                trx_type: row.type as string,
                trx_date: new Date(row.date as Date).toISOString(),
                trx_method: row.method as string,
            }))
        }

        bulkTransaction(payload) 
    }


    const handleCancel = () => {
        if (!confirm("Yakin mau membatalkan dan menghapus semua input?")) return
        setRows([{ date: undefined, product: { id: "", name: "", price: 0 }, quantity: "", type: "SALE", method: "" }])
    }

    return (
        <div className="p-6 md:p-10 min-h-screen">
            <BulkInfoBanner />

            <Card className="mt-8 w-full">
                <div className="px-6 pt-6">
                    <div className="text-black text-xl font-normal font-['Poppins'] leading-8">
                        Transaction Entry
                    </div>
                    <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-8">
                        Add rows for each transaction
                    </div>
                </div>

                <BulkTableHeader />

                <div className="space-y-6 py-4">
                    {rows.map((row, index) => (
                        <BulkTransactionRow
                            key={index}
                            row={row}
                            index={index}
                            updateRow={updateRow}
                            openProductIndex={openProductIndex}
                            setOpenProductIndex={setOpenProductIndex}
                            openTypeIndex={openTypeIndex}
                            setOpenTypeIndex={setOpenTypeIndex}
                            openMethodIndex={openMethodIndex}
                            setOpenMethodIndex={setOpenMethodIndex}
                        />
                    ))}
                </div>

                <div className="px-6 pb-6 space-y-4">
                    <button
                        onClick={handleAddRow}
                        className="w-full md:w-auto px-4 py-2 outline-2 outline-blue-600 text-blue-600 rounded-lg transition"
                    >
                        + Add Row
                    </button>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isBulkTransactionPending}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-8 py-3 outline-2 outline-blue-600 text-blue-600 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}