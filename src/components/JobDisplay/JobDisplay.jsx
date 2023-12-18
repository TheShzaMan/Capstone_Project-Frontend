import React from "react";
import "./JobDisplay.css";
//import "../JobCard/JobCard.css";
import UserCard from "../UserCard/UserCard";
import ReviewSummaryCard from "../ReviewSummaryCard/ReviewSummaryCard";
import JobCard from "../JobCard/JobCard";
import useModal from "../../hooks/useModal";
import AlertModal from "../AlertModal/AlertModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { checkForApplied } from "../../utils/MiscUtils";

const JobDisplay = ({
	jobToDisplay,
	displayedUser,
	loggedInUser,
	closePopup,
	openPopup,
	// hasApplied,
	// setHasApplied,
	addUserIdToApplied,
	modalState,
	closeModal,
}) => {
	// const { modalState, openModal, closeModal } = useModal();
	const [hasApplied, setHasApplied] = useState(false);

	//	const [showApplyBtn, setShowApplyBtn] = useState(true);
	//maybe move hasApplied state here and pass in jobsApplied array in props to compare job id to jobToDisplay id
	useEffect(() => {
		loggedInUser &&
			setHasApplied(checkForApplied(jobToDisplay, loggedInUser.user.id));
	}, [checkForApplied, jobToDisplay, modalState]);

	const handleClickApply = () => {
		addUserIdToApplied();

		// openModal();
	};
	//console.log(hasApplied);
	// const checkForApplied = () => {
	// 	jobToDisplay.appliedUserIds.includes(loggedInUser.user.id) &&
	// 		setShowApplyBtn(false);
	// };

	// const handleClickModal = () => {
	// 	closeModal();
	// };

	return (
		<div className='popup-container'>
			{loggedInUser?.user?.isWorker === true ? (
				<div className='pop-job-header'>
					{!hasApplied ? (
						<button
							className='alt-btn m apply'
							onClick={handleClickApply}
						>
							1-Click Apply
						</button>
					) : (
						<button className='alt-btn m apply disabled '>
							Applied
						</button>
					)}
					<button className='exit-form' onClick={closePopup}>
						X
					</button>
				</div>
			) : (
				<div className='pop-job-header'>
					<button className='exit-form' onClick={closePopup}>
						X
					</button>
				</div>
			)}
			<div className='job-details-full'>
				{!jobToDisplay ? (
					<div className='loading'>Loading...</div>
				) : (
					<div className='pop-job-card'>
						{/* {checkApplied()} */}
						<JobCard
							style='alt'
							thisJob={jobToDisplay}
							handleJobClick={openPopup}
							// hasApplied={hasApplied}
							// setHasApplied={setHasApplied}
						/>
					</div>
				)}

				<h2>This Job Posted By</h2>
				{displayedUser?.user ? (
					<UserCard
						displayedUser={displayedUser.user}
						// thisUserId={loggedInUser.id}
					/>
				) : (
					<div className='loading'>Loading...</div>
				)}

				{displayedUser && displayedUser.totalReviewsJobs > 0 ? (
					<ReviewSummaryCard displayedUser={displayedUser} />
				) : (
					<div className='card'>User has not yet been reviewed.</div>
				)}
				<AlertModal
					header='Application Submitted'
					message='If chosen you will be contacted by the job provider using the contact information from your profile.'
					closeModal={closeModal}
					modalState={modalState}
					closePopup={closePopup}
				/>
			</div>
		</div>
	);
};

export default JobDisplay;
