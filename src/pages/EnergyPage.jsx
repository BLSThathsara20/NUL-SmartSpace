import {
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { CloudOff, Leaf } from "lucide-react";

const DONUT_COLORS = ["#34d399", "#10b981", "#047857"];

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

export function EnergyPage({ data }) {
	const { dailySeries, co2SavedKg, breakdown } = data.energy;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
					Energy monitor
				</h1>
				<p className="mt-1 text-sm text-slate-400">
					Seven-day actual draw vs. baseline without SmartSpace optimisation.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-5 shadow-[0_0_24px_rgba(16,185,129,0.06)] lg:col-span-2">
					<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
						<h2 className="text-sm font-semibold text-slate-100">
							Usage (kWh) — last 7 days
						</h2>
						<div className="flex flex-wrap gap-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">
							<span className="inline-flex items-center gap-1.5 text-emerald-300/90">
								<span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
								Actual
							</span>
							<span className="inline-flex items-center gap-1.5 text-slate-400">
								<span className="h-2 w-2 rounded-full bg-slate-500" />
								Baseline
							</span>
						</div>
					</div>
					<div className="h-80 w-full min-w-0">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={dailySeries}
								margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 6"
									stroke="rgba(148, 163, 184, 0.12)"
									vertical={false}
								/>
								<XAxis
									dataKey="day"
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
									tickLine={false}
								/>
								<YAxis
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={false}
									tickLine={false}
								/>
								<Tooltip {...chartTooltip} />
								<Legend
									wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
								/>
								<Line
									type="monotone"
									dataKey="actual"
									name="Actual"
									stroke="#34d399"
									strokeWidth={2.5}
									dot={{ r: 3, fill: "#6ee7b7", stroke: "#022c22" }}
								/>
								<Line
									type="monotone"
									dataKey="baseline"
									name="Baseline"
									stroke="#64748b"
									strokeDasharray="6 4"
									strokeWidth={2}
									dot={{ r: 2, fill: "#94a3b8" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="space-y-4">
					<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-5 shadow-[0_0_24px_rgba(16,185,129,0.08)]">
						<div className="flex items-start gap-3">
							<div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/25">
								<CloudOff className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
							</div>
							<div>
								<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
									CO₂ avoided (period)
								</p>
								<p className="mt-1 text-3xl font-semibold tabular-nums text-slate-50">
									{co2SavedKg}
									<span className="text-base font-normal text-slate-500">
										{" "}
										kg
									</span>
								</p>
								<p className="mt-1 flex items-center gap-1 text-xs text-emerald-400/90">
									<Leaf className="h-3.5 w-3.5" />
									Sustainability ledger (demo)
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-4 shadow-[0_0_24px_rgba(16,185,129,0.06)]">
						<h2 className="mb-1 text-sm font-semibold text-slate-100">
							Savings by system
						</h2>
						<p className="mb-3 text-xs text-slate-500">
							Share of optimised energy by category
						</p>
						<div className="h-56 w-full min-w-0">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={breakdown}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={52}
										outerRadius={76}
										paddingAngle={3}
										stroke="rgba(15,23,42,0.9)"
										strokeWidth={2}
									>
										{breakdown.map((_, i) => (
											<Cell
												key={`c-${i}`}
												fill={DONUT_COLORS[i % DONUT_COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip {...chartTooltip} />
									<Legend
										verticalAlign="bottom"
										height={28}
										wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
