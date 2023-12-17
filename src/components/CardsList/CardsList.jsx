import React from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";

const CardList = ({
	cardArray = [],
	eventListner,
	thisUserId,
	// checkForApplied,
	// hasApplied,
}) => {
	const availJobCards = cardArray.map((oneJob, index) => (
		<JobCard
			thisJob={oneJob}
			key={index}
			handleJobClick={eventListner}
			thisUserId={thisUserId}
			//jobsApplied={jobsApplied}
			// checkForApplied={checkForApplied}
			// hasApplied={hasApplied}
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
