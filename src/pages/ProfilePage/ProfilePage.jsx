import "./ProfilePage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import useAuth from "../../hooks/useAuth";
import ReviewSummaryCard from "../../components/ReviewSummaryCard/ReviewSummaryCard";

const ProfilePage = () => {
	const [user, token] = useAuth();
	const [thisUser, setThisUser] = useState("");

	const userId = user.id;

	useEffect(() => {
		fetchUserWithReview();
	}, []);

	async function fetchUserWithReview() {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Reviews/profile/${userId}/`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			setThisUser(response.data);
			console.log(thisUser);
		} catch (error) {
			console.warn("Error in the fetchUserWithReview request.", error);
		}
	}

	//a button or dropdown menu items for post job and edit profile
	return (
		<div className='profile-page container'>
			{thisUser ? (
				<>
					<UserCard singleUser={thisUser} />

					<ReviewSummaryCard singleUser={thisUser} />
				</>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
};

export default ProfilePage;
