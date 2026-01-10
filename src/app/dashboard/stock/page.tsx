"use client"
import BannerInfoAdjust from "@/features/dashboard/view-stock/adjust/BannerInfoAdjust"
import CardCreateProduct from "@/features/dashboard/view-stock/adjust/CardCreateProduct"
import ProductCard from "@/features/dashboard/view-stock/adjust/ProductCard"
import StockSearchBar from "@/features/dashboard/view-stock/StockSearchBar"
import StockTable from "@/features/dashboard/view-stock/view/StockTable"
import ProductService from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import React from "react"

export default function ViewStockPage() {
  const [search, setSearch] = React.useState("")
  const [tab, setTab] = React.useState<"view" | "adjust">("view")

  const {data} = useQuery({
    queryKey: ["product-sold-stats"],
    queryFn: () => ProductService.getProductSoldStats(),
  })

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

      {/* Search */}
      <StockSearchBar tabs={tab} setTabs={(value) => setTab(value as "view" | "adjust")} search={search} setSearch={setSearch} />

      {/* Table View */}
      {tab === "adjust" ? (
        <div className="flex flex-col gap-4">
        <BannerInfoAdjust />
        <CardCreateProduct />
        {filteredStock.map((item, index) => (
          <ProductCard key={index} {...item}   />
        ))}
        </div>
      ) : (
        <StockTable items={filteredStock} />
      )}
    </div>
  )
}