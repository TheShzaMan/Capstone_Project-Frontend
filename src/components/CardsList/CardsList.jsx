import React from "react";
import JobCard from "../JobCard/JobCard";

const CardList = ({
	cardArray = [],
	eventListner,
	callbackFunction,
	thisUserId,
}) => {
	const availJobCards = cardArray.map((oneJob, index) => (
		<JobCard
			thisJob={oneJob}
			key={index}
			handleJobClick={eventListner}
			checkApplied={callbackFunction}
			thisUserId={thisUserId}
		/>
	));

	// const cards = cardArray.map((card, index) => {
	// 	<JobCard thisJob={card} key={index} handleJobClick={eventListner} />;
	// });

	return <ul className='searchcard-container'>{availJobCards}</ul>;
};

export default CardList;
