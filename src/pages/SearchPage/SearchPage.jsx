import "./SearchPage.css";
import Map from "../../components/Map/Map";
import React from "react";
import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard/JobCard";

//will be needing to add props to < map/> of a list of marker spots
const SearchPage = () => {
	const [mapState, setMapState] = useState("closed-form");
	const [listState, setListState] = useState("closed-form");
	const [setBtn, setSetBtn] = useState("List View");
	// const [sites, setSites] = useState([]);
	// const [clickCoordinates, setClickCoordinates] = useState({}, {});
	//connect to a post new job form
	// console.log(mapState);
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

	return (
		<div className='search-page container'>
			<div className={mapState}>
				<Map handleToggleMap='handleToggleMap' />
			</div>

			<button className='alt-btn m' onClick={handleToggleMap}>
				{setBtn}
			</button>
		</div>
	);
};

export default SearchPage;
