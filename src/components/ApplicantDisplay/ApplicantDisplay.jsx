import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import CardList from "../CardsList/CardsList";

const ApplicantDisplay = ({ job }) => {
	const [user, token] = useAuth();
	const [applicantList, setApplicantList] = useState();
	const thisUserId = user.id;

	useEffect(() => {
		job && fetchApplicants();
	}, []);

	const fetchApplicants = async () => {
		try {
			let response = await axios.get(
				` https://localhost:5001/api/Users/appliedto/${job.id}`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			setApplicantList(response.data);
		} catch (error) {
			console.warn("Error in the fetchApplicants get request", error);
		}
	};
	return !applicantList ? (
		<div className='loading'>Loading...</div>
	) : (
		<>
			<CardList arrayType={"users"} cardArray={applicantList} />
		</>
	);
};

export default ApplicantDisplay;
