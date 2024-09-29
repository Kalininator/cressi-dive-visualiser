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
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";

export const description = "A linear line chart"


const chartConfig = {
	depth: {
		label: "Depth",
	},
} satisfies ChartConfig

const DiveGraph = ({ diveID }: { diveID: number }) => {
	const profilePoints = useLiveQuery(() => db.scubaProfilePoints.where({ ID_ScubaDive: diveID }).toArray());
	const chartData = (profilePoints || []).map(p => ({
		seconds: p.ElapsedSeconds,
		depth: p.Depth,
		temperature: p.Temperature,
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
