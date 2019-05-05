let getAccountTransactions = (accountNumber, data = null) => {
	let accessToken = getAccessToken();
    return getRequest(baseUrl +'/accounts/'+ accountNumber +'/transactions', null, accessToken);
}

let getTransactions = (data = null) => {
	let accessToken = getAccessToken();
	return getRequest(baseUrl +'/transactions', null, accessToken);
}