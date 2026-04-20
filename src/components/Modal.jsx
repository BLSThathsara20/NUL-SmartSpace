import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, subtitle, children }) {
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
			role="presentation"
		>
			<button
				type="button"
				className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
				aria-label="Close dialog"
				onClick={onClose}
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				className="relative z-[101] w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-emerald-500/25 bg-slate-900/95 p-5 shadow-[0_0_48px_rgba(16,185,129,0.15)] ring-1 ring-white/10 sm:p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<h2
							id="modal-title"
							className="text-lg font-semibold tracking-tight text-slate-50"
						>
							{title}
						</h2>
						{subtitle ? (
							<p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-400/80">
								{subtitle}
							</p>
						) : null}
					</div>
					<button
						type="button"
						onClick={onClose}
						className="shrink-0 rounded-xl border border-white/10 bg-slate-950/80 p-2 text-slate-400 transition-colors hover:border-emerald-500/30 hover:text-emerald-200"
						aria-label="Close"
					>
						<X className="h-4 w-4" strokeWidth={1.75} />
					</button>
				</div>
				<div className="mt-4 text-sm leading-relaxed text-slate-300">
					{children}
				</div>
			</div>
		</div>
	);
}
