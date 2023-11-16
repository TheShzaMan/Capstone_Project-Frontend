import "./AlertModal.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const AlertModal = ({ header, message, handleClick }) => {
	// const navigate = useNavigate();

	// console.log(modalState);
	return (
		<div onClick={handleClick} className='modal-content'>
			<div className='modal-header'>{header}</div>
			<div className='modal-body'>{message}</div>
		</div>
	);
};

export default AlertModal;
