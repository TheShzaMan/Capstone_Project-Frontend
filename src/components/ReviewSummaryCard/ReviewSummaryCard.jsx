import React from "react";
import "./ReviewSummaryCard.css";

const ReviewSummaryCard = (singleUser) => {
	const review = singleUser.displayedUser;
	const user = review.user;
	// console.log(review.user);
	const avgOverall = review.avgOverallScore;
	const avgForDisplay = avgOverall.toFixed(1);
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
						<span className='textra'>{avgForDisplay}</span>
						/5
					</h3>
					<div>
						Total of number of reviews:{" "}
						<span className='textra'>
							{review.totalReviewsJobs.toFixed(1)}
						</span>
					</div>
					<div className='subcard card'>
						<h4>Avg scores breakdown:</h4>
						<div className='r-data'>
							Adherence to offer:{" "}
							<span className='textra'>
								{review.avgAdherence.toFixed(1)}
							</span>
							<span className='explain'>
								How close the real work done was to what was
								originally agreed upon.
							</span>
						</div>
						<div className='r-data'>
							Work Quality:{" "}
							<span className='textra'>
								{review.avgQuality.toFixed(1)}
							</span>
							<span className='explain'>
								The job that was done was done correctly and
								efficiently to your satisfaction.
							</span>
						</div>
						<div className='r-data'>
							Adaptability:
							<span className='textra'>
								{review.avgAdaptability.toFixed(1)}
							</span>
							<span className='explain'>
								How quickly this worker was able to learn what
								was needed and adapt to this job. If part of a
								team, their ability to adapt to new co-workers.
							</span>
						</div>
						<div className='r-data'>
							Communication:{" "}
							<span className='textra'>
								{review.avgCommunication.toFixed(1)}
							</span>
							<span className='explain'>
								Any communication made was professional. Any
								issues that arose were well communicated in a
								timely manner.
							</span>
						</div>
						<div className='r-data'>
							Timeliness:{" "}
							<span className='textra'>
								{review.avgTimeliness.toFixed(1)}
							</span>
							<span className='explain'>
								Showed up on time and worked to the time agreed
								upon. No long breaks. No staying longer than
								needed.
							</span>
						</div>
						<div className='r-data'>
							Likeliness of repeat:{" "}
							<span className='textra'>
								{review.avgWouldRepeat.toFixed(1)}
							</span>
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
						<span className='textra'>
							{review.avgOverallScore.toFixed(1)}
						</span>
						/5
					</h3>
					<div>
						Total of number of reviews:{" "}
						<span className='textra'>
							{review.totalReviewsJobs}
						</span>
					</div>
					<div className='subcard card'>
						<h4>Avg scores breakdown:</h4>
						<div className='r-data'>
							Adherence to offer:{" "}
							<span className='textra'>
								{review.avgAdherence.toFixed(1)}
							</span>
							<span className='explain'>
								How close the real job was to what was
								originally agreed upon.
							</span>
						</div>
						<div className='r-data'>
							Job Quality:{" "}
							<span className='textra'>
								{review.avgQuality.toFixed(1)}
							</span>
							<span className='explain'>
								Includes things like access to water, restroom,
								sufficient break policy, the quality of the work
								environment
							</span>
						</div>
						<div className='r-data'>
							Communication:{" "}
							<span className='textra'>
								{review.avgCommunication.toFixed(1)}
							</span>
							<span className='explain'>
								The job was explained and if questions arose
								they were answered. The job specifics were made
								clear. Questions were answered.
							</span>
						</div>
						<div className='r-data'>
							Timeliness:{" "}
							<span className='textra'>
								{review.avgTimeliness.toFixed(1)}
							</span>
							<span className='explain'>
								The job started and stopped on time. If time
								issues arise, they are communicated. Everyone's
								time was respected.
							</span>
						</div>
						<div className='r-data'>
							Likeliness of repeat:{" "}
							<span className='textra'>
								{review.avgWouldRepeat.toFixed(1)}
							</span>
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
