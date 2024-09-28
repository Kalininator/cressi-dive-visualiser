"use client"
import { DiveData } from "../parseFile";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
	Card,
	CardContent,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"


const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig

const DiveGraph = ({ diveData, diveID }: { diveData: DiveData, diveID: string }) => {
	const points = diveData.ScubaProfilePoint.filter(p => p.ID_ScubaDive === diveID);
	const chartData = points.map(p => ({
		seconds: Number.parseInt(p.ElapsedSeconds),
		depth: Number.parseFloat(p.Depth),
	}));
	return (
		<Card>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="seconds"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => Math.floor(value / 60) + "m"}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<YAxis

							tickLine={false}
							axisLine={false}
							dataKey="depth"
							reversed={true} />
						<Line
							dataKey="depth"
							type="linear"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
};

export default DiveGraph;
