import "./SearchPage.css";
import Map from "../../components/Map/Map";
import React from "react";
import { useState, useEffect } from "react";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [jobsForMap, setJobsForMap] = useState([]);
	//connect to a post new job form

	return (
		<div className='search-page container'>
			<Map />
		</div>
	);
};

export default SearchPage;
