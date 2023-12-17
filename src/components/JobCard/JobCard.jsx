import "./JobCard.css";
import React from "react";
import { useState, useEffect } from "react";
import { checkForApplied } from "../../utils/MiscUtils";

const JobCard = ({
	thisJob,
	index,
	handleJobClick,
	thisUserId,
	style = "normal",
	hasApplied,
	setHasApplied,
}) => {
	useEffect(() => {
		const applied = checkForApplied(thisJob, thisUserId);
		setHasApplied(applied);
		console.log("hasApplied from JobCard: ", hasApplied);
	}, [checkForApplied, thisJob, thisUserId]);

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
		<li
			key={index}
			id={style}
			className='jobcard card'
			onClick={handleClick}
		>
			<div className='stamp' id={style}>
				APP SUBMITTED
			</div>
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
	) : (
		<div className='loading'>Loading...</div>
	);
};

export default JobCard;
