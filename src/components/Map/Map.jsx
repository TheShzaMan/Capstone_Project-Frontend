import React from "react";
import GoogleMapReact from "google-map-react";
import API_KEY from "../../config";
import "./Map.css";
import mapMarker from "../../components/mapMarker/mapMarker";

function Map() {
	const defaultProps = {
		center: {
			lat: 32.02843624959642,
			lng: -102.05991609093407,
		},
		zoom: 8,
	};
	// const markerSpot = ({ text }) => <div>{text}</div>;

	return (
		<div className='map-display' style={{ height: "60vh", width: "60vh" }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: API_KEY,
				}}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<mapMarker
					lat={32.02843624959642}
					lng={-102.05991609093407}
					text='My Marker'
				/>
			</GoogleMapReact>
		</div>
	);
}
export default Map;
