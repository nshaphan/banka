let getUsers = (data = null) => {
	let accessToken = getAccessToken();
	return getRequest(baseUrl +'/users', data, accessToken);
}