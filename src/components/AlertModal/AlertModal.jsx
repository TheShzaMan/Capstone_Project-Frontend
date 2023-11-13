import "./AlertModal.css";
import { useState } from "react";
const AlertModal = ({ header, message }) => {
	const [modalState, setModalState] = useState("modal-active");
	const handleClick = () => {
		setModalState("modal-inactive");
	};
	return (
		<div onClick={handleClick} className={modalState}>
			<div className='modal-content'>
				<div className='modal-header'>{header}</div>
				<div className='modal-body'>{message}</div>
			</div>
		</div>
	);
};

export default AlertModal;
