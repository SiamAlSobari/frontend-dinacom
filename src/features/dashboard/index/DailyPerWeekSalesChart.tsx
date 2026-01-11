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
  { day: 0, day_name: "Sunday", total_sold: 10 },
  { day: 1, day_name: "Monday", total_sold: 0 },
  { day: 2, day_name: "Tuesday", total_sold: 17 },
  { day: 3, day_name: "Wednesday", total_sold: 3 },
  { day: 4, day_name: "Thursday", total_sold: 8 },
  { day: 5, day_name: "Friday", total_sold: 2 },
  { day: 6, day_name: "Saturday", total_sold: 0 },
]

const chartConfig = {
  total_sold: {
    label: "Total Sold",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function DailyPerWeekSalesChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 10, left: 12, right: 12, bottom: 10 }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="day_name"
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

