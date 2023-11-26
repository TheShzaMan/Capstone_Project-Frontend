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
	const [displayedUser, setDisplayedUser] = useState();
	const [postedByUserId, setPostedByUserId] = useState();
	const [jobFilters, setJobFilters] = useState("allJobs");
	const [myJobs, setMyJobs] = useState([]);
	const [filterBtn, setFilterBtn] = useState("My Jobs");
	//const [job, setJob] = useState("");
	// const [sites, setSites] = useState([]);
	// const [clickCoordinates, setClickCoordinates] = useState({}, {});
	//connect to a post new job form
	// console.log(user.id);
	const thisUserId = user.id;
	useEffect(() => {
		fetchJobs();
	}, []);
	useEffect(() => {
		fetchUser();
	}, [jobToDisplay]);

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
	const fetchUser = async () => {
		try {
			//while (!postedByUserId) {
			//console.log(jobToDisplay);
			let response = await axios.get(
				`https://localhost:5001/api/Reviews/profile/${jobToDisplay}/`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			//}
			console.log("displayedUser:", response.data);

			setDisplayedUser(response.data);
		} catch (error) {
			console.warn("Error in the fetchUser request.", error);
		}
	};
	// console.log(displayedUser);

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
	const filterMyJobs = () => {
		setMyJobs(jobList.filter((job) => job.postedByUser.id === thisUserId));
	};
	const handleDisplayDetail = () => {
		//setPostedByUserId(jobToDisplay.postedByUser.id);

		console.log(jobToDisplay);

		setJobDisplayState(jobDisplayState === "open" ? "closed" : "open");
	};
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
	const myJobCards = myJobs.map((myJob, index) => (
		<JobCard
			oneJob={myJob}
			key={index}
			// handleDisplayDetail={handleDisplayDetail}
			// setJobToDisplay={setJobToDisplay}
		/>
	));

	const availableJobs = jobList.map((oneJob, index) => (
		<JobCard
			oneJob={oneJob}
			key={index}
			handleDisplayDetail={handleDisplayDetail}
			setJobToDisplay={setJobToDisplay}
		/>
	));
	const handleClickApply = () => {};

	// const jobMarkers = jobList.map((job, index) => (
	// 	<Marker position={job.location} />
	// ));
	console.log("jobToDisplay:", jobToDisplay);
	console.log("displayedUser for userCard and reviewCard", displayedUser);

	return !jobList ? (
		<div className='loading'>Loading...</div>
	) : (
		<div className='search-page container'>
			{jobDisplayState === "open" && (
				<div className='darkout-bg'>
					<div className='popup-container'>
						<div className='pop-job-header'>
							<button
								className='alt-btn m'
								onClick={handleClickApply}
							>
								Apply To This Job
							</button>
							<button
								className='exit-form'
								onClick={handleDisplayDetail}
							>
								X
							</button>
						</div>
						<div className='job-details-full'>
							{!jobToDisplay ? (
								<div className='loading'>Loading...</div>
							) : (
								<div className='pop-job-card'>
									<JobCard
										target='pop-job-card'
										oneJob={jobToDisplay}
									/>
								</div>
							)}
							<h2>This Job is Hosted By</h2>
							{displayedUser?.user ? (
								<UserCard
									displayedUser={displayedUser} //erroring on some users because need .user added here.
									thisUserId={thisUserId}
								/>
							) : (
								<div className='loading'>Loading...</div>
							)}
							{/* {!displayedUser && (
								<div className='loading'>Loading...</div>
							)} */}
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
