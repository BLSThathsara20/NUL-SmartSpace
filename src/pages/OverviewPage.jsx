import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Building2, Leaf, Percent, Users } from "lucide-react";
import { StatCard } from "../components/StatCard.jsx";
import { IotStrip } from "../components/IotStrip.jsx";

const chartTooltip = {
	contentStyle: {
		backgroundColor: "rgba(15, 23, 42, 0.95)",
		border: "1px solid rgba(52, 211, 153, 0.25)",
		borderRadius: "12px",
		fontSize: "12px",
		color: "#e2e8f0",
	},
	labelStyle: { color: "#94a3b8" },
};

export function OverviewPage({ data }) {
	const { overview, iot } = data;
	const { stats, occupancyByRoom, peakHours } = overview;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
					Overview
				</h1>
				<p className="mt-1 text-sm text-slate-400">
					AI-assisted occupancy and sustainability signals across campus study
					spaces.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					title="Total spaces"
					value={stats.totalSpaces}
					hint="Rooms on the optimisation mesh"
					icon={Building2}
				/>
				<StatCard
					title="Available now"
					value={stats.spacesAvailableNow}
					hint="Below comfort occupancy target"
					icon={Users}
				/>
				<StatCard
					title="Energy saved today"
					value={`${stats.energySavedTodayKwh} kWh`}
					hint="Vs. baseline schedule"
					icon={Leaf}
				/>
				<StatCard
					title="Campus occupancy"
					value={`${stats.campusOccupancyPercent}%`}
					hint="Weighted by seat capacity"
					icon={Percent}
				/>
			</div>

			<IotStrip devices={iot.devices} />

			<div className="grid gap-6 lg:grid-cols-5">
				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-4 shadow-[0_0_28px_rgba(16,185,129,0.06)] lg:col-span-3">
					<div className="mb-4 flex items-center justify-between gap-2">
						<h2 className="text-sm font-semibold text-slate-100">
							Live occupancy by space
						</h2>
						<span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400/90">
							Refreshed live
						</span>
					</div>
					<div className="h-72 w-full min-w-0">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={occupancyByRoom}
								margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 6"
									stroke="rgba(148, 163, 184, 0.12)"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
									tickLine={false}
								/>
								<YAxis
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={false}
									tickLine={false}
									domain={[0, 100]}
									unit="%"
								/>
								<Tooltip {...chartTooltip} />
								<Bar
									dataKey="percent"
									name="Occupancy"
									radius={[8, 8, 4, 4]}
									fill="url(#barGrad)"
								/>
								<defs>
									<linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#34d399" stopOpacity={0.95} />
										<stop offset="100%" stopColor="#059669" stopOpacity={0.5} />
									</linearGradient>
								</defs>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-4 shadow-[0_0_28px_rgba(16,185,129,0.06)] lg:col-span-2">
					<div className="mb-4">
						<h2 className="text-sm font-semibold text-slate-100">
							Predicted peak hours
						</h2>
						<p className="mt-0.5 text-xs text-slate-500">
							Modelled campus load index
						</p>
					</div>
					<div className="h-72 w-full min-w-0">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={peakHours}
								margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 6"
									stroke="rgba(148, 163, 184, 0.12)"
									vertical={false}
								/>
								<XAxis
									dataKey="hour"
									tick={{ fill: "#94a3b8", fontSize: 10 }}
									axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
									tickLine={false}
								/>
								<YAxis
									tick={{ fill: "#94a3b8", fontSize: 10 }}
									axisLine={false}
									tickLine={false}
									domain={[0, 100]}
								/>
								<Tooltip {...chartTooltip} />
								<Line
									type="monotone"
									dataKey="load"
									name="Load"
									stroke="#34d399"
									strokeWidth={2.5}
									dot={{
										r: 3,
										strokeWidth: 2,
										stroke: "#022c22",
										fill: "#6ee7b7",
									}}
									activeDot={{ r: 5, fill: "#a7f3d0", stroke: "#059669" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
}
