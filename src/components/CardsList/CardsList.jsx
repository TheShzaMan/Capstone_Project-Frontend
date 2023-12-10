import React from "react";
import JobCard from "../JobCard/JobCard";

const CardList = ({ cardArray = [], eventListner }) => {
	const availJobCards = cardArray.map((oneJob, index) => (
		<JobCard
			thisJob={oneJob}
			key={index}
			handleJobClick={eventListner}
			// checkApplied={checkApplied}
		/>
	));

	// const cards = cardArray.map((card, index) => {
	// 	<JobCard thisJob={card} key={index} handleJobClick={eventListner} />;
	// });

	return <ul className='searchcard-container'>{availJobCards}</ul>;
};

export default CardList;
