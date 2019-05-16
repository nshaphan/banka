const login = () => {
    let user = {};

    user.email = document.getElementById('txt-email').value;
    user.password = document.getElementById('txt-pass').value;

    postRequest(baseUrl +'/auth/signin', user)
        .then(res => {
            switch(res.status) {
                case 400:
                    alert(res.message);
                break;
                case 200:
                    let user = res.data;
                    setCookie("access-token", user.token, 1);
                    isLoggedIn();

                    switch(user.role) {
                        case 'client':
                            window.location = 'user-dashboard.html';
                        break;
                        case 'cashier':
                        case 'admin':
                            window.location = 'bank-accounts.html'
                        break;
                    }
                break;
            }
        })
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', function(e) {
    const btnLogin = document.getElementById('login');
    btnLogin.addEventListener("click", function(e) {
        e.preventDefault();
        login();
    });
});