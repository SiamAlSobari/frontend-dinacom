"use client"

import { LineChart, Line, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/common/shadcn-ui/chart"

export const description = "Revenue per Week Chart"

const chartData = [
    { week: "Week 1", revenue: 50 },
    { week: "Week 2", revenue: 60 },
    { week: "Week 3", revenue: 40 },
    { week: "Week 4", revenue: 36 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function RevenueChart() {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Line
                    dataKey="revenue"
                    type="linear"
                    stroke="#3b82f6"  // biru
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    )
}
