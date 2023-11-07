import "./JobCard.css";
import React from "react";

const JobCard = (job) => {
	// console.log(job);
	return (
		<div className='jobcard card'>
			<div className='cardname'>
				{job.job.jobName} {job.job.location}
			</div>
			<div>
				<div className='card-info'>{job.job.jobDescription}</div>
				<div className='card-info'>
					{`Min. Skill Level Req.:`}
					<span className='textra'>{job.job.skillLevel}</span>
				</div>
				<div className='card-info'>{`Pay/hour: $${job.job.payPerHour}`}</div>
			</div>
		</div>
	);
};

export default JobCard;
