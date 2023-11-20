import "./JobCard.css";
import React from "react";

const JobCard = ({ job, handleDisplayDetail }) => {
	console.log(job);
	return (
		<div className='jobcard card'>
			{!job ? (
				<div className='loading'>Loading...</div>
			) : (
				<>
					<div
						className='cardname'
						//onClick={handleDisplayDetail(job.id)}
					>
						{job.jobName} - {job.jobDescription}
					</div>
					<div>
						<div className='card-info'>{`Pay/hour: $${job.payPerHour}`}</div>
						<div className='card-info'>
							{`Min. Skill Level Req.:`}
							<span className='textra'>{job.skillLevel}</span>
						</div>
						<div className='card-info'>{job.location}</div>
					</div>
				</>
			)}
		</div>
	);
};

export default JobCard;
