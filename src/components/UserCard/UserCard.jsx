import "./UserCard.css";
import React from "react";

const UserCard = (singleUser) => {
	console.log(singleUser.singleUser.user);
	const user = singleUser.singleUser.user;
	const review = singleUser.singleUser;

	return (
		<div className='user card'>
			{user.isWorker ? (
				<div className='card-info'>
					<div className='name cardline'>{`${user.firstName} ${user.lastName}`}</div>
					<div className='hr'></div>
					<div className='cardline'>{`@${user.userName}`}</div>
					{user.phoneNumber && (
						<div className='cardline'>
							Contact: {user.phoneNumber}
						</div>
					)}{" "}
					{user.email && (
						<div className='cardline'>Email: {user.email}</div>
					)}
					<div className='cardline'>
						Availability: {user.availability}
					</div>
					<div className='cardline'>
						Rate per hour:{" $"}
						{user.wagePerHour}
					</div>
					<div className='cardline'>
						Skill Level: {user.skillLevel}
					</div>
				</div>
			) : (
				<div className='not-worker-card'></div>
			)}
		</div>
	);
};

export default UserCard;
