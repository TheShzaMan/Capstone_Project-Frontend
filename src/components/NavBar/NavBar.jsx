import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import profileIcon from "../../icons/profile-svgrepo-com.svg";

const Navbar = () => {
	const { logoutUser, user } = useContext(AuthContext);
	const navigate = useNavigate();
	//let userName = user.userName;

	return (
		<div className='navBar'>
			<ul>
				<li className='brand'>
					<Link
						to='/'
						style={{ textDecoration: "none", color: "white" }}
					>
						<b>Shea's Oilfield App</b>
						<p>with NO name...yet</p>
					</Link>
				</li>

				{user ? (
					<>
						<li className='user'>
							<p>{user.userName}</p>
						</li>
						<li className='dropdown'>
							<div className='dropbtn'>
								<div className='menubtn'></div>
								<div className='menubtn'></div>
								<div className='menubtn'></div>
							</div>
							{/* <button onClick={logoutUser}>Profile</button> */}
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
						</li>
					</>
				) : (
					// <button onClick={() => navigate("/profile")}></button>
					<button onClick={() => navigate("/login")}>Sign In</button>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
