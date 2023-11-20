import { useState } from "react";

const useCustomForm = (onSubmit, initialValues = {}) => {
	const [formData, setFormValues] = useState(initialValues);

	const handleInputChange = (e) => {
		e.persist();
		if (e.target.name === "isStudent") {
			setFormValues({ ...formData, [e.target.name]: e.target.checked });
		} else if (e.target.value === "") {
			setFormValues({ ...formData, [e.target.name]: initialValues });
		} else {
			setFormValues({ ...formData, [e.target.name]: e.target.value });
		}
		console.log(formData.Location);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const reset = () => {
		setFormValues(initialValues);
	};

	return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
