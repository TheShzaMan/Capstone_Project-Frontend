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

	const mapsMarkers = [];
	mapsMarkers.push();

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
					lat={31.664044426610904}
					lng={-102.90282387934406}
					Pin={Pin}
				/>
				<MapMarker
					lat='31.55085720431489'
					lng=' -103.26046333621791'
					Pin={Pin}
				/>
				<MapMarker
					lat='32.187949317393645'
					lng='-103.16208294066081'
					Pin={Pin}
				/>
				<MapMarker
					lat='31.39746345498654'
					lng='-103.35549843084951'
					Pin={Pin}
				/>
			</GoogleMapReact>
		</div>
	);
};
export default Map;
