import { useCallback, useMemo, useState } from "react";
import { Modal } from "../components/Modal.jsx";
import { DetailModalContext } from "./detailModalContext.js";

export function DetailModalProvider({ children }) {
	const [payload, setPayload] = useState(null);

	const closeModal = useCallback(() => setPayload(null), []);

	const openModal = useCallback((next) => {
		setPayload(next);
	}, []);

	const value = useMemo(
		() => ({ openModal, closeModal }),
		[openModal, closeModal],
	);

	return (
		<DetailModalContext.Provider value={value}>
			{children}
			<Modal
				isOpen={!!payload}
				onClose={closeModal}
				title={payload?.title ?? ""}
				subtitle={payload?.subtitle}
			>
				{payload?.content ?? null}
			</Modal>
		</DetailModalContext.Provider>
	);
}
