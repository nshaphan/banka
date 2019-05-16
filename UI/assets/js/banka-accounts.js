document.addEventListener('DOMContentLoaded', function(e) {
	isLoggedIn();

	getAccounts()
	.then(res => {
		let accounts = res.data;
		let accountsHtml = '';
		console.log(accounts);
		accounts.map((account) => {
			
			let color = account.status == 'dormant'?'red':'green';
			accountsHtml +=`
				<li>
                    <div class="card">
                        <div class="row">
                            <div class="column acc-left">
                                    <img class="rounded" src="assets/user-192.png"/>
                            </div>
                            
                            <div class="column acc-right">
                                    <h3>${account.firstname} ${account.lastname}</h3>
                                    <h4>A/C: ${account.accountnumber}</h4>
                                    <span>${account.type} Account | since ${new Date(account.createdon).toDateString()}</span>
                                    | <span style="color: ${color};">${account.status}</span> 
                                    <div class="actions">
                                        <a href="bank-transactions.html">
                                            <button class="btn-action">Transactions</button></a>
                                        <button class="btn-action" onclick="alert('Please wait! Account is being deleted.')">Delete</button>
                                        <button class="btn-action" onclick="alert('Please wait! Account is being disactivated.')">Disactivate</button>
                                    </div>
                            </div>
                        </div>
                    </div>    
                </li>`;
		});
		console.log(accountsHtml);
		let listAccounts = document.getElementById('accounts-list');
		listAccounts.innerHTML = accountsHtml;
	})
});