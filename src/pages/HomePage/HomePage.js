import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import JobCard from "../../components/JobCard/JobCard";
import "./HomePage.css";
import { Link } from "react-router-dom";

import axios from "axios";

const HomePage = () => {
	// The "user" value from this Hook contains user information (id, userName, email) from the decoded token
	// The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication

	//const [user, token] = useAuth();
	const [jobs, setJobs] = useState();

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		try {
			let response = await axios.get("https://localhost:5001/api/jobs", {
				// headers: {
				// 	Authorization: "Bearer " + token,
				// },
			});
			setJobs(response.data);
			//console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<div className='homepage container'>
			<div className='title'>
				<div className='title-textra r one'>
					<p>West Texas and</p>
					<p className='pb'> Southeastern New Mexico</p>
				</div>
				<p className='title-textra r two'>...Oilfield JOBS...</p>

				<p className='title-textra r three '>...Oilfield WORKERS...</p>
				<p className='title-textra r four'>
					Find them all in one place,
				</p>
				<div className='title-textra u'> Prospector</div>
			</div>
			<div className='homebody'>
				<h3>
					<Link to='/register'>SIGN UP</Link> or{" "}
					<Link to='/login'>SIGN IN</Link> to get connected.
				</h3>
			</div>

			{/* {jobs ? (
				<div>
					{jobs.map((job) => (
						<JobCard job={job} key={job.id} />
					))}
				</div>
			) : (
				<div className='loading'>
					<h2>Loading...</h2>
				</div>
			)}*/}
		</div>
	);
};

export default HomePage;
