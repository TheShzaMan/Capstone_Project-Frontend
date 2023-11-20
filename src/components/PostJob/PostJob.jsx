import "./PostJob.css";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useState, useEffect } from "react";
import AlertModal from "../AlertModal/AlertModal";
import Map from "../Map/Map";

const PostJob = ({ handleClickPostJob }) => {
	const [user, token] = useAuth();
	const navigate = useNavigate();
	const [clickCoordinates, setClickCoordinates] = useState({}, {});
	const [mapCenter, setMapCenter] = useState("");
	const [displayMap, setDisplayMap] = useState("closed");
	const [confirmPin, setConfirmPin] = useState("");
	const initialValues = {
		Location: confirmPin,
		JobName: "",
		SkillLevel: "",
		JobDescription: "",
		PayPerHour: "",
		IsWorker: false,
	};
	const defaultCenterPos = {
		lat: 31.864646339833772,
		lng: -102.69415872883643,
	};

	useEffect(() => {
		setMapCenter(defaultCenterPos);
	}, []);

	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		postNewJob,
		initialValues
	);

	async function postNewJob() {
		try {
			formData.Location = confirmPin;
			console.log(formData.Location);
			let response = await axios.post(
				"https://localhost:5001/api/Jobs",
				formData,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
		} catch (error) {
			console.warn("Error at postNewJob", error.message);
		}
	}

	const handleMapClick = (e) => {
		const clickLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
		setClickCoordinates(clickLocation);
		setMapCenter(clickLocation);
		// handleDisplayMap();
		// setConfirmPin(`${clickLocation.lat}, ${clickLocation.lng}`);
		setConfirmPin(
			`lat=${clickCoordinates.lat} lng=${clickCoordinates.lng}`
		);
		// console.log(clickLocation);
	};
	const handleDisplayMap = () => {
		displayMap === "closed"
			? setDisplayMap("opened")
			: setDisplayMap("closed");
		// setMapLocation("");
	};

	return (
		<div className='darkout-bg post'>
			<div className='popup-container'>
				<h2>Post New Job</h2>
				<button className='exit-form' onClick={handleClickPostJob}>
					X
				</button>
				<form className='form' onSubmit={handleSubmit}>
					<label>
						<div className='location'>
							<span>To use map for jobsite location </span>
							<span
								className='txt-btn'
								onClick={handleDisplayMap}
							>
								CLICK_HERE
							</span>
						</div>

						<input
							type='text'
							name='Location'
							value={formData.Location}
							onChange={handleInputChange}
							readOnly
						/>
					</label>
					<label>
						Job Type:{" "}
						<input
							type='text'
							name='JobName'
							value={formData.JobName}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Min. Skill Level Required:{" "}
						<select
							name='skillLevel'
							value={formData.skillLevel}
							onChange={handleInputChange}
						>
							<option value='Basic'>
								Basic - Only General Labor
							</option>
							<option value='Advanced'>
								Advanced - More than 3yrs experience. Can
								operate heavy machinery
							</option>
							<option value='Pro'>
								Pro Level - More than 10yrs experience.
								Certified in precision equipment. Documents
								required.
							</option>
						</select>
					</label>
					<label>
						Brief Job Description:{" "}
						<input
							type='text'
							name='JobDescription'
							value={formData.JobDescription}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Pay per hour:{" "}
						<input
							type='text'
							name='PayPerHour'
							value={formData.PayPerHour}
							onChange={handleInputChange}
						/>
					</label>
					<button>Post Job</button>
				</form>
			</div>
			{displayMap === "opened" && (
				<div className='mapclick'>
					<Map
						handleMapClick={handleMapClick}
						setDisplayMap={setDisplayMap}
						clickCoordinates={clickCoordinates}
					/>

					<button className='alt-btn c' onClick={handleDisplayMap}>
						Confirm
					</button>
				</div>
			)}
		</div>
	);
};

export default PostJob;
