import React from "react";
import "./JobCard.css";
import { useState, useEffect } from "react";
import { checkForApplied } from "../../utils/MiscUtils";

const JobCard = ({
	thisJob,
	index,
	handleJobClick,
	thisUserId,
	style = "normal",
}) => {
	const [hasApplied, setHasApplied] = useState(false);

	useEffect(() => {
		const applied = checkForApplied(thisJob, thisUserId);
		setHasApplied(applied);
	}, [thisJob, thisJob.appliedUserIds]);

	const handleClick = () => {
		handleJobClick(thisJob, index);
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
				{/* Location line of JobCard to be replaced with Area in future app iterations*/}
			</div>
		</li>
	) : (
		<div className='loading'>Loading...</div>
	);
};

export default JobCard;
