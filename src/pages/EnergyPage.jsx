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
import { ModalBodyParagraphs } from "../components/ModalBodyParagraphs.jsx";
import { useDetailModal } from "../context/useDetailModal.js";

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

const PANEL =
	"cursor-pointer rounded-2xl border border-emerald-500/15 bg-slate-900/50 shadow-[0_0_24px_rgba(16,185,129,0.06)] transition-colors hover:border-emerald-400/30 hover:shadow-[0_0_28px_rgba(16,185,129,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/45";

function panelKeyOpen(e) {
	return e.type === "click" || e.key === "Enter" || e.key === " ";
}

export function EnergyPage({ data }) {
	const { openModal } = useDetailModal();
	const { dailySeries, co2SavedKg, breakdown } = data.energy;

	const lineModal = {
		title: "Seven-day energy usage",
		subtitle: "Actual vs baseline",
		content: (
			<ModalBodyParagraphs
				paragraphs={[
					"The emerald line is measured kWh after SmartSpace load shaping; the dashed grey line is the counterfactual baseline that ignores optimisation.",
					"Weekend days dip because fewer timetabled classes run—your campus profile might look different if labs stay open late.",
					"Hover points for exact numbers. This demo uses static JSON series; a live system would stream from your BMS or smart-meter API.",
				]}
			/>
		),
	};

	const co2Modal = {
		title: "CO₂ avoided",
		subtitle: "Sustainability ledger",
		content: (
			<ModalBodyParagraphs
				paragraphs={[
					`The headline figure (${co2SavedKg} kg in this snapshot) translates avoided grid electricity into an approximate emissions saving using a demo emissions factor.`,
					"Treat it as storytelling for stakeholders—real reporting would pin factors to your utility’s published mix and third-party audits.",
				]}
			/>
		),
	};

	const donutModal = {
		title: "Savings by system",
		subtitle: "Donut breakdown",
		content: (
			<div className="space-y-3">
				<ModalBodyParagraphs
					paragraphs={[
						"Each slice is the share of optimised energy attributed to HVAC, lighting, or other plug loads (AV, pumps, small power).",
						"Together the slices should sum to 100% of the curated savings story for this campus slice.",
					]}
				/>
				<ul className="list-inside list-disc text-xs text-slate-400">
					{breakdown.map((row) => (
						<li key={row.name}>
							<span className="text-slate-200">{row.name}</span>: {row.value}%
						</li>
					))}
				</ul>
			</div>
		),
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
					Energy monitor
				</h1>
				<p className="mt-1 text-sm text-slate-400">
					Seven-day actual draw vs. baseline without SmartSpace optimisation. Click
					any card or chart panel for context.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<div
					role="button"
					tabIndex={0}
					className={`${PANEL} p-5 lg:col-span-2`}
					onClick={(e) => {
						if (panelKeyOpen(e)) openModal(lineModal);
					}}
					onKeyDown={(e) => {
						if (e.key === " ") e.preventDefault();
						if (panelKeyOpen(e)) openModal(lineModal);
					}}
				>
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
							<span className="text-emerald-500/60">· click for info</span>
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
					<div
						role="button"
						tabIndex={0}
						className={`${PANEL} cursor-pointer p-5 text-left`}
						onClick={(e) => {
							if (panelKeyOpen(e)) openModal(co2Modal);
						}}
						onKeyDown={(e) => {
							if (e.key === " ") e.preventDefault();
							if (panelKeyOpen(e)) openModal(co2Modal);
						}}
					>
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
								<p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-500/50">
									Click for details
								</p>
							</div>
						</div>
					</div>

					<div
						role="button"
						tabIndex={0}
						className={`${PANEL} cursor-pointer p-4 text-left`}
						onClick={(e) => {
							if (panelKeyOpen(e)) openModal(donutModal);
						}}
						onKeyDown={(e) => {
							if (e.key === " ") e.preventDefault();
							if (panelKeyOpen(e)) openModal(donutModal);
						}}
					>
						<h2 className="mb-1 text-sm font-semibold text-slate-100">
							Savings by system
						</h2>
						<p className="mb-3 text-xs text-slate-500">
							Share of optimised energy by category · click for info
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
