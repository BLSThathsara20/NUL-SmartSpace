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
import { ModalBodyParagraphs } from "../components/ModalBodyParagraphs.jsx";
import { useDetailModal } from "../context/useDetailModal.js";

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

const PANEL_INTERACTIVE =
	"cursor-pointer rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-4 shadow-[0_0_28px_rgba(16,185,129,0.06)] transition-colors hover:border-emerald-400/30 hover:shadow-[0_0_32px_rgba(16,185,129,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/45";

function openPanel(e, openModal, config) {
	if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
	if (e.key === " ") e.preventDefault();
	openModal(config);
}

export function OverviewPage({ data }) {
	const { openModal } = useDetailModal();
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
					detail={{
						title: "Total study spaces on the mesh",
						paragraphs: [
							"This count is the number of rooms and zones enrolled in the SmartSpace optimisation loop—each one receives occupancy-aware HVAC and lighting schedules in the full product story.",
							"In this demo the value is fixed from JSON while other metrics drift to simulate live telemetry.",
						],
					}}
				/>
				<StatCard
					title="Available now"
					value={stats.spacesAvailableNow}
					hint="Below comfort occupancy target"
					icon={Users}
					detail={{
						title: "Spaces available right now",
						paragraphs: [
							"Represents rooms currently under a target occupancy threshold so students can still find seats without overcrowding.",
							"The number updates on a timer in the demo to mimic arrivals and departures across campus.",
						],
					}}
				/>
				<StatCard
					title="Energy saved today"
					value={`${stats.energySavedTodayKwh} kWh`}
					hint="Vs. baseline schedule"
					icon={Leaf}
					detail={{
						title: "Energy saved today (kWh)",
						paragraphs: [
							"Compares today’s measured consumption against a historical baseline schedule that ignores SmartSpace load shaping.",
							"Figures are illustrative; wiring real meters would replace the JSON seed and jitter logic.",
						],
					}}
				/>
				<StatCard
					title="Campus occupancy"
					value={`${stats.campusOccupancyPercent}%`}
					hint="Weighted by seat capacity"
					icon={Percent}
					detail={{
						title: "Campus-wide occupancy",
						paragraphs: [
							"A blended percentage: busier large rooms influence the headline more than tiny breakout pods.",
							"Use it as a pulse check before heading to the library or a computer lab during exam season.",
						],
					}}
				/>
			</div>

			<IotStrip devices={iot.devices} />

			<div className="grid gap-6 lg:grid-cols-5">
				<div
					role="button"
					tabIndex={0}
					className={`${PANEL_INTERACTIVE} lg:col-span-3`}
					onClick={(e) =>
						openPanel(e, openModal, {
							title: "Live occupancy by space",
							subtitle: "Bar chart",
							content: (
								<ModalBodyParagraphs
									paragraphs={[
										"Each bar is the share of seats or desks in use for a flagship location—Library, teaching rooms, quiet zones, labs, and group study.",
										"Hover the chart (desktop) for exact percentages. Values nudge over time in this demo to mimic streaming counts from desk sensors and gate counters.",
										"In production, colour thresholds could trigger soft nudges to quieter spaces on your mobile campus app.",
									]}
								/>
							),
						})
					}
					onKeyDown={(e) =>
						openPanel(e, openModal, {
							title: "Live occupancy by space",
							subtitle: "Bar chart",
							content: (
								<ModalBodyParagraphs
									paragraphs={[
										"Each bar is the share of seats or desks in use for a flagship location—Library, teaching rooms, quiet zones, labs, and group study.",
										"Hover the chart (desktop) for exact percentages. Values nudge over time in this demo to mimic streaming counts from desk sensors and gate counters.",
										"In production, colour thresholds could trigger soft nudges to quieter spaces on your mobile campus app.",
									]}
								/>
							),
						})
					}
				>
					<div className="mb-4 flex items-center justify-between gap-2">
						<h2 className="text-sm font-semibold text-slate-100">
							Live occupancy by space
						</h2>
						<span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400/90">
							Refreshed live · click for info
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

				<div
					role="button"
					tabIndex={0}
					className={`${PANEL_INTERACTIVE} lg:col-span-2`}
					onClick={(e) =>
						openPanel(e, openModal, {
							title: "Predicted peak hours",
							subtitle: "Line chart",
							content: (
								<ModalBodyParagraphs
									paragraphs={[
										"The line is a modelled campus load index: how intense study traffic is expected to be across the day.",
										"Facilities teams could align extra cleaning, desk resets, or pop-up quiet zones ahead of the lunch and afternoon spikes you see here.",
										"Demo data jitters slightly so the chart feels alive; a real deployment would pull from your forecasting service.",
									]}
								/>
							),
						})
					}
					onKeyDown={(e) =>
						openPanel(e, openModal, {
							title: "Predicted peak hours",
							subtitle: "Line chart",
							content: (
								<ModalBodyParagraphs
									paragraphs={[
										"The line is a modelled campus load index: how intense study traffic is expected to be across the day.",
										"Facilities teams could align extra cleaning, desk resets, or pop-up quiet zones ahead of the lunch and afternoon spikes you see here.",
										"Demo data jitters slightly so the chart feels alive; a real deployment would pull from your forecasting service.",
									]}
								/>
							),
						})
					}
				>
					<div className="mb-4">
						<h2 className="text-sm font-semibold text-slate-100">
							Predicted peak hours
						</h2>
						<p className="mt-0.5 text-xs text-slate-500">
							Modelled campus load index · click for info
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
