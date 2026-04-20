import { useDetailModal } from "../context/useDetailModal.js";
import { ModalBodyParagraphs } from "./ModalBodyParagraphs.jsx";

export function StatCard({ title, value, hint, icon: Icon, detail }) {
	const { openModal } = useDetailModal();
	const hasDetail =
		detail &&
		typeof detail.title === "string" &&
		Array.isArray(detail.paragraphs) &&
		detail.paragraphs.length > 0;

	const open = () => {
		if (!hasDetail) return;
		openModal({
			title: detail.title,
			subtitle: title,
			content: <ModalBodyParagraphs paragraphs={detail.paragraphs} />,
		});
	};

	const inner = (
		<>
			<div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
			<div className="relative flex items-start justify-between gap-3">
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
						{title}
					</p>
					<p className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 tabular-nums">
						{value}
					</p>
					{hint ? (
						<p className="mt-1 text-xs text-slate-500">{hint}</p>
					) : null}
					{hasDetail ? (
						<p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-500/50 group-hover:text-emerald-400/80">
							Click for details
						</p>
					) : null}
				</div>
				{Icon ? (
					<div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/25 shadow-[0_0_16px_rgba(52,211,153,0.15)]">
						<Icon className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
					</div>
				) : null}
			</div>
		</>
	);

	const baseClass =
		"group relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-slate-900/60 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.6)] transition-all duration-300 hover:border-emerald-400/30 hover:shadow-[0_0_32px_rgba(16,185,129,0.12)]";

	if (hasDetail) {
		return (
			<button
				type="button"
				onClick={open}
				className={`${baseClass} w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
			>
				{inner}
			</button>
		);
	}

	return <div className={baseClass}>{inner}</div>;
}
