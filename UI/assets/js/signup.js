const signup = () => {
    let user = {};

    user.firstname = document.getElementById('txt-fname').value;
    user.lastname = document.getElementById('txt-lname').value;
    user.email = document.getElementById('txt-email').value;
    user.password = document.getElementById('txt-pass').value;

    postRequest(baseUrl +'/auth/signup', user)
        .then(res => {
            switch(res.status) {
                case 400:
                    alert(res.message);
                break;
                case 200:
                    let data = res.data;
                    setCookie("access-token", data.token, 1);
                    if (checkCookie('access-token')) {
                        window.location = 'user-dashboard.html'
                    }
                break;
            }
        })
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', function(e) {
    const btnSignUp = document.getElementById('btn-signup');
    btnSignUp.addEventListener("click", function(e) {
        e.preventDefault();
        signup();
    });
});