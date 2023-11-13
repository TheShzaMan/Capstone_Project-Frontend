import React from "react";

const UserCard = (singleUser) => {
	// console.log(singleUser.singleUser);
	const user = singleUser.singleUser.user;
	console.log({ user });
	return (
		<div className='card'>
			{user.isWorker ? (
				<div className='card-info'>
					<div className='cardname'>{`${user.firstName} ${user.lastName}`}</div>
					<div className='hr'></div>
					<div>{`@${user.userName}`}</div>
					{/* A ternary because not all users will have both phone number and email */}
					{user.phoneNumber && (
						<div>
							Contact:
							{user.phoneNumber}
						</div>
					)}{" "}
					{user.email && <div>Email: {user.email}</div>}
					<div>Availability: {user.availability}</div>
					<div>
						Rate per hour:{" $"}
						{user.wagePerHour}
					</div>
					<div>Skill Level: {user.skillLevel}</div>
				</div>
			) : (
				<div className='card-info'>
					<div className='cardname'>{user.firstName}</div>
					<div className='hr'></div>
					<div>{`@${user.userName}`}</div>
					{user.phoneNumber && (
						<div>Contact: {user.phoneNumber}</div>
					)}{" "}
					{user.email && <div>Email: {user.email}</div>}
					<div>About: {user.businessDescription}</div>
				</div>
			)}
		</div>
	);
};

export default UserCard;
