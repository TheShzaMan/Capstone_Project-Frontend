import React from "react";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import "./UserCard.css";
import { useState } from "react";

const UserCard = ({ displayedUser, token, handleClickEdit }) => {
	const user = displayedUser;

	// console.log(displayedUser);
	return (
		user && (
			<div className='card'>
				{user.isWorker === true ? (
					<div className='card-info'>
						<div className='cardname'>{`${user.firstName} ${user.lastName}`}</div>
						<div className='hr'></div>
						<div>{`@${user.userName}`}</div>
						{/* A ternary because not all users will have both phone number and email */}
						{user.phoneNumber && (
							<div>
								Contact{":   "}
								<p>{user.phoneNumber}</p>
							</div>
						)}{" "}
						{user.email && (
							<div>
								Email{":   "} <p>{user.email}</p>
							</div>
						)}
						<div>
							Availability{":   "}
							<p>{user.availability}</p>
						</div>
						{user.payPerHour && (
							<div>
								Rate per hour{":   "}
								{" $"}
								<p>{user.payPerHour.toFixed(2)}</p>
							</div>
						)}
						{user.skillLevel && (
							<div>
								Skill Level{":   "}
								<p>{user.skillLevel}</p>
							</div>
						)}
					</div>
				) : (
					<div className='card-info'>
						<div className='cardname'>{user.firstName}</div>
						<div className='hr'></div>
						<div>{`@${user.userName}`}</div>
						{user.phoneNumber && (
							<div>
								Contact{":   "}
								<p>{user.phoneNumber}</p>
							</div>
						)}{" "}
						{user.email && (
							<div>
								Email{":   "} <p>{user.email}</p>
							</div>
						)}
						<div>
							About{":   "} <p>{user.businessDescription}</p>
						</div>
					</div>
				)}
				{token != "" && (
					<button className='alt-btn' onClick={handleClickEdit}>
						Edit Profile
					</button>
				)}
			</div>
		)
	);
};

export default UserCard;
