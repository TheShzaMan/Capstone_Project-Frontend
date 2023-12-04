import "./SearchPage.css";
import Map from "../../components/Map/Map";
import React from "react";
import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard/JobCard";
import axios from "axios";
import { Marker } from "@react-google-maps/api";
import UserCard from "../../components/UserCard/UserCard";
import useAuth from "../../hooks/useAuth";
import ReviewSummaryCard from "../../components/ReviewSummaryCard/ReviewSummaryCard";
import AlertModal from "../../components/AlertModal/AlertModal";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [user, token] = useAuth();
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobDisplayState, setJobDisplayState] = useState("closed");
	const [jobList, setJobList] = useState([]);
	const [jobToDisplay, setJobToDisplay] = useState();
	const [displayedUser, setDisplayedUser] = useState(null);
	// const [availableJobs, setAvailableJobs] = useState(null);
	const [postedByUserId, setPostedByUserId] = useState();
	const [jobFilters, setJobFilters] = useState("allJobs");
	const [myJobs, setMyJobs] = useState([]);
	const [filterBtn, setFilterBtn] = useState("My Jobs");
	const [hasApplied, setHasApplied] = useState(false);
	const [modalState, setModalState] = useState("modal-inactive");
	const [loggedInUser, setLoggedInUser] = useState();
	const [displayedJobCard, setDisplayedJobCard] = useState(null);
	const thisUserId = user.id;
	// console.log({ user });
	useEffect(() => {
		fetchJobs();
	}, []);
	useEffect(() => {
		fetchUser(thisUserId, setLoggedInUser);
		console.log(loggedInUser);
	}, [thisUserId]);
	useEffect(() => {
		fetchUser(postedByUserId, setDisplayedUser);
	}, [postedByUserId]);
	// useEffect(() => {
	// 	fetchPostedByUser();
	// }, []);
	// const jobPostedByUserId = jobToDisplay.postedByUser.id;

	const fetchJobs = async () => {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/avail`
			);
			// console.log(response.data);
			setJobList(response.data);
		} catch (error) {
			console.warn("Error in the fetchJobs request.", error);
		}
	};
	const fetchUser = async (userId, setState) => {
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
				console.log(response.data);
				setState(response.data);

				console.log(
					"displayedUser at fetchUser api call: ",
					displayedUser
				);
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
	const handleClickApply = async () => {
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
			setModalState("modal-active");
		} catch (error) {
			console.log("Error in handleClickApply Put Request", error);
		}
	};
	const filterMyJobs = () => {
		setMyJobs(jobList.filter((job) => job.postedByUser.id === thisUserId));
	}; //CHECK THIS SYNTAX

	const handleJobClick = (thisJob) => {
		setJobToDisplay(thisJob);
		setPostedByUserId(thisJob.postedByUser.id);
		setJobDisplayState("open");
	};

	console.log(
		"postedByUserId at SearchPage onClick listner: ",
		postedByUserId,
		"jobToDisplay: ",
		jobToDisplay,
		"jobDisplayState: ",
		jobDisplayState
	);

	const handleJobDisplay = () => {
		setJobDisplayState(jobDisplayState === "closed" ? "open" : "closed");
	};
	// setDisplayedJobCard(<JobCard oneJob={jobToDisplay} />);
	useEffect(() => {
		postedByUserId && postedByUserId === jobToDisplay.postedByUser.id ? (
			fetchUser(postedByUserId, setDisplayedUser)
		) : (
			<div className='loading'>Awaiting postedByUserId</div>
		);
	}, [postedByUserId]);

	console.log(displayedUser);

	// console.log(
	// 	"jobToDisplay at SearchPage displayDetail: ",
	// 	jobDisplayState
	// "displayedUserId: ",
	// displayedUserId
	// );

	const handleJobFilters = () => {
		if (jobFilters === "allJobs") {
			setJobFilters("myJobs");
			setMapState("closed-form");
			setListState("closed-form");
			setFilterBtn("My Jobs");
			filterMyJobs();
		} else if (jobFilters === "myJobs") {
			setJobFilters("allJobs");
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
		modalState === "modal-active"
			? setModalState("modal-inactive")
			: setModalState("modal-active");
	};
	const myJobCards = myJobs.map((myJob, index) => (
		<JobCard thisJob={myJob} key={index} handleClick={handleJobClick} />
	));
	const availableJobs = jobList.map((oneJob, index) => (
		<JobCard thisJob={oneJob} key={index} handleJobClick={handleJobClick} />
	));
	const displayJobCard = availableJobs
		.filter(function (availJob) {
			if (availJob === jobToDisplay) {
				return true;
			}
		})
		.map((availJob, index) => <JobCard thisJob={availJob} key={index} />);

	console.log(
		"jobToDisplay: ",
		jobToDisplay,

		"jobToDisplay @ displayJobCard filter: ",
		jobToDisplay,
		"displayJobCard: ",
		displayJobCard
	);

	const checkApplied = () => {
		jobToDisplay &&
			jobToDisplay.appliedUserIds.map(
				(aui) => aui === loggedInUser.user.id && setHasApplied(true)
			);
		// console.log(jobToDisplay.appliedUserIds);
		// console.log("hasApplied: ", hasApplied);
		console.log(
			"jobToDisplay.id: ",
			jobToDisplay.id,
			"loggedInUserId: ",
			loggedInUser.user.id,
			"appliedUserIds: ",
			jobToDisplay.appliedUserIds,
			"hasApplied: ",
			hasApplied
		);
	};

	// const jobMarkers = jobList.map((job, index) => (
	// 	<Marker position={job.location} />
	// ));
	//console.log("jobToDisplay.postedByUser.id:", jobToDisplay.postedByUser.id);

	// console.log("AppliedUserIds: ", jobToDisplay.appliedUserIds);
	// console.log(postedByUserId);

	// console.log("displayedUser for userCard and reviewCard", displayedUser);
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
										className='alt-btn m'
										onClick={handleClickApply}
									>
										Apply To This Job
									</button>
								) : (
									<button className='alt-btn m disabled'>
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
							{!jobToDisplay ? (
								<div className='loading'>Loading...</div>
							) : (
								<div className='pop-job-card'>
									{displayedJobCard}
									{checkApplied()}
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
							{displayedUser?.totalReviewsJobs > 0 ? (
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
				{setBtn === "List View" && (
					<div className={mapState}>
						<Map
							handleToggleMap={handleToggleMap}
							jobList={jobList}
						/>
					</div>
				)}
				{setBtn === "Map View" && <div>{availableJobs}</div>}
				<button className='alt-btn l' onClick={handleJobFilters}>
					{filterBtn}
				</button>
				{jobFilters === "myJobs" && <div>{myJobCards}</div>}
			</div>
		</div>
	);
};

export default SearchPage;
