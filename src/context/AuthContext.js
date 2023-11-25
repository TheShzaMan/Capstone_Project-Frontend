import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
	if (!user) {
		return null;
	}
	return {
		userName: user.userName,
		id: user.id,
		firstName: user.firstName,
		email: user.email,
		isWorker: user.isWorker,
	};
}

export const AuthProvider = ({ children }) => {
	const BASE_URL = "https://localhost:5001/api/authentication";
	const userToken = JSON.parse(localStorage.getItem("token"));
	const decodedUser = userToken ? jwtDecode(userToken) : null;
	const [token, setToken] = useState(userToken);
	const [user, setUser] = useState(setUserObject(decodedUser));
	const [isServerError, setIsServerError] = useState(false);
	const navigate = useNavigate();

	//\\//\\// ADD AlertModal here for successes and fails \\//\\//

	const registerUser = async (registerData, handleClickModal) => {
		try {
			let finalData = {
				firstName: registerData.firstName,
				lastName: registerData.lastName,
				userName: registerData.username,
				password: registerData.password,
				email: registerData.email,
				phoneNumber: registerData.phoneNumber,
				isWorker: registerData.isWorker,
				availability: registerData.availability,
				payPerHour: registerData.payPerHour,
				skillLevel: registerData.skillLevel,
				businessDescription: registerData.businessDescription,
			};
			let response = await axios.post(`${BASE_URL}`, finalData);
			if (response.status === 201) {
				console.log("Successful registration! Log in to access token");
				setIsServerError(false);
				handleClickModal();
				await new Promise((resolve) => {
					const handleClick = () => {
						document.removeEventListener("click", handleClick);
						resolve();
					};
					document.addEventListener("click", handleClick);
				});

				navigate("/login");
			} else {
				navigate("/register");
			}
		} catch (error) {
			console.log(
				"Problem posting new registration at AuthContext",
				error
			);
		}
	};

	const loginUser = async (loginData) => {
		try {
			let response = await axios.post(`${BASE_URL}/login`, loginData);
			console.log(response);
			if (response.status === 200) {
				localStorage.setItem(
					"token",
					JSON.stringify(response.data.access)
				);
				setToken(JSON.parse(localStorage.getItem("token")));
				let loggedInUser = jwtDecode(response.data.access);
				setUser(setUserObject(loggedInUser));
				setIsServerError(false);
				navigate("/profile");
			} else {
				navigate("/register");
			}
		} catch (error) {
			console.log(error);
			setIsServerError(true);
			//\\//\\  Add modal here for failed login //\\//\\
		}
	};

	const logoutUser = () => {
		if (user) {
			localStorage.removeItem("token");
			setUser(null);
			setToken(null);
			navigate("/");
		}
	};

	const contextData = {
		user,
		token,
		loginUser,
		logoutUser,
		registerUser,
		isServerError,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	);
};
