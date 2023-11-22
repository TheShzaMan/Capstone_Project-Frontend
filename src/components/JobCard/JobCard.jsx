import "./JobCard.css";
import React from "react";

const JobCard = ({ oneJob, index, handleDisplayDetail, setJobToDisplay }) => {
	const handleClickDisplay = () => {
		setJobToDisplay(oneJob.postedByUser.id);
		handleDisplayDetail();
	};
	//console.log(oneJob);

	return (
		<div>
			{!oneJob ? (
				<div className='loading'>Loading...</div>
			) : (
				<div
					key={index}
					className='jobcard card'
					onClick={handleClickDisplay}
				>
					<div className='cardname'>
						{oneJob.jobName} - {oneJob.jobDescription}
					</div>
					<div>
						<div className='card-info'>
							{`Pay/hour:  $`}
							<span className='textra'>
								{oneJob.payPerHour.toFixed(2)}
							</span>
						</div>
						<div className='card-info'>
							{`Min. Skill Level Req.:`}
							<span className='textra'>{oneJob.skillLevel}</span>
						</div>
						<div className='card-info'>{oneJob.location}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobCard;
