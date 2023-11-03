import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
	// The "user" value from this Hook contains user information (id, userName, email) from the decoded token
	// The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
	const [user, token] = useAuth();
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		try {
			let response = await axios.get("https://localhost:5001/api/jobs", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setJobs(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<div className='container'>
			{console.log(jobs)}
			<h1>Home Page for {user.userName}!</h1>
			{jobs &&
				jobs.map((job) => (
					<p key={job.id}>
						{job.name} {job.area} {job.description}
					</p>
				))}
			{/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p> */}
			{/* ))} */}
		</div>
	);
};

export default HomePage;
