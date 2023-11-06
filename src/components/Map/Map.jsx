import React from "react";
import GoogleMapReact from "google-map-react";
import API_KEY from "../../config";
import "./Map.css";
// import MapMarker from "../MapMarker/MapMarker";
// import Pin from "../../icons/pin-marker-map.svg";
import Pin from "../../icons/oil-jack.svg";

const Map = () => {
	const defaultProps = {
		center: {
			lat: 31.864646339833772,
			lng: -102.69415872883643,
		},
		zoom: 9,
	};
	const MapMarker = ({ Pin }) => (
		<div>
			<img src={Pin} />
		</div>
	);

	return (
		<div className='map-display' style={{ height: "60vh", width: "60vh" }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: API_KEY,
				}}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<MapMarker
					lat={32.02843624959642}
					lng={-102.05991609093407}
					Pin={Pin}
				/>
			</GoogleMapReact>
		</div>
	);
};
export default Map;
