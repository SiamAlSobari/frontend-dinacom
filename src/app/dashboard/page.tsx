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
import AnalyticService from '@/services/AnalyticService'
import ActivityService from '@/services/ActivityService'
import RecentActivityNotFound from '@/features/dashboard/index/RecentActivityNotFound'
import { timeAgo } from '@/common/libs/date'

export default function DashboardRootPage() {
  const [chartPeriod, setChartPeriod] = React.useState<'week' | 'month'>('week')

  const { data: topSellingThisWeek, isLoading: isLoadingTopSellingThisWeek } = useQuery({
    queryKey: ['top_selling_products_this_week'],
    queryFn: () => AnalyticService.getTopSellingProductsThisWeek(),
  })

  const { data: topSellingThisMonth, isLoading: isLoadingTopSellingThisMonth } = useQuery({
    queryKey: ['top_selling_products_this_month'],
    queryFn: () => AnalyticService.getTopSellingProductsThisMonth(),
  })

  const { data: dailyPerWeekSales } = useQuery({
    queryKey: ['dainly_week_sales_chart'],
    queryFn: () => AnalyticService.getDailyPerWeeklySales(),
  })

  const { data: weeklyPerMonthSales } = useQuery({
    queryKey: ['weekly_per_month_sales_chart'],
    queryFn: () => AnalyticService.getWeeklyPerMonthSales(),
  })

  const { data: recentActivities } = useQuery({
    queryKey: ['recent_activities'],
    queryFn: () => ActivityService.getActivities(),
  })

  const topSellingData =
    chartPeriod === 'week'
      ? topSellingThisWeek?.data
      : topSellingThisMonth?.data

  const isTopSellingLoading =
    chartPeriod === 'week'
      ? isLoadingTopSellingThisMonth || isLoadingTopSellingThisWeek
      : !topSellingThisMonth


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

  const getActivityColor = (activity_type: string) => {
    switch (activity_type) {
      case "TRANSACTION_SALE":
        return "bg-red-500"

      case "TRANSACTION_PURCHASE":
        return "bg-green-500"

      case "STOCK_ADJUSTMENT":
        return "bg-yellow-500"

      case "CREATE_PRODUCT":
        return "bg-blue-500"

      case "UPDATE_PRODUCT":
        return "bg-purple-500"

      default:
        return "bg-gray-400"
    }
  }


  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 mt-4">
          <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-green-800">Rekomendasi AI Terbaru</p>
            <p className="text-xs text-green-700">Terakhir diperbarui 1 jam yang lalu</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* CHART - LEBAR */}
        <ChartCard dailyPerWeekSales={dailyPerWeekSales?.data ?? []} weeklyPerMonthSales={weeklyPerMonthSales?.data ?? []} chartPeriod={chartPeriod} setChartPeriod={setChartPeriod} />

        {/* TOP PRODUCT - KECIL */}
        <Card className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">
            Top 5 Terlaris ({chartPeriod === 'week' ? 'Minggu Ini' : 'Bulan Ini'})
          </h3>

          {isTopSellingLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : !topSellingData || topSellingData.length === 0 ? (
            <DashboardNotFound variant="product" />
          ) : (
            <div className="space-y-4">
              {topSellingData.map((product, i) => (
                <div key={product.product_id}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {product.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.total_sold} terjual
                      </p>
                    </div>
                  </div>

                  {i < 4 && (
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
          <h2 className="text-base font-semibold text-gray-900 mb-4">Peringatan Stok</h2>
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
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recentActivities && recentActivities.length === 0 ? (
              <RecentActivityNotFound />
            ) : (
              <div className="space-y-4">
                {recentActivities?.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">

                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 
        ${getActivityColor(activity.activity_type)}`}
                    />

                    <div className="flex-1">
                      <p className="text-sm text-gray-800 leading-snug">
                        {activity.activity_text}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {timeAgo(activity.created_at)}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            )}


          </div>
        </Card>
      </div>
    </div>
  )
}
