import React from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";
import { checkForApplied } from "../../utils/MiscUtils";

const CardList = ({
	cardArray = [],
	eventListner,
	thisUserId,
	setHasApplied,
	hasApplied,
}) => {
	const availJobCards = cardArray.map((oneJob, index) => (
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
	// console.log(cardArray);
	return !availJobCards ? (
		<div className='loading'>Loading...</div>
	) : (
		<ul className='searchcard-container'>{availJobCards}</ul>
	);
};

export default CardList;
