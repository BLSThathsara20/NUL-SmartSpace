import { useState } from "react";
import { Bell, Clock, Leaf } from "lucide-react";
import { ModalBodyParagraphs } from "../components/ModalBodyParagraphs.jsx";
import { useDetailModal } from "../context/useDetailModal.js";

export function SettingsPage({ data }) {
	const { openModal } = useDetailModal();
	const initial = data.settings;
	const [eco, setEco] = useState(initial.ecoModeDefault);
	const [notify, setNotify] = useState(initial.notifyHighOccupancy);
	const [refresh, setRefresh] = useState(initial.dataRefreshSeconds);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
					Settings
				</h1>
				<p className="mt-1 text-sm text-slate-400">
					Control how the campus dashboard behaves (local preferences only). Tap
					the text side of a card to read what each control would do in
					production; use the switches without opening the popup.
				</p>
			</div>

			<div className="max-w-xl space-y-4">
				<div className="flex rounded-2xl border border-emerald-500/15 bg-slate-900/50 shadow-[0_0_24px_rgba(16,185,129,0.05)] transition-colors hover:border-emerald-400/30">
					<button
						type="button"
						onClick={() =>
							openModal({
								title: "Eco-first defaults",
								subtitle: "Policy preset",
								content: (
									<ModalBodyParagraphs
										paragraphs={[
											"When enabled, SmartSpace would bias HVAC setpoints and lighting scenes toward savings whenever occupancy forecasts stay low.",
											"In this demo the toggle only lives in React state—it resets on refresh. Persist it with localStorage or your identity layer when you wire a backend.",
										]}
									/>
								),
							})
						}
						className="min-w-0 flex-1 p-5 text-left transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400/45"
					>
						<div className="flex gap-3">
							<div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/25">
								<Leaf className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
							</div>
							<div>
								<h2 className="text-sm font-semibold text-slate-100">
									Eco-first defaults
								</h2>
								<p className="mt-1 text-xs text-slate-500">
									Bias HVAC and lighting schedules toward savings when occupancy
									is low.
								</p>
								<p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-500/50">
									Click for details
								</p>
							</div>
						</div>
					</button>
					<div className="flex shrink-0 items-start p-5">
						<button
							type="button"
							role="switch"
							aria-checked={eco}
							onClick={() => setEco((v) => !v)}
							className={`relative h-7 w-12 rounded-full transition-colors ${eco ? "bg-emerald-500/40 ring-2 ring-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.35)]" : "bg-slate-700 ring-1 ring-white/10"}`}
						>
							<span
								className={`absolute top-0.5 h-6 w-6 rounded-full bg-slate-100 shadow transition-transform ${eco ? "left-6" : "left-0.5"}`}
							/>
						</button>
					</div>
				</div>

				<div className="flex rounded-2xl border border-emerald-500/15 bg-slate-900/50 shadow-[0_0_24px_rgba(16,185,129,0.05)] transition-colors hover:border-emerald-400/30">
					<button
						type="button"
						onClick={() =>
							openModal({
								title: "High occupancy alerts",
								subtitle: "Operations notifications",
								content: (
									<ModalBodyParagraphs
										paragraphs={[
											"Would push in-app or SMS alerts to student ambassadors and facilities when a zone crosses a comfort threshold for too long.",
											"Pair it with wayfinding hints so teams can open spill-over rooms before queues form at the library.",
										]}
									/>
								),
							})
						}
						className="min-w-0 flex-1 p-5 text-left transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400/45"
					>
						<div className="flex gap-3">
							<div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/25">
								<Bell className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
							</div>
							<div>
								<h2 className="text-sm font-semibold text-slate-100">
									High occupancy alerts
								</h2>
								<p className="mt-1 text-xs text-slate-500">
									Notify stewards when a zone crosses the comfort threshold.
								</p>
								<p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-500/50">
									Click for details
								</p>
							</div>
						</div>
					</button>
					<div className="flex shrink-0 items-start p-5">
						<button
							type="button"
							role="switch"
							aria-checked={notify}
							onClick={() => setNotify((v) => !v)}
							className={`relative h-7 w-12 rounded-full transition-colors ${notify ? "bg-emerald-500/40 ring-2 ring-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.35)]" : "bg-slate-700 ring-1 ring-white/10"}`}
						>
							<span
								className={`absolute top-0.5 h-6 w-6 rounded-full bg-slate-100 shadow transition-transform ${notify ? "left-6" : "left-0.5"}`}
							/>
						</button>
					</div>
				</div>

				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 shadow-[0_0_24px_rgba(16,185,129,0.05)] transition-colors hover:border-emerald-400/30">
					<button
						type="button"
						onClick={() =>
							openModal({
								title: "Telemetry refresh cadence",
								subtitle: "Gateway polling",
								content: (
									<ModalBodyParagraphs
										paragraphs={[
											"Controls how aggressively edge gateways would poll sensors and push updates to this dashboard.",
											"Shorter intervals feel more live but cost battery on wireless nodes; longer intervals suit stable overnight periods.",
											"In the shipped demo the live jitter interval is fixed in code—hook this slider to `useLiveDashboard` when you want them wired together.",
										]}
									/>
								),
							})
						}
						className="w-full p-5 text-left transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400/45"
					>
						<div className="flex gap-3">
							<div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/25">
								<Clock className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
							</div>
							<div className="min-w-0 flex-1">
								<h2 className="text-sm font-semibold text-slate-100">
									Target refresh interval
								</h2>
								<p className="mt-1 text-xs text-slate-500">
									How often the live mesh should poll edge gateways (demo slider).
								</p>
								<p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-500/50">
									Click for details
								</p>
							</div>
						</div>
					</button>
					<div className="border-t border-white/5 px-5 pb-5">
						<input
							type="range"
							min={5}
							max={60}
							step={5}
							value={refresh}
							onChange={(e) => setRefresh(Number(e.target.value))}
							className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
						/>
						<p className="mt-2 text-xs text-slate-400">
							<span className="font-semibold text-emerald-300">{refresh}s</span>{" "}
							between telemetry batches
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
