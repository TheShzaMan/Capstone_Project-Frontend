import "./JobCard.css";
import React from "react";
import { useState } from "react";

const JobCard = ({
	thisJob,
	index,
	handleJobClick,
	jobsApplied,
	userHasApplied,
	//hasApplied,
}) => {
	userHasApplied(jobsApplied, thisJob);
	const handleClick = () => {
		handleJobClick(thisJob, index);
		// checkApplied(thisJob);
		console.log(
			"postedByUserId at jobCard onClick listner: ",
			thisJob.postedByUser.id,
			"thisJob: ",
			thisJob
		);
	};

	return thisJob ? (
		hasApplied ? (
			<>Already Applied</>
		) : (
			<li key={index} className='jobcard card' onClick={handleClick}>
				<div className='cardname'>{thisJob.jobName}</div>
				<p>{thisJob.jobDescription}</p>
				<hr></hr>
				<div>
					<div className='card-info'>
						{`Pay/hour:  $`}

						<span className='textra'>{thisJob.payPerHour}</span>
					</div>
					<div className='card-info'>
						{`Min. Skill Level Req.:`}
						<span className='textra'>{thisJob.skillLevel}</span>
					</div>
					<div className='card-info'>{thisJob.location}</div>
				</div>
			</li>
		)
	) : (
		<div className='loading'>Loading...</div>
	);
};

export default JobCard;
