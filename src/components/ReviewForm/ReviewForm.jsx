import "./ReviewForm.css";
import React from "react";
import { useCustomForm } from "../../hooks/useCustomForm";
import useAuth from "../../hooks/useAuth";

//		--Needs the reviewedUserId attached somehow so that it can be passed into and used
//  	by the get request when needed.

const ReviewForm = (reviewedUser) => {
	const [user, token] = useAuth();

	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		loginUser,
		defaultValues
	);
	return (
		<div className='container review'>
			<form className='form' onSubmit={handleSubmit}>
				<h2>Leave your Review for {reviewedUser.username}</h2>
				<h3>
					Give a score of 0 - 5 in each category with a 5 being the
					best score possible
				</h3>

				<label>
					Adherence to offer-
					<input
						type=''
						name=''
						value={formData.userName}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					" ":{" "}
					<input
						type=''
						name=''
						value={formData.password}
						onChange={handleInputChange}
					/>
				</label>

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

export default ReviewForm;
