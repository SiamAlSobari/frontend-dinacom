"use client"
import React from 'react'
import { Card } from '@/common/shadcn-ui/card'
import { Button } from '@/common/shadcn-ui/button'
import { DailyPerWeekSalesChart } from '@/features/dashboard/index/DailyPerWeekSalesChart'
import { WeeklyPerMonthSalesChart } from '@/features/dashboard/index/WeeklyPerMonthSalesChart'

interface ChartCardProps {
    chartPeriod: 'week' | 'month'
    setChartPeriod: (period: 'week' | 'month') => void
}


export default function ChartCard({ chartPeriod, setChartPeriod }: ChartCardProps) {
    return (
        <Card className="lg:col-span-8 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-end gap-2">
                <Button
                    variant={chartPeriod === "week" ? "default" : "outline"}
                    className={
                        chartPeriod === "week"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    }
                    onClick={() => setChartPeriod("week")}
                >
                    Week
                </Button>

                <Button
                    variant={chartPeriod === "month" ? "default" : "outline"}
                    className={
                        chartPeriod === "month"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    }
                    onClick={() => setChartPeriod("month")}
                >
                    Month
                </Button>
            </div>

            {/* TINGGI CHART */}
            <div className="h-80">
                {chartPeriod === "week" ? <DailyPerWeekSalesChart /> : <WeeklyPerMonthSalesChart />}
            </div>
        </Card>
    )
}
