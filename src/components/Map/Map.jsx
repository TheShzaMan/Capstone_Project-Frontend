import React, { useEffect } from "react";
import { useState, useCallback } from "react";
// import { AdvancedMarker } from "google-map-react";
import {
	GoogleMap,
	useJsApiLoader,
	maps,
	Marker,
} from "@react-google-maps/api";

import API_KEY from "../../config.js";
import "./Map.css";
import MapMarker from "../MapMarker/MapMarker";
// import Pin from "../../icons/pin-marker-map.svg";
import Pin from "../../icons/oil-jack.svg";
import googleMapReact from "google-map-react";

const Map = () => {
	const [clickCoordinates, setClickCoordinates] = useState({}, {});
	// const [map, setMap] = useState(null);
	const [sites, setSites] = useState([]);

	useEffect(() => {
		setClickCoordinates(defaultProps);
	}, []);

	const defaultProps = {
		lat: 31.864646339833772,
		lng: -102.69415872883643,
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: API_KEY,
	});

	const center = { lat: 31.864646339833772, lng: -102.69415872883643 };
	const pin = { lat: 32.187949317393645, lng: -103.16208294066081 };

	// const onLoad = useCallback(function callback(map) {
	// 	const bounds = new window.google.maps.LatLngBounds(center);
	// 	map.fitBounds(bounds);
	// 	setMap(map);
	// }, []);

	// const onUnmount = useCallback(function callback(map) {
	// 	setMap(null);
	// }, []);
	// async function initMap() {
	// 	// const map = new GoogleMap({ zoom: 9, center: center });
	// 	const marker = new Marker({ map, postion: pin });

	const handleMapClick = (e) => {
		const coordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
		setClickCoordinates(coordinates);
		let updatedSites = [...sites, coordinates];
		setSites(updatedSites);
	};
	//const addSite = (site) => {
	// setSites(...sites, clickCoordinates);

	return isLoaded ? (
		// initMap()
		<GoogleMap
			zoom={9}
			center={clickCoordinates}
			mapContainerClassName='map-display'
			onClick={handleMapClick}
		>
			{sites.map((site) => (
				<Marker position={site} />
			))}
		</GoogleMap>
	) : (
		<div className='loading'>Loading...</div>
	);

	// const defaultProps = {
	// 		center: {
	// 			lat: 31.864646339833772,
	// 			lng: -102.69415872883643,
	// 		},
	// 		zoom: 9,
	// 	};
	// 	// const sites = () => {

	// 		// };

	// 		return (
	// 			<div className='map-display'>
	// 			<GoogleMapReact
	// 				// bootstrapURLKeys={{ key: API_KEY }}

	// 				defaultCenter={defaultProps.center}
	// 				defaultZoom={defaultProps.zoom}
	// 				yesIWantToUseGoogleMapApiInternals
	// 				// onGoogleApiLoaded={({ map, maps }) =>
	// 				// 	handleApiLoaded(map, maps)
	// 				// }
	// 				onClick={handleMapClick}
	// 			>
	// 				{/* {sites.map((site) => (
	// 					<MapMarker
	// 						key={site.id}
	// 						text={site.name}
	// 						lat={site.geometry.location.lat}
	// 						lng={site.geometry.location.lng}
	// 					/>
	// 				))} */}
	// 				<MapMarker lat={31.664044426610904} lng={-102.90282387934406} />
	// 				{/* bootstrapURLKeys={{
	// 					key: API_KEY,
	// 				}}
	// 				defaultCenter={defaultProps.center}
	// 				defaultZoom={defaultProps.zoom}
	// 			>
	// 				<MapMarker
	// 					lat={31.664044426610904}
	// 					lng={-102.90282387934406}
	// 				/>
	// 				<MapMarker
	// 					lat='31.55085720431489'
	// 					lng=' -103.26046333621791'
	// 				/>
	// 				<MapMarker
	// 					lat='32.187949317393645'
	// 					lng='-103.16208294066081'
	// 				/>
	// 				<MapMarker
	// 					lat='31.39746345498654'
	// 					lng='-103.35549843084951'
	// 				/> */}
	// 			</GoogleMapReact>
	// 		</div>
	// 	);
};
export default Map;
