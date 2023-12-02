import "./JobCard.css";
import React from "react";
import { useState } from "react";

const JobCard = ({ thisJob, index, handleJobClick }) => {
	// const [thisJob, setThisJob] = useState();

	const handleClick = () => {
		// setThisJob(oneJob);
		handleJobClick(thisJob);
	};

	// const handleClickDisplay = () => {
	// 	//setJobToDisplay(oneJob.postedByUser.id);
	// 	setJobToDisplay(oneJob);
	// 	// setPostedByUserId(oneJob.postedByUser.id);
	// 	handleDisplayDetail();
	// 	console.log(
	// 		"postedByUserId at jobCard onClick listner: ",
	// 		oneJob.postedByUser.id,
	// 		"oneJob: ",
	// 		oneJob
	// 	);
	// fetchPostedByUser();
	// setJobDisplayState("opened");

	return (
		<div>
			{!thisJob ? (
				<div className='loading'>Loading...</div>
			) : (
				<div key={index} className='jobcard card' onClick={handleClick}>
					<div className='cardname'>
						{thisJob.jobName} - {thisJob.jobDescription}
					</div>
					<div>
						<div className='card-info'>
							{`Pay/hour:  $`}
							<span className='textra'>
								{thisJob.payPerHour.toFixed(2)}
							</span>
						</div>
						<div className='card-info'>
							{`Min. Skill Level Req.:`}
							<span className='textra'>{thisJob.skillLevel}</span>
						</div>
						<div className='card-info'>{thisJob.location}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobCard;
