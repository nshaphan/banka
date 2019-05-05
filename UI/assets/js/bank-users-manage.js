document.addEventListener('DOMContentLoaded', function(e) {
	isLoggedIn();

	getUsers()
	.then(res => {
		let users = res.data;
		let usersHtml = '';
		
		users.map((user) => {
			
            let role = user.type;
            
            if(user.isadmin == true) {
                role = 'Admin';
            } else if(user.type == 'staff') {
                role = 'Cashier';
            }

			usersHtml +=`
				<li>
                    <div class="card">
                        <div class="row">
                            <div class="column acc-left">
                                <img class="rounded" src="assets/user-192.png"/>
                            </div>
                            <div class="column acc-right">
                                <h3>${user.firstname} ${user.lastname}</h3>
                                <span>${role} |</span>
                                <span>${user.email}</span> 
                                <div class="actions">
                                    <button class="btn-action" onclick="alert('Please wait! while user details are being loaded.')">View Details</button>
                                    <button class="btn-action" onclick="alert('Please wait! Account is being disactivated.')">Disactivate</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </li>`;
		});
		
		let listUsers = document.getElementById('users-list');
		listUsers.innerHTML = usersHtml;
	})
});