export function ModalBodyParagraphs({ paragraphs }) {
	return (
		<div className="space-y-3">
			{paragraphs.map((text, i) => (
				<p key={i} className="text-slate-300">
					{text}
				</p>
			))}
		</div>
	);
}
