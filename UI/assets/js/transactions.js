let getAccountTransactions = (accountNumber, data = null) => {
	let accessToken = getAccessToken();
    return getRequest(baseUrl +'/accounts/'+ accountNumber +'/transactions', null, accessToken);
}