import "./AlertModal.css";

const AlertModal = ({ header, message, handleClickModal, modalState }) => {
	return (
		<div className={modalState}>
			<div onClick={handleClickModal} className='modal-content'>
				<div className='modal-header'>{header}</div>
				<div className='modal-body'>{message}</div>
			</div>
		</div>
	);
};

export default AlertModal;
