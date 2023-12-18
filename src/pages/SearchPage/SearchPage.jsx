import "./SearchPage.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import usePopup from "../../hooks/usePopup";
import useFilter from "../../hooks/useFilter";
import Map from "../../components/Map/Map";

import CardList from "../../components/CardsList/CardsList";
import { Marker } from "@react-google-maps/api";
import JobDisplay from "../../components/JobDisplay/JobDisplay";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [user, token] = useAuth();
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobList, setJobList] = useState([]);
	const [jobToDisplay, setJobToDisplay] = useState();
	const [displayedUser, setDisplayedUser] = useState(null);
	const [filterBtn, setFilterBtn] = useState("My Jobs");
	const [loggedInUser, setLoggedInUser] = useState();
	const [jobsApplied, setJobsApplied] = useState([]);
	const [userResult, setUserResult] = useState();
	const thisUserId = user.id;

	const { modalState, openModal, closeModal } = useModal();
	const { popupState, openPopup, closePopup, togglePopup } = usePopup();
	const { myJobs, availJobs } = useFilter();

	// console.log({ user });
	useEffect(() => {
		fetchUser(thisUserId);
	}, []);
	useEffect(() => {
		fetchJobs();
	}, [jobToDisplay, modalState]);

	// console.log(popupState);
	const allJobs = jobList;

	//checkApplied(allJobs);

	console.log(
		"jobList: ",
		jobList,
		"allJobs: ",
		allJobs,
		"jobsApplied: ",
		jobsApplied
	);

	const fetchJobs = async () => {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/avail`
			);
			setJobList(response.data);
		} catch (error) {
			console.warn("Error in the fetchJobs request.", error);
		}
	};
	// const fetchAJob = async (jobId) => {
	// 	try {
	// 		let response = await axios.get(
	// 			`https://localhost:5001/api/Jobs/${jobId}`,
	// 			{
	// 				headers: {
	// 					Authorization: "Bearer " + token,
	// 				},
	// 			}
	// 		);
	// 		setJobToDisplay(response.data);
	// 	} catch (error) {
	// 		console.warn("Error in the fetchJobs request.", error);
	// 	}
	// };

	const fetchUser = async (idToFetch) => {
		console.log(idToFetch);
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Reviews/profile/${idToFetch}/`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			let userData = await response.data;
			!loggedInUser
				? setLoggedInUser(userData)
				: setDisplayedUser(userData);
		} catch (error) {
			console.warn(
				"Error in the fetchUser request in Search Page.",
				error
			);
		}
	};
	console.log(
		"logged in: ",
		loggedInUser,
		"job is posted by: ",
		displayedUser
	);
	const addUserIdToApplied = async () => {
		try {
			let response = await axios.put(
				`https://localhost:5001/api/Jobs/apply/${jobToDisplay.id}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			console.log(response);
			openModal();
		} catch (error) {
			console.log("Error in handleClickApply Put Request", error);
		}
	};

	// console.log(jobToDisplay);

	const handleJobClick = (thisJob, index) => {
		setJobToDisplay(thisJob);
		// checkApplied(thisJob, thisUserId);
		fetchUser(thisJob.postedByUser.id);
		//fetchUser("3f4d8760-db3c-4922-a379-cc8b0a0b6956");

		// if current thisJobToDisplay != previousJobToDisplay && setDisplayedUser(userResult)
		openPopup();
	};
	//console.log(userResult);

	// const handleJobDisplay = () => {
	// 	popupState openPopup();
	// };

	// function checkApplied(jobArray) {
	// 	const jobsThisUserApplied = jobArray.map((job) => {
	// 		job.appliedUserIds.filter((id) => {
	// 			if (id === thisUserId && !jobsApplied.includes(job)) {
	// 				setJobsApplied([...jobsApplied, job]);
	// 			} else {
	// 				return false;
	// 			}
	// 		});
	// 	});
	// }

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

	return !jobList ? (
		<div className='search-page container'>
			<div className='loading'>Loading...</div>
		</div>
	) : (
		<div className='search-page container'>
			<div className={popupState}>
				{!jobToDisplay ? (
					<div className='loading'>Loading...</div>
				) : !displayedUser ? (
					<div className='loading'>Loading...</div>
				) : (
					<div className='darkout-bg'>
						<JobDisplay
							jobToDisplay={jobToDisplay}
							loggedInUser={loggedInUser}
							displayedUser={displayedUser}
							closePopup={closePopup}
							openPopup={openPopup}
							jobsAppliedArray={jobsApplied}
							// hasApplied={hasApplied}
							// setHasApplied={setHasApplied}
							modalState={modalState}
							closeModal={closeModal}
							//handleJobDisplay={handleJobDisplay}
							addUserIdToApplied={addUserIdToApplied}
						/>
						{console.log(
							"loggedInUser: ",
							thisUserId,
							"jobToDisplay: ",
							jobToDisplay,
							"displayedUser: ",
							displayedUser
						)}
					</div>
				)}
			</div>

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
						jobsApplied={jobsApplied}
						thisUserId={thisUserId}
						// hasApplied={hasApplied}
						// setHasApplied={setHasApplied}
					/>
				</>
			)}
		</div>
	);
};

export default SearchPage;
