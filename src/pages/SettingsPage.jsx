import { useState } from "react";
import { Bell, Clock, Leaf } from "lucide-react";

export function SettingsPage({ data }) {
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
					Control how the campus dashboard behaves (local preferences only).
				</p>
			</div>

			<div className="max-w-xl space-y-4">
				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-5 shadow-[0_0_24px_rgba(16,185,129,0.05)]">
					<div className="flex items-start justify-between gap-4">
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
							</div>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={eco}
							onClick={() => setEco((v) => !v)}
							className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${eco ? "bg-emerald-500/40 ring-2 ring-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.35)]" : "bg-slate-700 ring-1 ring-white/10"}`}
						>
							<span
								className={`absolute top-0.5 h-6 w-6 rounded-full bg-slate-100 shadow transition-transform ${eco ? "left-6" : "left-0.5"}`}
							/>
						</button>
					</div>
				</div>

				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-5 shadow-[0_0_24px_rgba(16,185,129,0.05)]">
					<div className="flex items-start justify-between gap-4">
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
							</div>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={notify}
							onClick={() => setNotify((v) => !v)}
							className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${notify ? "bg-emerald-500/40 ring-2 ring-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.35)]" : "bg-slate-700 ring-1 ring-white/10"}`}
						>
							<span
								className={`absolute top-0.5 h-6 w-6 rounded-full bg-slate-100 shadow transition-transform ${notify ? "left-6" : "left-0.5"}`}
							/>
						</button>
					</div>
				</div>

				<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-5 shadow-[0_0_24px_rgba(16,185,129,0.05)]">
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
							<input
								type="range"
								min={5}
								max={60}
								step={5}
								value={refresh}
								onChange={(e) => setRefresh(Number(e.target.value))}
								className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
							/>
							<p className="mt-2 text-xs text-slate-400">
								<span className="font-semibold text-emerald-300">{refresh}s</span>{" "}
								between telemetry batches
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
