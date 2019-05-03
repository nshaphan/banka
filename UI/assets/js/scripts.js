const baseUrl = 'http://localhost:3000/api/v1';

const postRequest = async (url, data, token = null) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'X-access-token': token
        }),
    });
    return await response.json();
}
const login = () => {
    let user = {};

    user.email = document.getElementById('txt-email').value;
    user.password = document.getElementById('txt-pass').value;

    console.log(user);

    let result = postRequest(baseUrl +'/auth/signin', user);
    console.log(result);
}

// let btnLogin = document.getElementById('btn-login');

document.addEventListener('DOMContentLoaded', function(e) {
    
    document.getElementById('login').addEventListener("click", function(e) {
        e.preventDefault();
        login();
    });
});