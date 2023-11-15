import React from "react";
import Pin from "../../icons/oil-jack.svg";
import { Marker } from "@react-google-maps/api";
const MapMarker = ({ position }) => {
	return (
		<Marker position={position} />
		// 	<img src={Pin} alt='pump jack icon' />
		// </Marker>
	);
};

export default MapMarker;
