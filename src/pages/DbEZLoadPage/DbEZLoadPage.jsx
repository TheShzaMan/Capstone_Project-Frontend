import DbPreLoadUsers from "../../context/DbPreLoadData";
import registerUser from "../../context/AuthContext";
import AlertModal from "../../components/AlertModal/AlertModal";
import { useState } from "react";

const DbEZLoadPage = () => {
	const [modalOn, setModalOn] = useState(false);
	const preLoadUsers = DbPreLoadUsers.map((user) => ({
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		password: "Qw12345^",
		email: user.email,
		phoneNumber: user.phoneNumber,
		isWorker: user.isWorker,
		availability: user.availability,
		payPerHour: user.wagePerHour,
		skillLevel: user.experience,
		businessDescription: user.businessDescription,
	}));

	const loadUsers = () => {
		preLoadUsers.map((user) => registerUser(user));
	};

	const handleClick = () => {
		setModalOn(!modalOn);
		const modalMessage = {
			header: "SUCCESS",
			message: "Your new modal componenet works!",
		};
		return modalMessage;
	};

	return (
		<div className='dbloader container'>
			<button type='button' onClick={loadUsers} disabled>
				PreLoad
			</button>
			<button type='button' onClick={handleClick}>
				Modal test
			</button>
			{modalOn === true && <AlertModal />}
		</div>
	);
};

export default DbEZLoadPage;
