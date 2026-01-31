"use client"

import React from 'react'
import { AlertCircle, CheckCircle, TriangleAlert, Sparkles, ArrowRight } from 'lucide-react'
import { Card } from '@/common/shadcn-ui/card'
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
import AiService from '@/services/AiService'
import toast from 'react-hot-toast'
import { AiRecommendations } from '@/common/response/ai'

export default function DashboardRootPage() {
  const [chartPeriod, setChartPeriod] = React.useState<'week' | 'month'>('week')
  const queryClient = useQueryClient()

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

  const { data: aiRunsData, isLoading } = useQuery({
    queryKey: ['ai_runs'],
    queryFn: () => AiService.aiRun(),
  })

  const { data: highRiskRecommendations, isLoading: isLoadingHighRisk } = useQuery({
    queryKey: ['ai_recommendations_high_risk'],
    queryFn: () => AiService.aiRecommendationsHighRisk(),
  })

  const { mutateAsync: runAiAnalysis, isPending: isRunningAi } = useMutation({
    mutationFn: ({ from, to }: { from: string; to: string }) =>
      AiService.runAiAnalysis(from, to),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai_runs'] })
      queryClient.invalidateQueries({ queryKey: ['ai_recommendations'] })
      queryClient.invalidateQueries({ queryKey: ['ai_recommendations_high_risk'] })
      queryClient.invalidateQueries({ queryKey: ['priority_actions'] })
    },
  })

  const topSellingData =
    chartPeriod === 'week'
      ? topSellingThisWeek?.data
      : topSellingThisMonth?.data

  const isTopSellingLoading =
    chartPeriod === 'week'
      ? isLoadingTopSellingThisMonth || isLoadingTopSellingThisWeek
      : !topSellingThisMonth

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

  function formatIndoTime(date: string | Date) {
    const d = new Date(date)
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(d)
  }

  const handleRunAiAnalysis = async () => {
    // Get today's date
    const today = new Date()
    const to = today.toISOString().split('T')[0] // Format: YYYY-MM-DD
    
    // Get date 10 days ago
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 10)
    const from = pastDate.toISOString().split('T')[0] // Format: YYYY-MM-DD

    toast.promise(
      runAiAnalysis({ from, to }),
      {
        loading: 'Running AI analysis...',
        success: () => {
          return `✅ AI analysis completed successfully!\nPeriod: ${from} to ${to}`;
        },
        error: (err) =>
          err?.response?.data?.message || 'Failed to run AI analysis ❌',
      }
    )
  }

  const getRecommendedQuantity = (rec: AiRecommendations) => {
    if (rec.recommended_action === 'RESTOCK') {
      return `${rec.quantity_min} - ${rec.quantity_max} ${rec.product?.unit || 'units'}`;
    }
    if (rec.recommended_action === 'REDUCE') {
      return `Reduce by ${rec.quantity_max} ${rec.product?.unit || 'units'}`;
    }
    return 'Maintain current stock';
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="mb-8">
        {!isLoading && !aiRunsData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-800">
                  AI belum pernah dijalankan
                </p>
                <p className="text-xs text-yellow-700">
                  Jalankan analisis AI untuk mendapatkan rekomendasi bisnis otomatis berdasarkan data 10 hari terakhir.
                </p>
              </div>
            </div>
            <Button
              onClick={handleRunAiAnalysis}
              disabled={isRunningAi}
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isRunningAi ? 'Running Analysis...' : 'Run AI Analysis Now'}
            </Button>
          </div>
        )}

        {aiRunsData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-800">
                  Rekomendasi AI Terbaru
                </p>
                <p className="text-xs text-green-700">
                  Terakhir diperbarui pada{' '}
                  <span className="font-medium">
                    {formatIndoTime(aiRunsData.generated_at)}
                  </span>
                  {' '}• Berdasarkan data 10 hari terakhir
                </p>
              </div>
            </div>
            <Button
              onClick={handleRunAiAnalysis}
              disabled={isRunningAi}
              variant="outline"
              className="w-full sm:w-auto border-green-300 text-green-700 hover:bg-green-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isRunningAi ? 'Running...' : 'Run New Analysis'}
            </Button>
          </div>
        )}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Peringatan Stok Risiko Tinggi</h2>
            <Link href="/dashboard/stock/recommendation">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Lihat Semua
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {isLoadingHighRisk ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !highRiskRecommendations || highRiskRecommendations.length === 0 ? (
            <Card className="p-8 text-center border border-gray-200">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">Tidak ada peringatan stok risiko tinggi</p>
              <p className="text-xs text-gray-500 mt-1">Semua produk dalam kondisi stok yang baik</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {highRiskRecommendations.map((rec: AiRecommendations) => (
                <div
                  key={rec.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="bg-red-600 rounded-full p-2 shrink-0">
                      <TriangleAlert className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {rec.product?.name || 'Unknown Product'}
                        </p>
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                          {rec.recommended_action}
                        </span>
                      </div>
                      <p className="text-xs text-red-700 mb-1">
                        {rec.reason_text}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-red-600">
                        <span>Stok saat ini: <strong>{rec.current_stock} {rec.product?.unit || 'units'}</strong></span>
                        <span>•</span>
                        <span>Rekomendasi: <strong>{getRecommendedQuantity(rec)}</strong></span>
                        {rec.days_until_stockout > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-semibold">Habis dalam {rec.days_until_stockout} hari</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/stock/recommendation">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium shrink-0"
                    >
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
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
