document.addEventListener('DOMContentLoaded', function(e) {
	
	isLoggedIn();

	getAccounts()
	.then(res => {
		// list all user accounts
		let accounts = res.data;
        let accountHtml = '';

        accounts.map((account) => {
            accountHtml +=`<li><a href="">#${account.accountnumber}</a></li>`;
        });

        // update accounts list contents
        let userAccounts = document.getElementById('user-accounts');
        userAccounts.innerHTML = userAccounts.innerHTML + accountHtml;

        // display default account info
		let account = res.data[0];
		let accountInfo = `<h3>${account.firstname} ${account.lastname}</h3>
                   <h4>A/C: ${account.accountnumber}</h4>
                   <span>${account.type} Account | since ${new Date(account.createdon).toDateString()}</span>
                   | <span style="color: green;">${account.status}</span>`;

        // update account info details
        let divInfo = document.getElementById('account-info');
        let spanBalance = document.getElementById('bal');
        
        // set account balance
        divInfo.innerHTML = accountInfo; 
        spanBalance.innerHTML = `<b>Balance: $${account.balance}</b>`;

        return account.accountnumber;
	})
	.then(accountNumber => getAccountTransactions(accountNumber))
	.then(res => {
		let transactions = res.data;
		let transactionHtml = '';

		transactions.map((transaction) => {
			let color = transaction.type == 'debit'?'red':'green';
			let type = transaction.type == 'debit'?'-':'+';
			let comment = 'Generic comment goes here';

			transactionHtml +=`
				<li>
	                <div class="card">
	                    <span class="tr-type-${color}">${type} $${transaction.amount}</span><br>
	                    <span class="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${comment}</span><br>
	                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Balance:</b> $${transaction.newbalance}</span>
	                    <span style="color:grey">&nbsp;&nbsp;&nbsp;&nbsp;${new Date(transaction.createdon).toDateString()}</span>
	                </div>
	            </li>`;
		});

		let listTransactions = document.getElementById('transaction-list');
		listTransactions.innerHTML = transactionHtml;
	});
});