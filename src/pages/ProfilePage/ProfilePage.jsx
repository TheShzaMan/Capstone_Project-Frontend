import "./ProfilePage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import useAuth from "../../hooks/useAuth";
import ReviewSummaryCard from "../../components/ReviewSummaryCard/ReviewSummaryCard";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import AlertModal from "../../components/AlertModal/AlertModal";

const ProfilePage = () => {
	const [user, token] = useAuth();
	const [displayedUser, setDisplayedUser] = useState();
	const [editFormOpenState, setEditFormOpenState] = useState("closed-form");
	const [modalState, setModalState] = useState("modal-inactive");

	const userId = user.id;
	useEffect(() => {
		fetchUser();
	}, []);
	// console.log(userId);
	const handleClickModal = () => {
		modalState === "modal-active"
			? setModalState("modal-inactive")
			: setModalState("modal-active");
	};
	// console.log(token);

	const handleClickEdit = () => {
		editFormOpenState === "closed-form"
			? setEditFormOpenState("opened-form")
			: setEditFormOpenState("closed-form");
	};

	async function fetchUser() {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Reviews/profile/${userId}/`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			// console.log(response.data);
			setDisplayedUser(response.data);
			// console.log(displayedUser);
		} catch (error) {
			console.warn("Error in the fetchUser request.", error);
		}
	}

	//a button or dropdown menu items for post job and edit profile
	return (
		<div className='profile-page container'>
			{displayedUser ? (
				<>
					<UserCard
						token={token}
						displayedUser={displayedUser}
						handleClickEdit={handleClickEdit}
					/>
					<div className={editFormOpenState}>
						<EditProfileForm
							thisUser={displayedUser}
							token={token}
							handleClickEdit={handleClickEdit}
							reloadProfile={fetchUser}
							handleClickModal={handleClickModal}
						/>
					</div>
					<div className={modalState}>
						<AlertModal
							header='SUCCESS'
							message='Your profile has been successfully edited.'
							handleClickModal={handleClickModal}
						/>
					</div>

					{/* <button onClick={handleClickEdit}>Edit Profile</button> */}
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
