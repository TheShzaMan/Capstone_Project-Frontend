import "./JobCard.css";
import React from "react";
import { useState, useEffect } from "react";

const JobCard = ({
	thisJob,
	index,
	handleJobClick,
	thisUserId,
	// displayStyle = "jobcard card",
	style = "normal",
	// hasApplied,
	// checkForApplied,
}) => {
	// const [displayStyle, setDisplayStyle] = useState();
	const [hasApplied, setHasApplied] = useState(false);
	useEffect(() => {
		checkForApplied(thisJob);
	}, []);

	// !styling && setDisplayStyle("jobcard card");
	const checkForApplied = (thisJob) => {
		thisJob.appliedUserIds.includes(thisUserId) && setHasApplied(true);
	};
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
