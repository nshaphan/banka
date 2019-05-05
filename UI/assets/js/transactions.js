const getAccountTransactions = (accountNumber, data = null) => {
	let accessToken = getAccessToken();
    return getRequest(baseUrl +'/accounts/'+ accountNumber +'/transactions', null, accessToken);
}

const getTransactions = (data = null) => {
	let accessToken = getAccessToken();
	return getRequest(baseUrl +'/transactions', null, accessToken);
}

const newTransaction = (transaction, type, accountNumber) => {
	let accessToken = getAccessToken();
	return postRequest(baseUrl +'/transactions/'+ accountNumber +'/'+ type, transaction, accessToken);
}