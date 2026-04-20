import { Radio } from "lucide-react";
import { DASHBOARD_NAV } from "../navConfig.js";

export function Sidebar({ active, onNavigate, iotOnline, iotTotal }) {
	return (
		<aside className="flex w-full flex-col border-r border-emerald-500/15 bg-slate-950/80 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:shrink-0">
			<div className="flex items-center gap-3 border-b border-emerald-500/10 px-5 py-6">
				<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-emerald-600/20 shadow-[0_0_24px_rgba(52,211,153,0.35)] ring-1 ring-emerald-400/40">
					<Radio className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
				</div>
				<div>
					<p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">
						SmartSpace
					</p>
					<p className="text-lg font-semibold tracking-tight text-slate-100">
						NUL Campus
					</p>
				</div>
			</div>

			<nav className="flex flex-1 flex-col gap-1 p-3">
				{DASHBOARD_NAV.map((item) => {
					const isActive = active === item.id;
					const NavIcon = item.icon;
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => onNavigate(item.id)}
							className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
								isActive
									? "bg-emerald-500/15 text-emerald-100 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35)] shadow-[0_0_20px_rgba(16,185,129,0.12)]"
									: "text-slate-400 hover:bg-white/5 hover:text-slate-200"
							}`}
						>
							<NavIcon
								className={`h-5 w-5 shrink-0 ${isActive ? "text-emerald-300" : "text-slate-500 group-hover:text-slate-300"}`}
								strokeWidth={1.75}
							/>
							{item.label}
						</button>
					);
				})}
			</nav>

			<div className="mt-auto border-t border-emerald-500/10 p-4">
				<div className="rounded-xl bg-slate-900/80 px-3 py-3 ring-1 ring-emerald-500/20 shadow-[0_0_18px_rgba(16,185,129,0.08)]">
					<p className="text-xs font-medium text-slate-500">IoT mesh</p>
					<p className="mt-1 text-sm text-slate-200">
						<span className="font-semibold text-emerald-300">{iotOnline}</span>
						<span className="text-slate-500"> / {iotTotal} online</span>
					</p>
					<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
						<div
							className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.6)] transition-all duration-500"
							style={{
								width: `${Math.round((iotOnline / Math.max(iotTotal, 1)) * 100)}%`,
							}}
						/>
					</div>
				</div>
			</div>
		</aside>
	);
}
