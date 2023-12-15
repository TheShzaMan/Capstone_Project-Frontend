import React from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import AlertModal from "../../components/AlertModal/AlertModal";
import useModal from "../../hooks/useModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({
	thisUser,
	token,
	setIsEdited,
	popupState,
	closePopup,
}) => {
	const { modalState, openModal, closeModal } = useModal();
	const [profileEdit, setProfileEdit] = useState({});
	//const [editFormOpenState, setEditFormOpenState] = useState("closed-form");
	const user = thisUser;
	const navigate = useNavigate();
	// console.log(user);

	const defaultValues = {
		skillLevel: user.skillLevel ? user.skillLevel : "",
		availability: user.availability ? user.availability : "",
		payPerHour: user.payPerHour ? user.payPerHour : "",
		businessDescription: user.businessDescription
			? user.businessDescription
			: "",
	};

	useEffect(() => {
		setProfileEdit(defaultValues);
	}, []);

	const putEditProfile = async (formData) => {
		try {
			let finalData = {
				skillLevel: formData.skillLevel ? formData.skillLevel : "",
				availability: formData.availability
					? formData.availability
					: "",
				payPerHour: formData.payPerHour ? formData.payPerHour : 0,
				businessDescription: formData.businessDescription
					? formData.businessDescription
					: "",
			};
			let response = await axios.put(
				`https://localhost:5001/api/Users/${user.id}`,
				finalData,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			openModal();

			// setTimeout(() => console.log(response), 1000);
			// // setPutResponse(response);
			setProfileEdit(finalData);
			// setIsEdited(true);
		} catch (error) {
			console.warn("Error in putEditProfile function.", error);
		}
	};

	// modalState === "modal-inactive" &&
	// 	profileEdit != defaultValues &&
	// 	closePopup();

	const [formData, handleInputChange, handleSubmit] = useCustomForm({
		onSubmit: putEditProfile,
		initialValues: defaultValues,
		//closeModal,
	});

	return (
		<div className={popupState}>
			<div className='darkout-bg'>
				<div className='popup-container'>
					<h2>Edit Profile</h2>
					<button className='exit-form' onClick={() => closePopup()}>
						X
					</button>
					<form className='form' onSubmit={handleSubmit}>
						{user.isWorker === true && (
							<div className='editWorker'>
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
											Advanced - More than 3yrs
											experience. Can operate heavy
											machinery
										</option>
										<option value='Pro'>
											Pro Level - More than 10yrs
											experience. Certified in precision
											equipment. Documents required.
										</option>
									</select>
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
											Anytime, Day or Night Shifts No
											Weekedns
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
								<label>
									<div>*Charge/Pay $ per Hour:</div>
									<span>
										<input
											type='number'
											name='payPerHour'
											cols='4'
											value={formData.payPerHour}
											onChange={handleInputChange}
										/>
									</span>
								</label>
							</div>
						)}
						{user.isWorker === false && (
							<label>
								Short Business Description:{" "}
								<textarea
									name='businessDescription'
									rows='3'
									cols='40'
									value={formData.businessDescription}
									onChange={handleInputChange}
								/>
							</label>
						)}
						<button className='alt-btn' type='submit'>
							SUBMIT
						</button>
					</form>
					<AlertModal
						header='SUCCESS'
						message='Your profile has been successfully edited.'
						closeModal={closeModal}
						modalState={modalState}
						closePopup={closePopup}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProfileForm;
