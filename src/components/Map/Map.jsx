import React from "react";
import { useState } from "react";
// import GoogleMapReact from "google-map-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import API_KEY from "../../config";
import "./Map.css";
// import MapMarker from "../MapMarker/MapMarker";
// import Pin from "../../icons/pin-marker-map.svg";
import Pin from "../../icons/oil-jack.svg";

const Map = () => {
	const [clickCoordinates, setClickCoordinates] = useState({});
	const [sites, setSites] = useState([]);
	const defaultProps = {
		center: {
			lat: 31.864646339833772,
			lng: -102.69415872883643,
		},
		zoom: 9,
	};
	// const sites = () => {

	const mapStyles = {
		height: "100vh",
		width: "100%",
	};

	// };
	const MapMarker = ({ Pin }) => (
		<div>
			<img src={Pin} />
		</div>
	);
	const handleMapClick = (e) => {
		console.log(e.latLng.lat(), e.latLng.lng());
		setClickCoordinates(e.latLng.lat(), e.latLng.lng());
		console.log(clickCoordinates);
	};

	return (
		<div className='map-display' style={{ height: "100vh", width: "100%" }}>
			<LoadScript googleMapsApiKey={{ API_KEY }}>
				<GoogleMap
					// bootstrapURLKeys={{ key: API_KEY }}
					mapContainerStyle={mapStyles}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					yesIWantToUseGoogleMapApiInternals
					// onGoogleApiLoaded={({ map, maps }) =>
					// 	handleApiLoaded(map, maps)
					// }
					onClick={handleMapClick}
				>
					{/* {sites.map((site) => (
					<MapMarker
						key={site.id}
						text={site.name}
						lat={site.geometry.location.lat}
						lng={site.geometry.location.lng}
					/>
				))} */}
					<MapMarker lat={59.955413} lng={30.337844} />
					{/* bootstrapURLKeys={{
					key: API_KEY,
				}}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<MapMarker
					lat={31.664044426610904}
					lng={-102.90282387934406}
				/>
				<MapMarker
					lat='31.55085720431489'
					lng=' -103.26046333621791'
				/>
				<MapMarker
					lat='32.187949317393645'
					lng='-103.16208294066081'
				/>
				<MapMarker
					lat='31.39746345498654'
					lng='-103.35549843084951'
				/> */}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};
export default Map;
