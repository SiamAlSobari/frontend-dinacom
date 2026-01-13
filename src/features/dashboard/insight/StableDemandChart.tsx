"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/common/shadcn-ui/chart"

export const description = "Stable Demand Chart"

const chartData = [
    { week: "Week 1", stable: 120, unstable: 40 },
    { week: "Week 2", stable: 150, unstable: 60 },
    { week: "Week 3", stable: 130, unstable: 70 },
]

const chartConfig = {
    stable: { label: "Stable Demand", color: "#4ade80" },   // hijau muda
    unstable: { label: "Unstable Demand", color: "#f59e0b" }, // kuning/orange
}

export function StableDemandChart() {
    return (
        <ChartContainer className="h-full w-full" config={chartConfig}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barGap={10}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Legend verticalAlign="top" height={36} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="unstable" fill={chartConfig.unstable.color} radius={[4, 4, 0, 0]} />
                <Bar dataKey="stable" fill={chartConfig.stable.color} radius={[4, 4, 0, 0]} />

            </BarChart>
        </ChartContainer>
    )
}
