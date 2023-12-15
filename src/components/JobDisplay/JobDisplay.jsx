import React from "react";
import "./JobDisplay.css";
import UserCard from "../UserCard/UserCard";
import ReviewSummaryCard from "../ReviewSummaryCard/ReviewSummaryCard";
import JobCard from "../JobCard/JobCard";
import useModal from "../../hooks/useModal";
import AlertModal from "../AlertModal/AlertModal";
import { useEffect, useState } from "react";
import axios from "axios";

const JobDisplay = ({
	jobToDisplay,
	displayedUser,
	loggedInUser,
	handleJobDisplay,
	addUserIdToApplied,
}) => {
	const { modalState, openModal, closeModal } = useModal();
	const [hasApplied, setHasApplied] = useState(false);
	//maybe move hasApplied state here and pass in jobsApplied array in props to compare job id to jobToDisplay id
	const handleClickApply = () => {
		addUserIdToApplied();
		// openModal();
	};

	const handleClickModal = () => {
		modalState === "modal-active" ? closeModal() : openModal();
	};
	console.log(loggedInUser);
	return (
		<div className='popup-container'>
			{loggedInUser?.user?.isWorker === true ? (
				<div className='pop-job-header'>
					{!jobToDisplay.userHasApplied ? (
						<button
							className='alt-btn m apply'
							onClick={handleClickApply}
						>
							Apply To This Job
						</button>
					) : (
						<button className='alt-btn m apply disabled'>
							Applied
						</button>
					)}
					<button className='exit-form' onClick={handleJobDisplay}>
						X
					</button>
				</div>
			) : (
				<div className='pop-job-header'>
					<button className='exit-form' onClick={handleJobDisplay}>
						X
					</button>
				</div>
			)}
			<div className='job-details-full'>
				{jobToDisplay && !jobToDisplay ? (
					<div className='loading'>Loading...</div>
				) : (
					<div className='pop-job-card'>
						{/* {checkApplied()} */}
						<JobCard thisJob={jobToDisplay} />
					</div>
				)}
				<h2>This Job Posted By</h2>

				<UserCard
					displayedUser={jobToDisplay.postedByProfile}
					// thisUserId={loggedInUser.id}
				/>
				{/* )} */}
				{displayedUser && displayedUser.totalReviewsJobs > 0 ? (
					<ReviewSummaryCard displayedUser={displayedUser} />
				) : (
					<div className='card'>User has not yet been reviewed.</div>
				)}
				<AlertModal
					header='Application Submitted'
					message='If chosen you will be contacted by the job provider using the contact information from your profile.'
					handleClickModal={handleClickModal}
					modalState={modalState}
				/>
			</div>
		</div>
	);
};

export default JobDisplay;
