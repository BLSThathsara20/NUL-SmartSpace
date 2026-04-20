import { Info } from "lucide-react";
import { useDetailModal } from "../context/useDetailModal.js";
import { ModalBodyParagraphs } from "./ModalBodyParagraphs.jsx";

const HELP_SECTIONS = [
	{
		heading: "What SmartSpace NUL is",
		paragraphs: [
			"This dashboard is a front-end demo of an AI-assisted campus study-space optimisation story: it shows how occupancy, energy, forecasts, and IoT sensors could be surfaced in one place for facilities and students.",
			"All numbers come from local JSON seed data. A timer gently nudges values so the interface feels like a live telemetry mesh—there is no real API or database behind this build.",
		],
	},
	{
		heading: "What you can explore",
		paragraphs: [
			"Overview — headline KPIs, occupancy by major room, peak-hour curve, and a strip of mock IoT devices (air quality, presence, gateways).",
			"Study Spaces — searchable room cards with seat counts, temperature, lighting mode, and availability badges.",
			"Energy Monitor — seven-day actual vs baseline consumption, estimated CO₂ avoided, and a donut split across HVAC, lighting, and other loads.",
			"Predictions — a heatmap-style table of forecast demand by room and hour (green calmer, red busier).",
			"Settings — local-only toggles and a demo refresh slider; they do not persist unless you wire storage yourself.",
		],
	},
	{
		heading: "Card and panel details",
		paragraphs: [
			"Tap or click summary stat cards, room tiles, IoT rows, chart panels, and energy side cards to open a short explanation with context for that widget.",
			"Use the × control or click the dimmed backdrop—or press Escape—to close any popup.",
		],
	},
];

export function FloatingHelpButton() {
	const { openModal } = useDetailModal();

	return (
		<button
			type="button"
			onClick={() =>
				openModal({
					title: "About this dashboard",
					subtitle: "SmartSpace NUL — quick guide",
					content: (
						<div className="space-y-6">
							{HELP_SECTIONS.map((section) => (
								<section key={section.heading}>
									<h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
										{section.heading}
									</h3>
									<div className="mt-2">
										<ModalBodyParagraphs paragraphs={section.paragraphs} />
									</div>
								</section>
							))}
						</div>
					),
				})
			}
			className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 to-slate-900/90 text-emerald-100 shadow-[0_0_28px_rgba(52,211,153,0.45)] ring-2 ring-emerald-400/30 transition-transform hover:scale-105 hover:shadow-[0_0_36px_rgba(52,211,153,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40 active:scale-95"
			aria-label="Open dashboard help and explanations"
		>
			<Info className="h-7 w-7" strokeWidth={1.75} />
		</button>
	);
}
