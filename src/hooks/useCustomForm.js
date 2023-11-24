import { useState } from "react";

const useCustomForm = (onSubmit, initialValues = {}, setModalState) => {
	const [formData, setFormValues] = useState(initialValues);

	const handleInputChange = (e) => {
		e.persist();
		if (e.target.name === "isStudent") {
			setFormValues({ ...formData, [e.target.name]: e.target.checked });
		} else {
			setFormValues({ ...formData, [e.target.name]: e.target.value });
		}
		//console.log(formData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData, setModalState);
	};

	const reset = () => {
		setFormValues(initialValues);
	};

	return [formData, handleInputChange, handleSubmit, reset, setModalState];
};

export default useCustomForm;
