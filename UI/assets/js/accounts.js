const accountCreate = () => {
    let account = {};

    let status = document.getElementById('rdio-curr').checked;
    
    if (!checkCookie('access-token')) {
        alert('login first');
        window.location = 'index.html';
    }

    let accessToken = getAccessToken();

    if(status) {
        account.type = 'current';
    } else {
        account.type = 'savings';
    }

    postRequest(baseUrl +'/accounts', account, accessToken)
        .then(res => {
            switch(res.status) {
                case 400:
                    alert(res.message);
                break;
                case 200:
                    let data = res.data;
                    console.log(data);
                break;
            }
        })
        .catch(error => console.log(error));
}

const getAccounts = (data = null) => {
    let accessToken = getAccessToken();
    return getRequest(baseUrl + '/accounts', null, accessToken);
}

const getAccount = (accountNumber) => {
    let accessToken = getAccessToken();
    return getRequest(baseUrl + '/accounts/'+ accountNumber, null, accessToken);
}