import "./AlertModal.css";

//\\//\\//  Add this displayModal function to any parent container of this Modal:
// const displayModal = () => {
// modalState === "modal-active"
// ? setModalState("modal-inactive")
// : setModalState("modal-active");
// };

const AlertModal = ({ header, message, setModalState, modalState }) => {
	const handleClickModal = () => {
		setModalState("modal-inactive");
	};
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
