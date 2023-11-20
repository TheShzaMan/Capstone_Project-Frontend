import "./SearchPage.css";
import Map from "../../components/Map/Map";
import React from "react";
import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard/JobCard";
import axios from "axios";
import { Marker } from "@react-google-maps/api";
//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("Map View");
	const [jobList, setJobList] = useState([]);
	const [setJobToDisplay, setSetJobToDisplay] = useState();
	// const [sites, setSites] = useState([]);
	// const [clickCoordinates, setClickCoordinates] = useState({}, {});
	//connect to a post new job form
	// console.log(mapState);

	useEffect(() => {
		fetchJobs();
	}, []);

	async function fetchJobs() {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/avail`
			);
			console.log(response.data);
			setJobList(response.data);
		} catch (error) {
			console.warn("Error in the fetchJobs request.", error);
		}
	}
	async function fetchJobWithReview(jobId) {
		try {
			let response = await axios.get(
				`https://localhost:5001/api/Jobs/${jobId}`
			);
			console.log(response);
			setJobToDisplay(response);
		} catch (error) {
			console.warn("Error in the fetchJobWithReview", error);
		}
	}
	// const handleDisplayDetail = (jobId) => {
	// 	fetchJobWithReview({ jobId });
	// };
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

	console.log(jobList);
	const availableJobs = jobList.map((job, index) => (
		<JobCard job={job} key={index} />
	));
	const jobMarkers = jobList.map((job, index) => (
		<Marker position={job.location} />
	));
	// const jobsByCard = jobList.map((job) => {
	// 	<JobCard singleJob={job} />;
	// });
	return !jobList ? (
		<div className='loading'>Loading...</div>
	) : (
		<div className='search-page container'>
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
