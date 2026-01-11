"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/common/shadcn-ui/chart"
import { DailyPerWeeklySales } from "@/common/response/analytic"

export const description = "Weekly sales chart"


const chartConfig = {
  total_sold: {
    label: "Total Sold",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


interface Props{
    data: DailyPerWeeklySales[]
}

export function DailyPerWeekSalesChart({data}:Props) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={data}
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

