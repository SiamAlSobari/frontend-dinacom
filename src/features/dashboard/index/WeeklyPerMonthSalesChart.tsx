"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/common/shadcn-ui/chart"

export const description = "Weekly sales chart"

const chartData = [
  { week: 1, label: "Week 1", total_sold: 120 },
  { week: 2, label: "Week 2", total_sold: 98 },
  { week: 3, label: "Week 3", total_sold: 143 },
  { week: 4, label: "Week 4", total_sold: 60 },
  { week: 5, label: "Week 5", total_sold: 0 },
]

const chartConfig = {
  total_sold: {
    label: "Total Sold",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function WeeklyPerMonthSalesChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 10, left: 12, right: 12, bottom: 10 }}
      >
        <CartesianGrid vertical={false} />

        {/* 🔽 Ganti XAxis ke label (Week 1, Week 2, dst) */}
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <Line
          dataKey="total_sold"
          type="natural"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}
