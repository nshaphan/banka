document.addEventListener('DOMContentLoaded', function(e) {
    const btnAccCreate = document.getElementById('btn-acc-create');

    isLoggedIn();

    getAccounts()
        .then(res => {
            switch(res.status) {
                case 400:
                    alert(res.message);
                break;
                case 200:
                    let accounts = res.data;
                    let accountHtml = '';

                    accounts.map((account) => {
                        accountHtml +=`<li><a href="">#${account.accountnumber}</a></li>`;
                    });
                    let userAccounts = document.getElementById('user-accounts');
                    userAccounts.innerHTML = userAccounts.innerHTML + accountHtml;
                break;
            }
        })
        .catch(error => console.log(error));

    btnAccCreate.addEventListener("click", function(e) {
        e.preventDefault();
        accountCreate();
    });
});