"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/common/shadcn-ui/chart"
import { WeeklyStabilityData } from "@/common/response/analytic"

export const description = "Stable Demand Chart"



const chartConfig = {
    stable: { label: "Stable Demand", color: "#4ade80" },   // hijau muda
    unstable: { label: "Unstable Demand", color: "#f59e0b" }, // kuning/orange
}

interface Props {
    data: WeeklyStabilityData[]
}

export function StableDemandChart({ data }: Props) {
    return (
        <ChartContainer className="h-full w-full" config={chartConfig}>
            <BarChart
                data={data}
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
