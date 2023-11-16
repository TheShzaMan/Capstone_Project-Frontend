import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css";

const RegisterPage = () => {
	const { registerUser } = useContext(AuthContext);
	const defaultValues = {
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		email: "",
		phoneNumber: "",
		isWorker: false,
		availability: "",
		payPerHour: 1.0,
		skillLevel: "Basic",
		businessDescription: "",
	};
	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		registerUser,
		defaultValues
	);

	return (
		<div className='register-form container'>
			<form onSubmit={handleSubmit}>
				<label className='isWorker'>
					<p>Looking For:</p>
					<div>
						<registerUser />
						<select
							className='isWorker'
							name='isWorker'
							value={formData.isWorker}
							onChange={handleInputChange}
						>
							<option value={true}>Jobs</option>
							<option value={false}>Workers</option>
						</select>
					</div>
				</label>

				{/* <p>Looking For:</p>
					<label className='radio' name='isWorker'>
						Work
						<input
							//defaultChecked={formData.isWorker === true}
							type='button'
							name='isWorker'
							value={formData.isWorker === true}
							checked={formData.isWorker === true}
							onChange={handleInputChange}
						/>
						<span className='checkmark'></span>
					</label>
					<label className='radio' name='isworker'>
						Workers
						<input
							//defaultChecked={formData.isWorker === false}
							type='radio'
							name='isWorker'
							value={formData.isWorker === false}
							checked={formData.isWorker === false}
							onChange={handleInputChange}
						/>
						<span className='checkmark'></span>
					</label>
					<h5 className='required'>* = required</h5> */}

				<label>
					*First Name/Company Name:{" "}
					<input
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={handleInputChange}
						required
					/>
				</label>

				<label>
					Last Name:{" "}
					<input
						type='text'
						name='lastName'
						value={formData.lastName}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					*Username:{" "}
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					*Password:{" "}
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Email:{" "}
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Mobile Number:{" "}
					<input
						type='phoneNumber'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleInputChange}
					/>
				</label>

				<label>
					*Availability:{" "}
					<select
						name='availability'
						value={formData.availability}
						onChange={handleInputChange}
					>
						<option value='Anytime Day or Night Any Day'>
							Anytime, Day or Night Shifts
						</option>
						<option value='Anytime Day or Night No Weekends'>
							Anytime, Day or Night Shifts No Weekedns
						</option>
						<option value='Only Day shifts Any Day'>
							Only Day Shift Any Day
						</option>
						<option value='Only Day shifts No Weekends'>
							Only Day shifts No Weekends
						</option>
						<option value='Only Night shifts Any Day'>
							Only Day shifts No Weekends
						</option>
						<option value='Only Night shifts No Weekends'>
							Only Night shifts No Weekends
						</option>
					</select>
				</label>
				<label>
					<div>*Charge/Pay per Hour:</div>
					<span>
						{" $"}

						<input
							type='number'
							name='payPerHour'
							cols='4'
							value={formData.payPerHour}
							onChange={handleInputChange}
							required
						/>
					</span>
				</label>
				<label>
					Skill Level:{"Select"}
					<select
						name='skillLevel'
						value={formData.skillLevel}
						onChange={handleInputChange}
					>
						<option value='Basic'>
							Basic - Only General Labor
						</option>
						<option value='Advanced'>
							Advanced - More than 3yrs experience. Can operate
							heavy machinery
						</option>
						<option value='Pro'>
							Pro Level - More than 10yrs experience. Certified in
							precision equipment. Documents required.
						</option>
					</select>
				</label>
				<label>
					Short Business Description:{" "}
					<textarea
						name='businessDescription'
						rows='2'
						cols='40'
						value={formData.businessDescription}
						onChange={handleInputChange}
					/>
				</label>

				<button>Register!</button>
			</form>
		</div>
	);
};

export default RegisterPage;
