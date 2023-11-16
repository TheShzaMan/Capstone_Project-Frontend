import React from "react";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import "./UserCard.css";
import { useState } from "react";

const UserCard = ({ displayedUser, token, handleClickEdit }) => {
	// displayedUser = displayedUser.displayedUser;
	// const [handleClickEdit] = handleClickEdit();
	// handleClickEdit = handleClickEdit();
	// console.log(displayedUser);
	return (
		<div className='card'>
			{displayedUser.isWorker ? (
				<div className='card-info'>
					<div className='cardname'>{`${displayedUser.firstName} ${displayedUser.lastName}`}</div>
					<div className='hr'></div>
					<div>{`@${displayedUser.userName}`}</div>
					{/* A ternary because not all users will have both phone number and email */}
					{displayedUser.phoneNumber && (
						<div>
							Contact{":   "}
							<p>{displayedUser.phoneNumber}</p>
						</div>
					)}{" "}
					{displayedUser.email && (
						<div>
							Email{":   "} <p>{displayedUser.email}</p>
						</div>
					)}
					<div>
						Availability{":   "}
						<p>{displayedUser.availability}</p>
					</div>
					<div>
						Rate per hour{":   "}
						{" $"}
						<p>{displayedUser.wagePerHour}</p>
					</div>
					<div>
						Skill Level{":   "}
						<p>{displayedUser.skillLevel}</p>
					</div>
				</div>
			) : (
				<div className='card-info'>
					<div className='cardname'>{displayedUser.firstName}</div>
					<div className='hr'></div>
					<div>{`@${displayedUser.userName}`}</div>
					{displayedUser.phoneNumber && (
						<div>
							Contact{":   "}
							<p>{displayedUser.phoneNumber}</p>
						</div>
					)}{" "}
					{displayedUser.email && (
						<div>
							Email{":   "} <p>{displayedUser.email}</p>
						</div>
					)}
					<div>
						About{":   "} <p>{displayedUser.businessDescription}</p>
					</div>
				</div>
			)}
			{token != "" && (
				<button className='alt-btn' onClick={handleClickEdit}>
					Edit Profile
				</button>
			)}
		</div>
	);
};

export default UserCard;
