import "./PostJob.css";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

const PostJob = (props) => {
	const [user, token] = useAuth();
	const navigate = useNavigate();

	const initialValues = {
		Location: "",
		JobName: "",
		SkillLevel: "",
		JobDescription: " ",
		PayPerHour: " ",
	};

	const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
		postNewJob,
		initialValues
	);

	async function postNewJob() {
		try {
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

	return (
		<div className='popup-container'>
			<h2>Post New Job</h2>
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
	);
};

export default PostJob;
