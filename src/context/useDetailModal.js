import { useContext } from "react";
import { DetailModalContext } from "./detailModalContext.js";

export function useDetailModal() {
	const ctx = useContext(DetailModalContext);
	if (!ctx) {
		throw new Error("useDetailModal must be used within DetailModalProvider");
	}
	return ctx;
}
