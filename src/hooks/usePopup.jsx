import { useState } from "react";

const usePopup = () => {
	const [popupState, setPopupState] = useState("closed-form");

	const openPopup = () => {
		setPopupState("opened-form");
	};

	const closePopup = () => {
		setPopupState("closed-form");
	};

	const togglePopup = () => {
		popupState === "closed-form" ? openPopup() : closePopup();
	};

	return { popupState, openPopup, closePopup, togglePopup };
};

export default usePopup;
