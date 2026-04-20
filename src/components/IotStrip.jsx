import { Battery, Cpu, Wifi } from "lucide-react";

export function IotStrip({ devices }) {
	return (
		<div className="rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-4 shadow-[0_0_24px_rgba(16,185,129,0.06)]">
			<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<Cpu className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
					<h3 className="text-sm font-semibold text-slate-100">
						Campus IoT devices
					</h3>
				</div>
				<span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-500/30">
					Live stream
				</span>
			</div>
			<div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
				{devices.map((d) => {
					const online = d.status === "online";
					const degraded = d.status === "degraded";
					return (
						<div
							key={d.id}
							className="flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-slate-950/60 px-3 py-2.5 ring-1 ring-white/5"
						>
							<div className="min-w-0 flex-1">
								<p className="truncate text-xs font-medium text-slate-200">
									{d.label}
								</p>
								<p className="truncate text-[10px] text-slate-500">{d.type}</p>
							</div>
							<div className="flex shrink-0 items-center gap-2">
								{d.battery != null ? (
									<span className="flex items-center gap-0.5 text-[10px] text-slate-400 tabular-nums">
										<Battery className="h-3 w-3 text-emerald-400/80" />
										{d.battery}%
									</span>
								) : (
									<Wifi className="h-3.5 w-3.5 text-slate-500" />
								)}
								<span
									className={`relative flex h-2.5 w-2.5 rounded-full ${
										online
											? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
											: degraded
												? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
												: "bg-slate-600"
									}`}
								>
									{online ? (
										<span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
									) : null}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
