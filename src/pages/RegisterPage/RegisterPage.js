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
		phoneNumber: 0,
		isWorker: true,
		availability: "",
		wagePerHour: 0.0,
		experience: "",
		businessDescription: "",
	};
	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		registerUser,
		defaultValues
	);

	return (
		<div className='register-form container'>
			<form onSubmit={handleSubmit}>
				<label>
					First Name:{" "}
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
					Username:{" "}
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Password:{" "}
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
						type='text'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Mobile Number:{" "}
					<input
						type='text'
						name='mobileNumber'
						value={formData.phoneNumber}
						onChange={handleInputChange}
					/>
				</label>
				<div className='isWorker'>
					<p>Looking For:</p>
					<label className='radio' name='isWorker'>
						<input
							defaultChecked={formData.isWorker === true}
							type='radio'
							id='isWorker'
							name='isWorker?'
							value={formData.isWorker}
						/>
						Work
						<span className='checkmark'></span>
					</label>
					<label className='radio' name='notWorker'>
						Workers
						<input
							defaultChecked={formData.isWorker === false}
							type='radio'
							id='notWorker'
							name='isWorker?'
							value={!formData.isWorker}
						/>
						<span className='checkmark'></span>
					</label>
				</div>

				<label>
					Availability:{" "}
					<input
						type='text'
						name='availability'
						value={formData.availability}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Charge/Pay per Hour:{" $"}
					<input
						type='number'
						name='wagePerHour'
						cols='4'
						value={formData.wagePerHour}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Experience Level:{" "}
					<input
						type='text'
						name='experience'
						value={formData.experience}
						onChange={handleInputChange}
					/>
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
