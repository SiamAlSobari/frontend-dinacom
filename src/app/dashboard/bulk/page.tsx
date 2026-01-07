"use client"

import { Card } from "@/common/shadcn-ui/card"
import { BulkRow } from "@/common/types/bulk"
import { BulkInfoBanner } from "@/features/dashboard/bulk/BulkInfoBanner"
import { BulkTransactionRow } from "@/features/dashboard/bulk/BulkStransactionRow"
import { BulkTableHeader } from "@/features/dashboard/bulk/BulkTableHeader"
import { ArrowLeft } from "lucide-react"
import React from "react"

export default function BulkTransactionPage() {
    const [rows, setRows] = React.useState<BulkRow[]>([
        { date: undefined, product: "", quantity: "", type: "" },
    ])

    const [openProductIndex, setOpenProductIndex] = React.useState<number | null>(null)
    const [openTypeIndex, setOpenTypeIndex] = React.useState<number | null>(null)

    const handleAddRow = () => {
        setRows((prev) => [
            ...prev,
            { date: undefined, product: "", quantity: "", type: "" },
        ])
    }

    const updateRow = (index: number, data: Partial<BulkRow>) => {
        setRows((prev) =>
            prev.map((row, i) => (i === index ? { ...row, ...data } : row))
        )
    }

    const handleSubmit = () => {
        console.log("BULK DATA:", rows)
        alert("Submit berhasil. Cek console 🔥")
    }

    const handleCancel = () => {
        if (!confirm("Yakin mau membatalkan dan menghapus semua input?")) return
        setRows([{ date: undefined, product: "", quantity: "", type: "" }])
    }

    return (
        <div className="p-6 md:p-10 min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <button>
                    <ArrowLeft className="text-gray-600" size={24} />
                </button>
                <div className="flex flex-col">
                    <div className="text-black text-xl font-normal font-['Poppins'] leading-6">
                        Record Daily Activity
                    </div>
                    <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-6">
                        Bulk input of sales and purchases
                    </div>
                </div>
            </div>

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

            <pre className="mt-6 bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-auto max-h-80">
                {JSON.stringify(rows, null, 2)}
            </pre>
        </div>
    )
}