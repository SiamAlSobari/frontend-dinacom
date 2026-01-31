"use client"

import { LineChart, Line, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/common/shadcn-ui/chart"
import { RevenueTrend } from "@/common/response/analytic"

export const description = "Revenue per Week Chart"



const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

interface Props {
    data: RevenueTrend[]
}

export function RevenueChart({ data }: Props) {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                data={data}
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
