import { useMemo, useState } from "react";
import { Lightbulb, Search, Thermometer } from "lucide-react";
import { ModalBodyParagraphs } from "../components/ModalBodyParagraphs.jsx";
import { useDetailModal } from "../context/useDetailModal.js";

function roomStatus(occupied, capacity) {
	const ratio = occupied / Math.max(capacity, 1);
	if (occupied >= capacity) return { label: "Full", className: "bg-red-500/20 text-red-200 ring-red-500/40" };
	if (ratio >= 0.5)
		return { label: "Busy", className: "bg-amber-500/15 text-amber-100 ring-amber-500/35" };
	return { label: "Available", className: "bg-emerald-500/15 text-emerald-100 ring-emerald-500/35" };
}

export function StudySpacesPage({ data }) {
	const { openModal } = useDetailModal();
	const rooms = data.studySpaces.rooms;
	const [query, setQuery] = useState("");
	const [availability, setAvailability] = useState("all");
	const [roomType, setRoomType] = useState("all");

	const types = useMemo(() => {
		const s = new Set(rooms.map((r) => r.type));
		return ["all", ...Array.from(s)];
	}, [rooms]);

	const filtered = useMemo(() => {
		return rooms.filter((r) => {
			const q = query.trim().toLowerCase();
			if (q && !r.name.toLowerCase().includes(q) && !r.type.toLowerCase().includes(q))
				return false;
			if (roomType !== "all" && r.type !== roomType) return false;
			const ratio = r.occupied / Math.max(r.capacity, 1);
			if (availability === "available" && ratio >= 0.5) return false;
			if (availability === "busy" && (ratio < 0.5 || r.occupied >= r.capacity))
				return false;
			if (availability === "full" && r.occupied < r.capacity) return false;
			return true;
		});
	}, [rooms, query, availability, roomType]);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
					Study spaces
				</h1>
				<p className="mt-1 text-sm text-slate-400">
					Room telemetry from seats, climate, and lighting controllers. Click a
					card for full room context.
				</p>
			</div>

			<div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/15 bg-slate-900/50 p-4 shadow-[0_0_24px_rgba(16,185,129,0.05)] sm:flex-row sm:flex-wrap sm:items-center">
				<div className="relative min-w-[200px] flex-1">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search name or type…"
						className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 ring-0 outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
					/>
				</div>
				<div className="flex flex-wrap gap-2">
					<select
						value={availability}
						onChange={(e) => setAvailability(e.target.value)}
						className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-200 focus:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
					>
						<option value="all">All availability</option>
						<option value="available">Available</option>
						<option value="busy">Busy</option>
						<option value="full">Full</option>
					</select>
					<select
						value={roomType}
						onChange={(e) => setRoomType(e.target.value)}
						className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-200 focus:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
					>
						{types.map((t) => (
							<option key={t} value={t}>
								{t === "all" ? "All room types" : t}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{filtered.map((room) => {
					const status = roomStatus(room.occupied, room.capacity);
					const ratioPct = Math.round(
						(100 * room.occupied) / Math.max(room.capacity, 1),
					);
					return (
						<button
							key={room.id}
							type="button"
							onClick={() =>
								openModal({
									title: room.name,
									subtitle: `${room.type} · ${room.id}`,
									content: (
										<div className="space-y-4 text-slate-300">
											<dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs">
												<dt className="text-slate-500">Status</dt>
												<dd className="font-medium text-slate-100">
													{status.label}
												</dd>
												<dt className="text-slate-500">Occupancy</dt>
												<dd className="tabular-nums">
													{room.occupied} / {room.capacity} seats ({ratioPct}%)
												</dd>
												<dt className="text-slate-500">Temperature</dt>
												<dd className="tabular-nums">{room.tempC}°C</dd>
												<dt className="text-slate-500">Lighting</dt>
												<dd>{room.lighting}</dd>
												<dt className="text-slate-500">HVAC zone</dt>
												<dd>{room.hvacZone}</dd>
											</dl>
											<ModalBodyParagraphs
												paragraphs={[
													"This card aggregates mock desk counts, climate probes, and lighting scenes for the room. In a full deployment, bookings and card-swipe data could enrich the story.",
													"Use the filters above to slice by availability or room type; the modal always reflects the latest simulated values on the card.",
												]}
											/>
										</div>
									),
								})
							}
							className="group relative w-full overflow-hidden rounded-2xl border border-emerald-500/12 bg-slate-900/55 p-5 text-left shadow-[0_0_0_1px_rgba(15,23,42,0.5)] transition-all duration-300 hover:border-emerald-400/25 hover:shadow-[0_0_28px_rgba(16,185,129,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/45"
						>
							<div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl opacity-70 transition-opacity group-hover:opacity-100" />
							<div className="relative flex items-start justify-between gap-2">
								<div>
									<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
										{room.type}
									</p>
									<h2 className="mt-1 text-lg font-semibold text-slate-50">
										{room.name}
									</h2>
								</div>
								<span
									className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${status.className}`}
								>
									{status.label}
								</span>
							</div>
							<p className="relative mt-4 text-2xl font-semibold tabular-nums text-slate-100">
								{room.occupied}
								<span className="text-lg font-normal text-slate-500">
									{" "}
									/ {room.capacity}
								</span>
								<span className="ml-2 text-xs font-medium text-slate-500">
									seats
								</span>
							</p>
							<div className="relative mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
								<span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/60 px-2 py-1 ring-1 ring-white/5">
									<Thermometer
										className="h-3.5 w-3.5 text-emerald-400"
										strokeWidth={1.75}
									/>
									{room.tempC}°C
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/60 px-2 py-1 ring-1 ring-white/5">
									<Lightbulb
										className="h-3.5 w-3.5 text-amber-300/90"
										strokeWidth={1.75}
									/>
									{room.lighting}
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/60 px-2 py-1 ring-1 ring-white/5">
									HVAC {room.hvacZone}
								</span>
							</div>
							<p className="relative mt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-500/50 group-hover:text-emerald-400/80">
								Click for full details
							</p>
						</button>
					);
				})}
			</div>

			{filtered.length === 0 ? (
				<p className="text-center text-sm text-slate-500">
					No rooms match your filters.
				</p>
			) : null}
		</div>
	);
}
