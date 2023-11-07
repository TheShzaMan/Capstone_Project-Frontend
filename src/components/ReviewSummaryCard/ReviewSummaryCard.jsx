import React from "react";
import "./ReviewSummaryCard.css";

const ReviewSummaryCard = (singleUser) => {
	const review = singleUser.singleUser;
	const user = singleUser.singleUser.user;
	console.log(user.userName);
	return (
		<div className='card review'>
			{user.isWorker ? (
				<div className='card-info'>
					<div className='cardname'>
						Review Summary:{" "}
						<p className='cardname'> @{user.userName}</p>
					</div>
					<div className='hr'></div>
					<h3>
						Overall Avg. Score:{" "}
						<span className='textra'>{review.avgOverallScore}</span>
						/5
					</h3>
					<div>
						{`Total of number of reviews: `}
						<span className='textra'>
							{" "}
							{review.totalReviewsJobs}
						</span>
					</div>
					<div className='subcard card'>
						<h4>Avg scores breakdown:</h4>
						<div className='r-data'>
							{`Adherence to offer: ${review.avgAdherence}`}
							<span className='explain'>
								How close the real work done was to what was
								originally agreed upon.
							</span>
						</div>
						<div className='r-data'>
							{`Work Quality: ${review.avgQuality}`}
							<span className='explain'>
								The job that was done was done correctly and
								efficiently to your satisfaction.
							</span>
						</div>
						<div className='r-data'>
							{`Adaptability: ${review.avgAdaptability}`}
							<span className='explain'>
								How quickly this worker was able to learn what
								was needed and adapt to this job. If part of a
								team, their ability to adapt to new co-workers.
							</span>
						</div>
						<div className='r-data'>
							{`Communication: ${review.avgCommunication}`}
							<span className='explain'>
								Any communication made was professional. Any
								issues that arose were well communicated in a
								timely manner.
							</span>
						</div>
						<div className='r-data'>
							{`Timeliness: ${review.avgTimeliness}`}
							<span className='explain'>
								Showed up on time and worked to the time agreed
								upon. No long breaks. No staying longer than
								needed.
							</span>
						</div>
						<div className='r-data'>
							{`Likeliness of repeat: ${review.avgWouldRepeat}`}
							<span className='explain'>
								Likeliness that this job provider would consider
								hiring this worker again.
							</span>
						</div>
					</div>
				</div>
			) : (
				<div className='card-info'>
					<div className='cardname'>
						Review Summary:{" "}
						<p className='cardname'> @{user.userName}</p>
					</div>
					<div className='hr'></div>
					<h3>
						Overall Avg. Score:{" "}
						<span className='textra'>{review.avgOverallScore}</span>
						/5
					</h3>
					<div>
						{`Total of number of reviews: `}
						<span className='textra'>
							{" "}
							{review.totalReviewsJobs}
						</span>
					</div>
					<div className='subcard card'>
						<h4>Avg scores breakdown:</h4>
						<div className='r-data'>
							{`Adherence to offer: ${review.avgAdherence}`}
							<span className='explain'>
								How close the real job was to what was
								originally agreed upon.
							</span>
						</div>
						<div className='r-data'>
							{`Job Quality: ${review.avgQuality}`}
							<span className='explain'>
								Includes things like access to water, restroom,
								sufficient break policy, the quality of the work
								environment
							</span>
						</div>
						<div className='r-data'>
							{`Communication: ${review.avgCommunication}`}
							<span className='explain'>
								The job was explained and if questions arose
								they were answered. The job specifics were made
								clear. Questions were answered.
							</span>
						</div>
						<div className='r-data'>
							{`Timeliness: ${review.avgTimeliness}`}
							<span className='explain'>
								The job started and stopped on time. If time
								issues arise, they are communicated. Everyone's
								time was respected.
							</span>
						</div>
						<div className='r-data'>
							{`Likeliness of repeat: ${review.avgWouldRepeat}`}
							<span className='explain'>
								Given the opportunity, would you take this job
								again? Would you recommend it to a friend?
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReviewSummaryCard;
