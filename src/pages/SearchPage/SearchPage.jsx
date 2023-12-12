import "./SearchPage.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import useFilter from "../../hooks/useFilter";
import Map from "../../components/Map/Map";

import CardList from "../../components/CardsList/CardsList";
import AlertModal from "../../components/AlertModal/AlertModal";
import { Marker } from "@react-google-maps/api";
import JobDisplay from "../../components/JobDisplay/JobDisplay";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [user, token] = useAuth();
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobDetailDisplayed, setjobDetailDisplayed] = useState(false);
	// const [allJobs, setAllJobs] = useState();
	const [jobList, setJobList] = useState([]);
	const [jobToDisplay, setJobToDisplay] = useState();
	const [displayedUser, setDisplayedUser] = useState(null);
	// const [availJobCards, setAvailableJobs] = useState(null);
	const [postedByUserId, setPostedByUserId] = useState();
	const [filterBtn, setFilterBtn] = useState("My Jobs");
	const [hasApplied, setHasApplied] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState();
	const [userResult, setUserResult] = useState();
	const thisUserId = user.id;
	//const loggedInUser = null;
	const { modalState, openModal, closeModal } = useModal();
	const { myJobs, availJobs } = useFilter();

	// console.log({ user });
	useEffect(() => {
		fetchJobs();
		fetchUser(thisUserId);
	}, []);

	const allJobs = jobList;

	console.log("jobList: ", jobList, "allJobs: ", allJobs);

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
	const fetchAJob = async (jobId) => {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/${jobId}`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			setJobToDisplay(response.data);
		} catch (error) {
			console.warn("Error in the fetchJobs request.", error);
		}
	};
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
			!loggedInUser && setLoggedInUser(response.data);
			setUserResult(response.data);
			//return response.data;

			// console.log();
		} catch (error) {
			console.warn(
				"Error in the fetchUser request in Search Page.",
				error
			);
		}
	};
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
			openModal();
		} catch (error) {
			console.log("Error in handleClickApply Put Request", error);
		}
	};

	// console.log(jobToDisplay);

	const handleJobClick = (thisJob, index) => {
		setJobToDisplay(thisJob);
		fetchUser(thisJob.postedByUser.id);
		setDisplayedUser(userResult);
		// userResult.user.id === jobToDisplay.postedByUser.id &&
		// 	setDisplayedUser(userResult);

		handleJobDisplay();
	};

	const handleJobDisplay = () => {
		setjobDetailDisplayed(!jobDetailDisplayed ? true : false);
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

	return !jobList ? (
		<div className='search-page container'>
			<div className='loading'>Loading...</div>
		</div>
	) : (
		<div className='search-page container'>
			{jobDetailDisplayed && (
				<div className='darkout-bg'>
					<JobDisplay
						jobToDisplay={jobToDisplay}
						loggedInUser={loggedInUser}
						displayedUser={displayedUser}
						handleJobDisplay={handleJobDisplay}
						addUserIdToApplied={addUserIdToApplied}
					/>
					{console.log(
						"loggedInUser: ",
						loggedInUser,
						"displayedUser: ",
						displayedUser
					)}
				</div>
			)}

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
