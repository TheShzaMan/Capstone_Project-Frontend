import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import profileIcon from "../../icons/profile-svgrepo-com.svg";
import PostJob from "../PostJob/PostJob";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
	const { logoutUser, user } = useContext(AuthContext);
	//const [user, token] = useAuth();
	const navigate = useNavigate();
	//let userName = user.userName;
	const [openButtonClass, setOpenButtonClass] = useState("closed-form");
	const [menuDrop, setMenuDrop] = useState("closed-form");

	const handleClickMenu = () => {
		menuDrop === "closed-form"
			? setMenuDrop("open-form")
			: setMenuDrop("closed-form");
	};
	const handleClickJob = () => {
		openButtonClass === "closed-form"
			? setOpenButtonClass("opened-form")
			: setOpenButtonClass("closed-form");
	};

	return (
		<div className='navBar'>
			<ul>
				<li className='brand'>
					<Link
						to='/'
						style={{ textDecoration: "none", color: "white" }}
					>
						<b>Prospector</b>
						<p>{`The Oilfield, Connected.`}</p>
					</Link>
				</li>
				{!user ? (
					" "
				) : (
					<>
						<li>
							<div className='post-job-popup'>
								<button
									className='navbar'
									onClick={handleClickJob}
								>
									Post Job
								</button>
								<div className='openButtonClass' id='myForm'>
									{openButtonClass === "opened-form" && (
										<PostJob />
									)}
								</div>
							</div>
						</li>

						<li className='user'>
							<a>{user.userName}</a>

							<div className='dropdown menuDrop'>
								<button
									className='dropbtn'
									onClick={handleClickMenu}
								>
									<div className='menubtn'></div>
									<div className='menubtn'></div>
									<div className='menubtn'></div>
								</button>
								{/* <button onClick={logoutUser}>Profile</button> */}
								<div className='menuDrop'>
									{menuDrop === "opened-form" && (
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
									)}
								</div>
							</div>
						</li>
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
