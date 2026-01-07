"use client"
import StockSearchBar from "@/features/dashboard/view-stock/StockSearchBar"
import StockTable from "@/features/dashboard/view-stock/StockTable"
import { ArrowLeft } from "lucide-react"
import React from "react"

export default function ViewStockPage() {
  const [search, setSearch] = React.useState("")
  const [tab, setTab] = React.useState<"view" | "adjust">("view")

  const stockItems = [
    { name: "Product A", stock_in: 5, stock_out: 3, status: "Critical", day_left: 10, caregory: "Category 1", image: "saas.png" },
    { name: "Product A", stock_in: 15, stock_out: 3, status: "Low", day_left: 10, caregory: "Category 1", image: "saas.png" },
    { name: "Product A", stock_in: 26, stock_out: 3, status: "Good", day_left: 10, caregory: "Category 1", image: "saas.png" },
    { name: "Product A", stock_in: 60, stock_out: 3, status: "High", day_left: 10, caregory: "Category 1", image: "saas.png" },
  ]

  const filteredStock = stockItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.caregory.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <button>
          <ArrowLeft className="text-gray-600" size={24} />
        </button>
        <div className="flex flex-col">
          <div className="text-black text-xl font-normal leading-6">
            Stock Management
          </div>
          <div className="text-neutral-600 text-sm font-normal leading-6">
            100+ products in stock
          </div>
        </div>
      </div>

      {/* Search */}
      <StockSearchBar tabs={tab} setTabs={(value) => setTab(value as "view" | "adjust")} search={search} setSearch={setSearch} />

      {/* Table */}
      <StockTable items={filteredStock} />
    </div>
  )
}