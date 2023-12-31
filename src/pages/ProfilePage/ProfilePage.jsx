//General Imports
import React from "react";
import "./ProfilePage.css";
import axios from "axios";

//Component Imports
import ReviewSummaryCard from "../../components/ReviewSummaryCard/ReviewSummaryCard";
import UserCard from "../../components/UserCard/UserCard";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";

//Hooks and Util Imports
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import usePopup from "../../hooks/usePopup";

const ProfilePage = () => {
	const [user, token] = useAuth();
	const { popupState, openPopup, closePopup } = usePopup();
	const [displayedUser, setDisplayedUser] = useState();
	const thisUserId = user.id;

	useEffect(() => {
		async function fetchUser() {
			try {
				let response = await axios.get(
					`https://localhost:5001/api/Reviews/profile/${thisUserId}/`,
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				setDisplayedUser(response.data);
			} catch (error) {
				console.warn("Error in the fetchUser request.", error);
			}
		}
		user && fetchUser();
	}, [popupState]);

	return (
		<div className='profile-page container'>
			{displayedUser?.user ? (
				<>
					<UserCard
						thisUserId={thisUserId}
						displayedUser={displayedUser.user}
						handleClickEdit={openPopup}
					/>
					{/* EditProfileForm to display as popup when edit button is clicked */}
					<EditProfileForm
						thisUser={displayedUser.user}
						token={token}
						popupState={popupState}
						closePopup={closePopup}
					/>

					{displayedUser.totalReviewsJobs > 0 ? (
						<ReviewSummaryCard displayedUser={displayedUser} />
					) : (
						<div className='card'>
							User has not yet been reviewed.
						</div>
					)}
				</>
			) : (
				<h2 className='loading'>Loading...</h2>
			)}
		</div>
	);
};

export default ProfilePage;
