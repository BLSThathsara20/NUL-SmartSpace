import { useEffect, useState } from "react";
import seed from "../data/dashboard.json";

function cloneSeed() {
	return JSON.parse(JSON.stringify(seed));
}

function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}

function jitter(n, delta) {
	return clamp(n + (Math.random() * 2 - 1) * delta, 0, 9999);
}

export function useLiveDashboard(intervalMs = 3500) {
	const [data, setData] = useState(cloneSeed);

	useEffect(() => {
		const tick = () => {
			setData((prev) => {
				const next = JSON.parse(JSON.stringify(prev));
				const occ = next.overview.stats.campusOccupancyPercent;
				next.overview.stats.campusOccupancyPercent = Math.round(
					clamp(jitter(occ, 2.5), 38, 88),
				);
				const avail = next.overview.stats.spacesAvailableNow;
				next.overview.stats.spacesAvailableNow = Math.round(
					clamp(jitter(avail, 1.2), 4, 16),
				);
				next.overview.stats.energySavedTodayKwh = Math.round(
					jitter(next.overview.stats.energySavedTodayKwh, 0.8) * 10,
				) / 10;

				next.overview.occupancyByRoom = next.overview.occupancyByRoom.map(
					(r) => ({
						...r,
						percent: Math.round(clamp(jitter(r.percent, 4), 5, 98)),
					}),
				);

				const peak = next.overview.peakHours.map((p) => ({
					...p,
					load: Math.round(clamp(jitter(p.load, 6), 8, 95)),
				}));
				next.overview.peakHours = peak;

				next.studySpaces.rooms = next.studySpaces.rooms.map((room) => {
					const cap = room.capacity;
					let occSeats = Math.round(
						clamp(jitter(room.occupied, 1.5), 0, cap),
					);
					if (Math.random() < 0.08) {
						occSeats = clamp(occSeats + (Math.random() < 0.5 ? -1 : 1), 0, cap);
					}
					return {
						...room,
						occupied: occSeats,
						tempC: Math.round(jitter(room.tempC, 0.15) * 10) / 10,
					};
				});

				next.iot.devices = next.iot.devices.map((d) => {
					let battery = d.battery;
					if (battery != null) {
						battery = Math.round(clamp(jitter(battery, 0.6), 8, 100));
					}
					return { ...d, battery };
				});

				return next;
			});
		};

		const id = setInterval(tick, intervalMs);
		return () => clearInterval(id);
	}, [intervalMs]);

	return data;
}
