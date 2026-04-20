function cellClass(value) {
	if (value < 30)
		return "bg-emerald-500/25 text-emerald-50 border-emerald-500/30";
	if (value < 55)
		return "bg-lime-500/20 text-lime-50 border-lime-500/25";
	if (value < 75)
		return "bg-amber-500/25 text-amber-50 border-amber-500/35";
	return "bg-red-500/30 text-red-50 border-red-500/40";
}

export function PredictionsPage({ data }) {
	const { rooms, hours, matrix } = data.predictions;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
					Predictions
				</h1>
				<p className="mt-1 text-sm text-slate-400">
					Hourly demand forecast by room — green is quiet, red is high demand.
				</p>
			</div>

			<div className="overflow-x-auto rounded-2xl border border-emerald-500/15 bg-slate-900/50 shadow-[0_0_28px_rgba(16,185,129,0.06)]">
				<table className="w-full min-w-[640px] border-collapse text-sm">
					<thead>
						<tr className="border-b border-white/10 bg-slate-950/80">
							<th className="sticky left-0 z-10 bg-slate-950/95 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 backdrop-blur">
								Room
							</th>
							{hours.map((h) => (
								<th
									key={h}
									className="px-1.5 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500"
								>
									{h}:00
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rooms.map((room, ri) => (
							<tr
								key={room}
								className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
							>
								<td className="sticky left-0 z-10 bg-slate-900/95 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur">
									{room}
								</td>
								{matrix[ri].map((value, hi) => (
									<td key={`${ri}-${hi}`} className="p-1">
										<div
											className={`rounded-lg border px-1 py-2 text-center text-[11px] font-semibold tabular-nums ring-1 ring-black/20 ${cellClass(value)}`}
										>
											{value}
										</div>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
				<span className="font-medium text-slate-400">Legend</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="h-3 w-6 rounded bg-emerald-500/35 ring-1 ring-emerald-500/40" />
					Low
				</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="h-3 w-6 rounded bg-lime-500/30 ring-1 ring-lime-500/35" />
					Moderate
				</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="h-3 w-6 rounded bg-amber-500/35 ring-1 ring-amber-500/40" />
					Busy
				</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="h-3 w-6 rounded bg-red-500/40 ring-1 ring-red-500/45" />
					High
				</span>
			</div>
		</div>
	);
}
