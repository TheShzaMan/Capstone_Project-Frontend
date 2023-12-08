import React from "react";
import { useState } from "react";

const useFilter = () => {
	// const [filteredJobs, setFilteredJobs] = useState(initialList);
	// console.log("useFilter initialList: ", initialList);
	const availJobs = (initialList = []) => {
		const jobs = initialList.filter(function (job) {
			return !job.isFulfilled;
		});

		return jobs;
	};

	const myJobs = (thisUserId, initialList = []) => {
		let jobs = initialList.filter(function (job) {
			return job.postedByUser.id === thisUserId;
		});

		return jobs;
	};

	return { myJobs, availJobs };
};
export default useFilter;
