//General Imports
import React from "react";
import "./SearchPage.css";
import axios from "axios";

//Component Imports
import Map from "../../components/Map/Map";
import CardList from "../../components/CardsList/CardsList";
import { Marker } from "@react-google-maps/api";
import JobDisplay from "../../components/JobDisplay/JobDisplay";

//Hooks and Util Imports
import { useState, useEffect } from "react";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import usePopup from "../../hooks/usePopup";
import useFilter from "../../hooks/useFilter";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [user, token] = useAuth();
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobList, setJobList] = useState();
	const [jobToDisplay, setJobToDisplay] = useState();
	const [displayedUser, setDisplayedUser] = useState(null);
	const [filterBtn, setFilterBtn] = useState("My Jobs");
	const [loggedInUser, setLoggedInUser] = useState();

	const { modalState, openModal, closeModal } = useModal();
	const { popupState, openPopup, closePopup, togglePopup } = usePopup();
	const { myJobs, availJobs } = useFilter();

	const thisUserId = user.id;

	useEffect(() => {
		fetchUser(thisUserId);
	}, []);
	useEffect(() => {
		fetchJobs();
	}, [jobToDisplay, modalState]);

	const allJobs = jobList;

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

	const handleJobClick = (thisJob, index) => {
		setJobToDisplay(thisJob);
		fetchUser(thisJob.postedByUser.id);
		openPopup();
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
				<CardList
					arrayType='jobs'
					cardArray={jobList}
					eventListner={handleJobClick}
					thisUserId={thisUserId}
				/>
			)}

			{/* JobDisplay to popup upon click on a jobCard or map marker */}
			{jobToDisplay && displayedUser && (
				<>
					<JobDisplay
						jobToDisplay={jobToDisplay}
						loggedInUser={loggedInUser}
						displayedUser={displayedUser}
						togglePopup={togglePopup}
						popupState={popupState}
						modalState={modalState}
						closeModal={closeModal}
						addUserIdToApplied={addUserIdToApplied}
					/>
				</>
			)}
		</div>
	);
};

export default SearchPage;
