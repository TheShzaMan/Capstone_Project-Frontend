import "./SearchPage.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import useFilter from "../../hooks/useFilter";
import Map from "../../components/Map/Map";
import JobCard from "../../components/JobCard/JobCard";
import UserCard from "../../components/UserCard/UserCard";
import ReviewSummaryCard from "../../components/ReviewSummaryCard/ReviewSummaryCard";
import CardList from "../../components/CardsList";
import AlertModal from "../../components/AlertModal/AlertModal";
import { Marker } from "@react-google-maps/api";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [user, token] = useAuth();
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobDisplayState, setJobDisplayState] = useState("closed");
	const [allJobs, setAllJobs] = useState([]);
	const [jobList, setJobList] = useState([]);
	const [jobToDisplay, setJobToDisplay] = useState();
	const [displayedUser, setDisplayedUser] = useState(null);
	// const [availJobCards, setAvailableJobs] = useState(null);
	const [postedByUserId, setPostedByUserId] = useState();
	const [filterBtn, setFilterBtn] = useState("My Jobs");
	const [hasApplied, setHasApplied] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState();
	const thisUserId = user.id;

	const { modalState, openModal, closeModal } = useModal();
	const { myJobs, availJobs } = useFilter();

	// console.log({ user });
	useEffect(() => {
		fetchJobs();
	}, []);
	useEffect(() => {
		setLoggedInUser(fetchUser(thisUserId));
		// console.log(loggedInUser);
	}, []);

	loggedInUser &&
		console.log(
			"On load, allJobs: ",

			"loggedInUser: ",
			loggedInUser,
			"filtered jobs: ",
			jobList
		);

	const fetchJobs = async () => {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/avail`
			);
			setJobList(response.data);
			setAllJobs(response.data);
		} catch (error) {
			console.warn("Error in the fetchJobs request.", error);
		}
	};
	const fetchUser = async (userId) => {
		if (userId) {
			try {
				let response = await axios.get(
					`https://localhost:5001/api/Reviews/profile/${userId}/`,
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				// console.log(response.data);
				return response.data;

				console.log();
			} catch (error) {
				console.warn(
					"Error in the fetchUser request in Search Page.",
					error
				);
			}
		} else {
		}
	};

	// console.log(jobToDisplay);
	const addUserIdToApplied = async () => {
		try {
			// console.log(token);
			let response = await axios.put(
				`https://localhost:5001/api/Jobs/apply/${jobToDisplay.id}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			setHasApplied(true);
			openModal();
		} catch (error) {
			console.log("Error in handleClickApply Put Request", error);
		}
	};

	const handleJobClick = (thisJob) => {
		setJobToDisplay(thisJob);
	};
	useEffect(() => {
		if (jobToDisplay) {
			setPostedByUserId(jobToDisplay.postedByUser.id);
			checkApplied(jobToDisplay);
		}

		if (
			jobToDisplay &&
			jobToDisplay.postedByUser.id &&
			jobToDisplay.postedByUser.id === postedByUserId
		) {
			setJobDisplayState("open");
		} else {
		}
	}, [jobToDisplay]);

	// console.log(
	// 	"postedByUserId at SearchPage onClick listner: ",
	// 	postedByUserId,
	// 	"jobToDisplay: ",
	// 	jobToDisplay,
	// 	"jobDisplayState: ",
	// 	jobDisplayState,
	// 	"hasApplied",
	// 	hasApplied
	// );

	const handleJobDisplay = () => {
		setJobDisplayState(jobDisplayState === "closed" ? "open" : "closed");
	};

	useEffect(() => {
		postedByUserId && postedByUserId === jobToDisplay.postedByUser.id ? (
			fetchUser(postedByUserId)
		) : (
			<div className='loading'>Awaiting postedByUserId</div>
		);
	}, [postedByUserId]);

	const handleClickApply = () => {
		addUserIdToApplied();
		// openModal();
	};

	const handleJobFilters = () => {
		if (filterBtn === "All Jobs") {
			setJobList(availJobs(allJobs));
			setMapState("closed-form");
			setListState("closed-form");
			setFilterBtn("My Jobs");
		} else if (filterBtn === "My Jobs") {
			setJobList(myJobs(thisUserId, allJobs));
			setFilterBtn("All Jobs");
		}
	};

	const handleToggleMap = () => {
		if (mapState === "closed-form") {
			setMapState("open-form");
			setListState("closed-form");
			setSetBtn("List View");
		} else if (mapState === "open-form") {
			setMapState("closed-form");
			setListState("opened-form");
			setSetBtn("Map View");
		} else if (mapState === "closed-form" && listState === "closed=form") {
			setListState("opened-form");
			setSetBtn("Map View");
		}
	};

	const handleClickModal = () => {
		modalState === "modal-active" ? closeModal() : openModal();
	};
	// const filterAvailJobs = () => {
	// 	const availJobs = jobList.
	// }

	// console.log(
	// 	"jobToDisplay: ",
	// 	jobToDisplay,
	// 	"joblist:",
	// 	jobList,

	// 	"jobToDisplay @ displayJobCard filter: ",
	// 	jobToDisplay
	// );

	function checkApplied(jobToCheck) {
		if (jobToCheck && jobToCheck.appliedUserIds) {
			return jobToCheck.appliedUserIds.includes(thisUserId);
		}
		return false;
	}

	// jobToDisplay &&
	// 	console.log(
	// 		"jobToDisplay.id: ",
	// 		jobToDisplay.id,
	// 		"loggedInUserId: ",
	// 		loggedInUser.user.id,
	// 		"appliedUserIds: ",
	// 		jobToDisplay.appliedUserIds,
	// 		"hasApplied: ",
	// 		hasApplied
	// 	);

	return !jobList ? (
		<div className='search-page container'>
			<div className='loading'>Loading...</div>
		</div>
	) : (
		<div className='search-page container'>
			{jobDisplayState === "open" && (
				<div className='darkout-bg'>
					<div className='popup-container'>
						{loggedInUser?.user.isWorker === true ? (
							<div className='pop-job-header'>
								{!hasApplied ? (
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
								<button
									className='exit-form'
									onClick={handleJobDisplay}
								>
									X
								</button>
							</div>
						) : (
							<div className='pop-job-header'>
								<button
									className='exit-form'
									onClick={handleJobDisplay}
								>
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
							{!displayedUser ? (
								<div className='loading'>Loading...</div>
							) : (
								<UserCard
									displayedUser={displayedUser} //erroring on some users because need .user added here.
									thisUserId={thisUserId}
								/>
							)}
							{displayedUser &&
							displayedUser.totalReviewsJobs > 0 ? (
								<ReviewSummaryCard
									displayedUser={displayedUser}
								/>
							) : (
								<div className='card'>
									User has not yet been reviewed.
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			<AlertModal
				header='Application Submitted'
				message='If chosen you will be contacted by the job provider using the contact information from your profile.'
				handleClickModal={handleClickModal}
				modalState={modalState}
			/>
			<div className='job-btns'>
				<button className='alt-btn m' onClick={handleToggleMap}>
					{setBtn}
				</button>
				<button className='alt-btn l' onClick={handleJobFilters}>
					{filterBtn}
				</button>
			</div>
			{setBtn === "List View" && (
				<div className={mapState} target='search-map'>
					<Map handleToggleMap={handleToggleMap} jobList={jobList} />
				</div>
			)}
			{setBtn === "Map View" && (
				// <div className='job-list'>{availJobCards}</div>
				<>
					<CardList
						cardArray={jobList}
						eventListner={handleJobClick}
					/>
				</>
			)}
		</div>
	);
};

export default SearchPage;
