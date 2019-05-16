document.addEventListener('DOMContentLoaded', function(e) {
	isLoggedIn();

	getTransactions()
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
	                    <span class="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A/C: ${transaction.accountnumber}</span><br>
	                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Done by:</b> ${transaction.firstname}</span>
	                    <span style="color:grey">&nbsp;&nbsp;&nbsp;&nbsp;${new Date(transaction.createdon).toDateString()}</span>
	                </div>
	            </li>`;
		});

		let listTransactions = document.getElementById('transaction-list');
		listTransactions.innerHTML = transactionHtml;
	});
});