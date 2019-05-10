document.addEventListener('DOMContentLoaded', function(e) {
	isLoggedIn();

	let btnNewTransact = document.getElementById('new-transact');

	btnNewTransact.addEventListener("click", function(e) {
        e.preventDefault();
        let transaction = {};
		let type = '';
		let accountNumber = document.getElementById('account-number').value;
		let isDebitChecked = document.getElementById('rdio-debit').checked; 

		if(isDebitChecked) {
	        type = 'debit';
	    } else {
	        type = 'credit';
	    }

		transaction.amount = document.getElementById('amount').value;
		newTransaction(transaction, type, accountNumber)
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
	    });
});