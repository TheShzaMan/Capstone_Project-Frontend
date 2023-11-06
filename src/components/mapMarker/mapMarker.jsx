import React from "react";
import MarkerPin from "../../icons/pin-marker-map.svg";
const MapMarker = (lat, lng, text) => {
	return (
		<div className='marker-container'>
			<img src={MarkerPin} />
		</div>
	);
};

export default MapMarker;
