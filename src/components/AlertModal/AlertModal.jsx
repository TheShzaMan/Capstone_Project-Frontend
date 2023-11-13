import "./AlertModal.css";

const AlertModal = (modal) => {
	return (
		<div className='modal-container'>
			<div className='modal-content'>
				<div className='modal-header'>{modal.header}</div>
				<div className='modal-body'>{modal.message}</div>
			</div>
		</div>
	);
};

export default AlertModal;
