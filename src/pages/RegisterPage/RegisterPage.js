import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css";
import { useState } from "react";
import AlertModal from "../../components/AlertModal/AlertModal";

const RegisterPage = () => {
	const { registerUser } = useContext(AuthContext);
	const [formType, setFormType] = useState("worker");
	const [modalState, setModalState] = useState("modal-inactive");
	const [isWorkerInput, setIsWorkerInput] = useState(false);
	const handleClickModal = () => {
		modalState === "modal-active"
			? setModalState("modal-inactive")
			: setModalState("modal-active");
	};
	const defaultValues = {
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		email: "",
		phoneNumber: "",
		isWorker: "",
		availability: "",
		payPerHour: "",
		skillLevel: "",
		businessDescription: "",
	};
	const [formData, handleInputChange, handleSubmit] = useCustomForm(
		registerUser,
		defaultValues,
		handleClickModal
	);
	const handleClickJ = () => {
		formType === "provider" && setFormType("worker");
		setIsWorkerInput(true);
	};
	const handleClickW = () => {
		formType === "worker" && setFormType("provider");
		setIsWorkerInput(false);
	};
	const updatedIsWorker = { ...formData, isWorker: `${isWorkerInput}` };

	// formData.isWorker === true
	// 	? setFormType("worker")
	// 	: setFormType("provider");

	return (
		<div className='register-form container'>
			<form onSubmit={handleSubmit}>
				<label className='isWorker'>
					<p>Looking For:</p>
					<div className='work-select'>
						{/* <select
							className='isWorker'
							name='isWorker'
							value={formData.isWorker}
							onChange={handleInputChange} */}

						<button
							type='radio'
							className={formType}
							target='workerbtn'
							name='isWorker'
							onClick={handleClickJ}
							// checked={true}
							value={formData.isWorker}
							onChange={handleInputChange}
						>
							Jobs
						</button>
						<button
							type='radio'
							className={formType}
							target='providerbtn'
							name='isWorker'
							onClick={handleClickW}
							// checked={false}
							value={formData.isWorker}
							onChange={handleInputChange}
						>
							Workers
						</button>
						{/* </select> */}
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
					{formType === "provider"
						? `*Company Name:${" "}`
						: `First Name:${" "}`}
					<input
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={handleInputChange}
					/>
				</label>

				{formType === "worker" && (
					<label>
						Last Name:{" "}
						<input
							type='text'
							name='lastName'
							value={formData.lastName}
							onChange={handleInputChange}
						/>
					</label>
				)}
				<label>
					*Username:{" "}
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					*Password:{" "}
					<input
						type='password'
						name='password'
						pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
						title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
						value={formData.password}
						onChange={handleInputChange}
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
				{formType === "worker" && (
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
								Only Night shifts Any Night
							</option>
							<option value='Only Night shifts No Weekends'>
								Only Night shifts No Weekends
							</option>
						</select>
					</label>
				)}
				{formType === "worker" && (
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
							/>
						</span>
					</label>
				)}
				{formType === "worker" && (
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
								Advanced - More than 3yrs experience. Can
								operate heavy machinery
							</option>
							<option value='Pro'>
								Pro Level - More than 10yrs experience.
								Certified in precision equipment. Documents
								required.
							</option>
						</select>
					</label>
				)}
				{formType === "provider" && (
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
				)}
				<button>Register!</button>
			</form>
			<div className={modalState}>
				<AlertModal
					header='Welcome to Prospector'
					message="You have officially registered and unlocked full feature use. Whether you're prospecting for jobs or for workers, you'll find it all with Prospector!"
					handleClickModal={handleClickModal}
				/>
			</div>
		</div>
	);
};

export default RegisterPage;
