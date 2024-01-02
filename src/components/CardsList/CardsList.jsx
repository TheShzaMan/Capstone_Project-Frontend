import React from "react";
import JobCard from "../JobCard/JobCard";
import UserCard from "../UserCard/UserCard";
import { checkForApplied } from "../../utils/MiscUtils";
import { useState, useEffect } from "react";

const CardList = ({
	arrayType, //"jobs" or "users"
	cardArray = [],
	eventListner,
	thisUserId,
	setHasApplied,
	hasApplied,
}) => {
	const [list, setList] = useState();
	const [cards, setCards] = useState();

	useEffect(() => {
		setCards(arrayType);
		console.log(cardArray);
		cards && makeList();
	}, [cards, cardArray]);

	const jobCards = () => {
		const jobsList = cardArray.map((oneJob, index) => (
			<JobCard
				style={
					checkForApplied(oneJob, thisUserId) ? "applied" : "normal"
				}
				thisJob={oneJob}
				key={index}
				handleJobClick={eventListner}
				thisUserId={thisUserId}
				setHasApplied={setHasApplied}
				hasApplied={hasApplied}
			/>
		));
		setList(jobsList);
	};

	const userCards = () => {
		const usersList = cardArray.map((user, index) => (
			<UserCard displayedUser={user} key={index} />
		));
		setList(usersList);
	};

	const makeList = () => {
		console.log(cards);
		if (cards === "jobs") {
			jobCards();
		} else if (cards === "users") {
			userCards();
		}
	};
	return !cards ? (
		<div className='loading'>Load...</div>
	) : (
		<ul className='searchcard-container'>{list} </ul>
	);
};

export default CardList;
