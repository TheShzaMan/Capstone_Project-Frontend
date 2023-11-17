import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

import { useState } from "react";

const Navbar = () => {
	const { logoutUser, user } = useContext(AuthContext);
	//const [user, token] = useAuth();
	const navigate = useNavigate();
	//let userName = user.userName;

	const [menuDropState, setMenuDropState] = useState("closed-menu");

	const handleClickMenu = () => {
		menuDropState === "closed-menu"
			? setMenuDropState("opened-menu")
			: setMenuDropState("closed-menu");
	};

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

							<div className='dropdown'>
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
