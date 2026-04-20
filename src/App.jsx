import { useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { Sidebar } from "./components/Sidebar.jsx";
import { MobileNav } from "./components/MobileNav.jsx";
import { useLiveDashboard } from "./hooks/useLiveDashboard.js";
import { OverviewPage } from "./pages/OverviewPage.jsx";
import { StudySpacesPage } from "./pages/StudySpacesPage.jsx";
import { EnergyPage } from "./pages/EnergyPage.jsx";
import { PredictionsPage } from "./pages/PredictionsPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";

export default function App() {
	const data = useLiveDashboard(3800);
	const [active, setActive] = useState("overview");

	const iotCounts = useMemo(() => {
		const online = data.iot.devices.filter(
			(d) => d.status === "online" || d.status === "degraded",
		).length;
		return { online, total: data.iot.devices.length };
	}, [data.iot.devices]);

	let page = null;
	switch (active) {
		case "overview":
			page = <OverviewPage data={data} />;
			break;
		case "spaces":
			page = <StudySpacesPage data={data} />;
			break;
		case "energy":
			page = <EnergyPage data={data} />;
			break;
		case "predictions":
			page = <PredictionsPage data={data} />;
			break;
		case "settings":
			page = <SettingsPage data={data} />;
			break;
		default:
			page = <OverviewPage data={data} />;
	}

	return (
		<div className="min-h-screen bg-slate-950 text-slate-200">
			<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.18),transparent)]" />
			<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(52,211,153,0.08),transparent)]" />

			<div className="relative flex min-h-screen flex-col lg:flex-row">
				<div className="hidden lg:block lg:w-64 lg:shrink-0" aria-hidden />
				<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:block lg:w-64">
					<Sidebar
						active={active}
						onNavigate={setActive}
						iotOnline={iotCounts.online}
						iotTotal={iotCounts.total}
					/>
				</div>

				<div className="flex min-w-0 flex-1 flex-col">
					<MobileNav active={active} onNavigate={setActive} />

					<header className="border-b border-emerald-500/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl lg:px-8">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<div className="flex items-center gap-3 lg:hidden">
								<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/30 shadow-[0_0_16px_rgba(52,211,153,0.2)]">
									<Radio className="h-4 w-4 text-emerald-300" strokeWidth={1.75} />
								</div>
								<div>
									<p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/90">
										SmartSpace NUL
									</p>
									<p className="text-sm font-medium text-slate-300">
										Campus intelligence
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
								</span>
								<span className="text-xs font-medium text-emerald-300/90">
									Live mesh
								</span>
								<span className="hidden text-xs text-slate-500 sm:inline">
									· demo telemetry
								</span>
							</div>
						</div>
					</header>

					<main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{page}</main>
				</div>
			</div>
		</div>
	);
}
