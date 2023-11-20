import "./JobCard.css";
import React from "react";

const JobCard = ({ job, handleDisplayDetail, setJob }) => {
	// console.log(job);

	const handleClickDisplay = () => {
		handleDisplayDetail();
		setJob(job);
	};

	return (
		<div>
			{!job ? (
				<div className='loading'>Loading...</div>
			) : (
				<div className='jobcard card' onClick={handleClickDisplay}>
					<div className='cardname'>
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
				</div>
			)}
		</div>
	);
};

export default JobCard;
