import React from "react";
import JobCard from "../JobCard/JobCard";
import UserCard from "../UserCard/UserCard";
import { checkForApplied } from "../../utils/MiscUtils";

const CardList = ({
	arrayType, //jobs or users
	cardArray = [],
	eventListner,
	thisUserId,
	setHasApplied,
	hasApplied,
}) => {
	const jobs = cardArray.map((oneJob, index) => (
		<JobCard
			style={checkForApplied(oneJob, thisUserId) ? "applied" : "normal"}
			thisJob={oneJob}
			key={index}
			handleJobClick={eventListner}
			thisUserId={thisUserId}
			setHasApplied={setHasApplied}
			hasApplied={hasApplied}
		/>
	));

	const users = cardArray.map((user, index) => (
		<UserCard displayedUser={user} key={index} />
	));

	return !arrayType ? (
		<div className='loading'>Loading...</div>
	) : (
		(arrayType = "jobs" ? (
			<ul className='searchcard-container'>{jobs} </ul>
		) : (
			<ul className='searchcard-container'>{users}</ul>
		))
	);
};

export default CardList;
