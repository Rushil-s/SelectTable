const userToSessionUser = (user) => {
	return { userId: user.id, firstName: user.firstName };
};

module.exports = { userToSessionUser };
