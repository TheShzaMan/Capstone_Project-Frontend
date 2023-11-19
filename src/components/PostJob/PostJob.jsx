import "./PostJob.css";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useState } from "react";
import AlertModal from "../AlertModal/AlertModal";

const PostJob = ({ handleClickPostJob, handleClickModal }) => {
	const [user, token] = useAuth();
	const navigate = useNavigate();

	const [jobForMap, setJobForMap] = useState([]);
	const initialValues = {
		Location: "",
		JobName: "",
		SkillLevel: "",
		JobDescription: "",
		PayPerHour: "",
		IsWorker: false,
	};

	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		postNewJob,
		initialValues
	);

	async function postNewJob() {
		try {
			console.log(user);
			let response = await axios.post(
				"https://localhost:5001/api/Jobs",
				formData,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			handleClickModal();
		} catch (error) {
			console.warn("Error at postNewJob", error.message);
		}
	}

	return (
		<div className='darkout-bg post'>
			<div className='popup-container'>
				<h2>Post New Job</h2>
				<button className='exit-form' onClick={handleClickPostJob}>
					X
				</button>
				<form className='form' onSubmit={handleSubmit}>
					<label>
						Location:{" "}
						<input
							type='text'
							name='Location'
							value={formData.Location}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Job:{" "}
						<input
							type='text'
							name='JobName'
							value={formData.JobName}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Min. Skill Level Required:{" "}
						<input
							type='text'
							name='SkillLevel'
							value={formData.SkillLevel}
							onChange={handleInputChange}
						/>
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
		</div>
	);
};

export default PostJob;
