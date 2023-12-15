import React from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";

const CardList = ({ cardArray = [], eventListner, jobsApplied }) => {
	const [hasApplied, setHasApplied] = useState(false);

	const userHasApplied = (jobsApplied, thisJob) => {
		jobsApplied.includes(thisJob.id) && setHasApplied(true);
	};

	const availJobCards = cardArray.map((oneJob, index) => (
		<JobCard
			thisJob={oneJob}
			key={index}
			handleJobClick={eventListner}
			jobsApplied={jobsApplied}
			userHasApplied={userHasApplied}
			//hasApplied={hasApplied}
		/>
	));

	return <ul className='searchcard-container'>{availJobCards}</ul>;
};

export default CardList;
