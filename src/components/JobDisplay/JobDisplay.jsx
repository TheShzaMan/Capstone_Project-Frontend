// General Imports
import React from "react";
import "./JobDisplay.css";
import { useEffect, useState } from "react";

//Component Imports
import UserCard from "../UserCard/UserCard";
import ReviewSummaryCard from "../ReviewSummaryCard/ReviewSummaryCard";
import JobCard from "../JobCard/JobCard";
import AlertModal from "../AlertModal/AlertModal";

//Util Imports
import { checkForApplied } from "../../utils/MiscUtils";

const JobDisplay = ({
	jobToDisplay,
	displayedUser,
	loggedInUser,
	togglePopup,
	modalState,
	closeModal,
	addUserIdToApplied,
}) => {
	const [hasApplied, setHasApplied] = useState(false);
	const [popupState, setPopupState] = useState("closed-form");
	useEffect(() => {
		loggedInUser &&
			setHasApplied(checkForApplied(jobToDisplay, loggedInUser.user.id));
	}, [checkForApplied, jobToDisplay, modalState]);

	const handleClickApply = () => {
		addUserIdToApplied();
	};

	return !jobToDisplay ? (
		<div className='loading'>Loading...</div>
	) : (
		<div className={popupState}>
			<div className='darkout-bg'>
				<div className='popup-container'>
					{loggedInUser?.user?.isWorker ? (
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
							<button className='exit-form' onClick={togglePopup}>
								X
							</button>
						</div>
					) : (
						<div className='pop-job-header'>
							<button className='exit-form' onClick={togglePopup}>
								X
							</button>
						</div>
					)}
					<div className='job-details-full'>
						{!jobToDisplay ? (
							<div className='loading'>Loading...</div>
						) : (
							<div className='pop-job-card'>
								<JobCard
									style='alt'
									thisJob={jobToDisplay}
									handleJobClick={togglePopup}
								/>
							</div>
						)}

						<h2>This Job Posted By</h2>
						{displayedUser?.user ? (
							<UserCard displayedUser={displayedUser.user} />
						) : (
							<div className='loading'>Loading...</div>
						)}

						{displayedUser && displayedUser.totalReviewsJobs > 0 ? (
							<ReviewSummaryCard displayedUser={displayedUser} />
						) : (
							<div className='card'>
								User has not yet been reviewed.
							</div>
						)}

						{/* Modal set to display upon application submission */}
						<AlertModal
							header='Application Submitted'
							message='If chosen you will be contacted by the job provider using the contact information from your profile.'
							closeModal={closeModal}
							modalState={modalState}
							closePopup={togglePopup}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobDisplay;
