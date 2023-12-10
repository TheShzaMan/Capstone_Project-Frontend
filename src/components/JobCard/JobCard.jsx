import "./JobCard.css";
import React from "react";
import { useState } from "react";

const JobCard = ({ thisJob, index, handleJobClick }) => {
	// const [thisJob, setThisJob] = useState();

	const handleClick = () => {
		handleJobClick(thisJob, index);
		console.log(
			"postedByUserId at jobCard onClick listner: ",
			thisJob.postedByUser.id,
			"thisJob: ",
			thisJob
		);
	};

	return thisJob ? (
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
	) : (
		<div className='loading'>Loading...</div>
	);
};

export default JobCard;
