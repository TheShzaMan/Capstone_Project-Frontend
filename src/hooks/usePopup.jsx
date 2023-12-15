import { useState } from "react";

const usePopup = () => {
	const [popupState, setPopupState] = useState("closed-form");

	const openPopup = () => {
		setPopupState("opened-form");
	};

	const closePopup = () => {
		setPopupState("closed-form");
	};

	return { popupState, openPopup, closePopup };
};

export default usePopup;
