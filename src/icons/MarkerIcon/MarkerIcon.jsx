// import mapMark from "../../images/location-pin.svg";
// import pumpjack from "../../images/oil-jack.svg";
// // import "./MarkerIcon.css";

// const MarkerIcon = () => {
// 	const markerStyle = {
// 		position: "relative",
// 		zIndex: 1,
// 	};
// 	const jackStyle = {
// 		position: "absolute",
// 		zIndex: 2,
// 		top: "60px",
// 		left: "100px",
// 	};
// 	return (
// 		<div className='whole-marker' style={markerStyle}>
// 			<img src={mapMark} className='marker'></img>
// 			<div className='just-jack' style={jackStyle}>
// 				<img src={pumpjack} className='jack'></img>
// 			</div>
// 		</div>
// 	);
// };

// export default MarkerIcon;
import * as React from "react";
import MarkerPin from "../../images/pin-marker-map.svg";
const MarkerIcon = () => {
	return <img src={MarkerPin} height='50px' width='50px' />;
};
export default MarkerIcon;
