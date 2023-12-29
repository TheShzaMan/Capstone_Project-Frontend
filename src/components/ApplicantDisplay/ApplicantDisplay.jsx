import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ApplicantDisplay = ({ job }) => {
	const [applicantList, setApplicantList] = useState([]);

	useEffect(() => {
		job && fetchApplicants();
	}, []);

	const fetchApplicants = async () => {
		try {
			let response = await axios.get(
				` https://localhost:5001/api/Users/appliedto/${job.id}`
			);
			console.log(response);
		} catch (error) {
			console.warn("Error in the fetchApplicants get request", error);
		}
	};
	return <></>;
};

export default ApplicantDisplay;
