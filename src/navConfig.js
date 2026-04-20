import {
	Activity,
	LayoutDashboard,
	Leaf,
	Settings,
	Zap,
} from "lucide-react";

export const DASHBOARD_NAV = [
	{ id: "overview", label: "Overview", icon: LayoutDashboard },
	{ id: "spaces", label: "Study Spaces", icon: Leaf },
	{ id: "energy", label: "Energy Monitor", icon: Zap },
	{ id: "predictions", label: "Predictions", icon: Activity },
	{ id: "settings", label: "Settings", icon: Settings },
];
