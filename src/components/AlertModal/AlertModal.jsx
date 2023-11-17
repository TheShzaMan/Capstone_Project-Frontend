import "./AlertModal.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const AlertModal = ({ header, message, handleClickModal }) => {
	// const navigate = useNavigate();

	// console.log(modalState);
	return (
		<div onClick={handleClickModal} className='modal-content'>
			<div className='modal-header'>{header}</div>
			<div className='modal-body'>{message}</div>
		</div>
	);
};

export default AlertModal;
