import { DASHBOARD_NAV } from "../navConfig.js";

export function MobileNav({ active, onNavigate }) {
	return (
		<div className="sticky top-0 z-30 border-b border-emerald-500/15 bg-slate-950/90 backdrop-blur-xl lg:hidden">
			<div className="flex gap-1 overflow-x-auto px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{DASHBOARD_NAV.map((item) => {
					const isActive = active === item.id;
					const NavIcon = item.icon;
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => onNavigate(item.id)}
							className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
								isActive
									? "bg-emerald-500/20 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/35"
									: "text-slate-400 hover:bg-white/5 hover:text-slate-200"
							}`}
						>
							<NavIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
							<span className="max-w-[120px] truncate">{item.label}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
