import DbPreLoadUsers from "../../context/DbPreLoadData";
import registerUser from "../../context/AuthContext";

const DbEZLoadPage = () => {
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

	return (
		<div className='dbloader container'>
			<button type='button' onClick={loadUsers} disabled>
				PreLoad
			</button>
		</div>
	);
};

export default DbEZLoadPage;
