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

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [user, token] = useAuth();
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobDisplayState, setJobDisplayState] = useState("closed");
	const [jobList, setJobList] = useState([]);
	const [jobToDisplay, setJobToDisplay] = useState();
	const [job, setJob] = useState("");
	const [displayedUser, setDisplayedUser] = useState();

	// const [sites, setSites] = useState([]);
	// const [clickCoordinates, setClickCoordinates] = useState({}, {});
	//connect to a post new job form
	// console.log(mapState);

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/avail`
			);
			console.log(response.data);
			setJobList(response.data);
		} catch (error) {
			console.warn("Error in the fetchJobs request.", error);
		}
	};
	const fetchUser = async () => {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Reviews/profile/${job.postedByUser.id}/`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			setDisplayedUser(response.data);
		} catch (error) {
			console.warn("Error in the fetchUser request.", error);
		}
	};
	// const fetchJobWithReview = async () => {
	// 	try {
	// 		let response = await axios.get(
	// 			`https://localhost:5001/api/Jobs/${job.id}`,
	// 			{
	// 				headers: {
	// 					Authorization: "Bearer " + token,
	// 				},
	// 			}
	// 		);
	// 		console.log(response);
	// 		setJobToDisplay(response);
	// 	} catch (error) {
	// 		console.warn("Error in the fetchJobWithReview", error);
	// 	}
	// };

	const handleDisplayDetail = () => {
		setJobToDisplay(job);
		console.log(job);
		//fetchUser();
		setJobDisplayState(jobDisplayState === "open" ? "closed" : "open");
	};

	const handleToggleMap = () => {
		if (mapState === "closed-form") {
			setMapState("open-form");
			setListState("closed-form");
			setSetBtn("List View");
		} else {
			setMapState("closed-form");
			setListState("opened-form");
			setSetBtn("Map View");
		}
	};
	console.log(setBtn);

	console.log(displayedUser);
	const availableJobs = jobList.map((job, index) => (
		<JobCard
			job={job}
			key={index}
			handleDisplayDetail={handleDisplayDetail}
			setJob={setJob}
		/>
	));
	const jobMarkers = jobList.map((job, index) => (
		<Marker position={job.location} />
	));

	return !jobList ? (
		<div className='loading'>Loading...</div>
	) : (
		<div className='search-page container'>
			{jobDisplayState === "open" && (
				<div className='darkout-bg'>
					<div className='popup-container'>
						<h2>This Job is Hosted By</h2>
						<button
							className='exit-form'
							onClick={handleDisplayDetail}
						>
							X
						</button>
						{displayedUser ? (
							<UserCard displayedUser={displayedUser.user} />
						) : (
							<div className='loading'>Loading...</div>
						)}

						{displayedUser?.totalReviewsJobs > 0 ? (
							<ReviewSummaryCard displayedUser={displayedUser} />
						) : (
							<div className='card'>
								User has not yet been reviewed.
							</div>
						)}
					</div>
				</div>
			)}
			<button className='alt-btn m' onClick={handleToggleMap}>
				{setBtn}
			</button>
			{setBtn === "List View" && (
				<div className={mapState}>
					<Map
						handleToggleMap={handleToggleMap}
						jobMarkers={jobMarkers}
					/>
				</div>
			)}
			{setBtn === "Map View" && <div>{availableJobs}</div>}
		</div>
	);
};

export default SearchPage;
