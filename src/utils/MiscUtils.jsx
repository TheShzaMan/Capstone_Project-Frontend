export const checkForApplied = (job, userId) => {
	return job.appliedUserIds.includes(userId);
};
