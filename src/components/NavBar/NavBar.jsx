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

				<li>
					{user ? (
						<div class='dropdown'>
							<img
								class='dropbtn'
								src={profileIcon}
								alt='profile icon'
							/>
							{/* <button onClick={logoutUser}>Profile</button> */}

							<div class='dropdown-content'>
								<Link
									to='/profile'
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									Profile
								</Link>
								<a onClick={logoutUser}>SignOut</a>
							</div>
						</div>
					) : (
						// <button onClick={() => navigate("/profile")}></button>
						<button onClick={() => navigate("/login")}>
							Sign In
						</button>
					)}
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
