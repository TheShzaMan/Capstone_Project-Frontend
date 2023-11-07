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
				<p className='title-textra r'>
					West Texas and <br />
					<span style={{ marginLeft: "25px" }}>
						Southeastern New Mexico
					</span>
				</p>
				{/* <p className='title-textra r'> </p> */}
				<p
					className='title-textra r'
					style={{ margin: "8px 0", marginLeft: "4vw" }}
				>
					Oilfield JOBS and Skilled
				</p>

				<p
					className='title-textra u'
					style={{ margin: "8px 0", marginLeft: "7vw" }}
				>
					Oilfield WORKERS
				</p>
				<p
					className='title-textra u'
					style={{ margin: "8px 0", marginLeft: "6vw" }}
				>
					Ready to work
				</p>
				<div
					className='title-textra u'
					style={{
						marginTop: "15px",
						marginLeft: "15vw",
						fontSize: "45px",
						textDecoration: "underline",
						fontStyle: "italic",
						color: "gold",
						textShadow: "none",
						fontWeight: "bold",
					}}
				>
					{" "}
					TODAY
				</div>
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
