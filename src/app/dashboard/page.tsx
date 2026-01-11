"use client"

import React from 'react'
import { CheckCircle, TriangleAlert } from 'lucide-react'
import { Card } from '@/common/shadcn-ui/card'
import Link from "next/link"
import { useQuery } from '@tanstack/react-query'
import ProductService from '@/services/ProductService'
import DashboardNotFound from '@/features/dashboard/index/DashboardNotFound'
import { Button } from '@/common/shadcn-ui/button'
import { DailyPerWeekSalesChart } from '@/features/dashboard/index/DailyPerWeekSalesChart'
import { WeeklyPerMonthSalesChart } from '@/features/dashboard/index/WeeklyPerMonthSalesChart'
import ChartCard from '@/features/dashboard/index/ChartCard'

export default function DashboardRootPage() {
  const [chartPeriod, setChartPeriod] = React.useState<'week' | 'month'>('week')

  const { data: topSelling, isLoading } = useQuery({
    queryKey: ['top_selling_products_week'],
    queryFn: () => ProductService.getTopSellingProductsByPeriod('week'),
  })

  const stockAlerts = [
    { id: 1, product: "Dark Chocolate Bar 100g", stock: "Only 2 units left. Restock urgently", priority: "critical" },
    { id: 2, product: "Greek Yogurt 500g", stock: "Only 5 units left. High demand item", priority: "high" },
    { id: 3, product: "Whole Wheat Bread", stock: "Only 8 units left. Restock urgently", priority: "moderate" },
    { id: 4, product: "Almond Milk 1L", stock: "Below average stock level", priority: "low" }
  ]



  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700'
      case 'moderate':
      case 'low':
        return 'bg-amber-50 border-amber-200 text-amber-700'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 mt-4">
          <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-green-800">AI Recommendations Up to Date</p>
            <p className="text-xs text-green-700">Last run: 2 hours ago</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* CHART - LEBAR */}
        <ChartCard chartPeriod={chartPeriod} setChartPeriod={setChartPeriod} />

        {/* TOP PRODUCT - KECIL */}
        <Card className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">Top 5 Product</h3>
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : !topSelling?.data || topSelling.data.length === 0 ? (
            <DashboardNotFound variant="product" />
          ) : (
            <div className="space-y-4">
              {topSelling.data.map((product) => (
                <div key={product.rank}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{product.rank}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {product.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.total_sold} sold
                      </p>
                    </div>
                  </div>
                  {product.rank < 5 && (
                    <div className="mt-3 ml-5 border-b border-pink-400"></div>
                  )}
                </div>
              ))}
            </div>
          )}

        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* STOCK ALERT - LEBAR */}
        <div className="lg:col-span-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Stock Alerts</h2>
          <div className="space-y-3">
            {stockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${getPriorityColor(alert.priority)}`}
              >
                <div className="flex items-center gap-3">
                  <TriangleAlert />
                  <div>
                    <p className="font-semibold text-sm">{alert.product}</p>
                    <p className="text-xs">{alert.stock}</p>
                  </div>
                </div>
                <button className={`${getPriorityColor(alert.priority)} px-3 py-1 rounded text-sm font-medium`}>
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY - KECIL */}
        <Card className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
