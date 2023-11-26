import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
	const { loginUser, isServerError } = useContext(AuthContext);
	const defaultValues = { userName: "", password: "Qw12345^" }; //\\//\\// Change password value back to empty string when done presenting/testing
	const [formData, handleInputChange, handleSubmit, reset] = useCustomForm({
		onSubmit: loginUser,
		initialValues: defaultValues,
		// handleClickModal: {},
	});

	useEffect(() => {
		if (isServerError) {
			reset();
		}
	}, [isServerError]);

	return (
		<div className='container login'>
			<form className='form' onSubmit={handleSubmit}>
				<label>
					Username:{" "}
					<input
						type='text'
						name='userName'
						value={formData.userName}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Password:{" "}
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
					/>
				</label>
				{isServerError ? (
					<p className='error'>
						Login failed, incorrect credentials!
					</p>
				) : null}
				<button>Sign In!</button>
			</form>
			{/* <div classname='link'> */}
			<p className='reg-link'>
				Still need to register? <Link to='/register'>CLICK HERE</Link>
			</p>
			{/* </div> */}
		</div>
	);
};

export default LoginPage;
