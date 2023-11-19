import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import PostJob from "../PostJob/PostJob";
import AlertModal from "../AlertModal/AlertModal";

import { useState } from "react";

const Navbar = () => {
	const { logoutUser, user } = useContext(AuthContext);
	const [menuDropState, setMenuDropState] = useState("closed-menu");
	const [jobFormState, setJobFormState] = useState("closed-form");
	const [modalState, setModalState] = useState("modal-inactive");
	const navigate = useNavigate();
	//const [user, token] = useAuth();
	//let userName = user.userName;
	// const [menuBtnState, setMenuBtnState] = useState("closed");

	const handleClickMenu = () => {
		menuDropState === "closed-menu"
			? setMenuDropState("opened-menu")
			: setMenuDropState("closed-menu");
	};
	const handleClickPostJob = () => {
		jobFormState === "closed-form"
			? setJobFormState("opened-form")
			: setJobFormState("closed-form");
	};
	const handleClickModal = () => {
		modalState === "modal-active"
			? setModalState("modal-inactive")
			: setModalState("modal-active");
	};
	console.log("modalState:", modalState);

	return (
		<div className='navBar'>
			<ul>
				<li className='brand'>
					<Link
						to='/'
						style={{
							textDecoration: "none",
							color: "white",
							fontStyle: "italic",
						}}
					>
						<b>Prospector</b>
						<p>{`The Oilfield, Connected.`}</p>
					</Link>
				</li>
				{!user ? (
					" "
				) : (
					<>
						<li className='user'>
							<a className='user'>{user.userName}</a>

							<div className='dropdown' onClick={handleClickMenu}>
								<div
									className='dropbtn'
									onClick={handleClickMenu}
								>
									<div className='menubtn'></div>
									<div className='menubtn'></div>
									<div className='menubtn'></div>
								</div>
								{/* <button onClick={logoutUser}>Profile</button> */}
								<div className={menuDropState}>
									<div className='dropdown-content'>
										<Link
											to='/'
											style={{
												textDecoration: "none",
												color: "white",
											}}
										>
											Home
										</Link>
										<Link
											to='/profile'
											style={{
												textDecoration: "none",
												color: "white",
											}}
										>
											Profile
										</Link>
										{!user.isWorker && (
											<a onClick={handleClickPostJob}>
												Post Job
											</a>
										)}
										<Link
											to='/search'
											style={{
												textDecoration: "none",
												color: "white",
											}}
										>
											Search
										</Link>
										<a onClick={logoutUser}>SignOut</a>
									</div>
								</div>
							</div>
						</li>
						<div className={jobFormState}>
							<div className='darkout-bg post'>
								<PostJob
									handleClickPostJob={handleClickPostJob}
								/>
							</div>
							<div className={modalState}>
								<AlertModal
									header='JOB POSTED!'
									message='Your job has been added to the list of available jobs and can be accessed on the map.'
									handleClickModal={handleClickModal}
								/>
							</div>
						</div>
					</>
				)}
				{!user && (
					<li className='signin'>
						<button onClick={() => navigate("/register")}>
							Sign Up
						</button>
						<button onClick={() => navigate("/login")}>
							Sign In
						</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
