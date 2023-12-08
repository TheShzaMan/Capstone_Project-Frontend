import { useState } from "react";

const useModal = () => {
	const [modalState, setModalState] = useState("modal-inactive");

	const openModal = () => {
		setModalState("modal-active");
	};

	const closeModal = () => {
		setModalState("modal-inactive");
	};

	return { modalState, openModal, closeModal };
};

export default useModal;
