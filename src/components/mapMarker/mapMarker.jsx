import mapMark from "../../images/location-pin.svg";
import pumpjack from "../../images/oil-jack.svg";
import React from "react";

const mapMarker = (lat, lng, text) => {
	return (
		<div className='marker-container'>
			<img src={mapMark} className='marker'></img>
			<img src={pumpjack} className='jack'></img>
		</div>
	);
};

export default mapMarker;
