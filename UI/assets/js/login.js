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
                    let data = res.data;
                    setCookie("access-token", data.token, 1);
                    if (checkCookie('access-token')) {
                        //window.location = 'user-dashboard.html'
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