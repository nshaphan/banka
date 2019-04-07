const banka = {
    users: [
        {
            id: 1,
            email: 'user@banka.com',
            firstname: 'Shaphan',
            lastname: 'Nzabonimana',
            password: '123@bk',
            type: 'client',
            isAdmin: false,
            token: "45erkjherht45495783"
        }
    ],

    accounts: [
        {
            id: 1,
            accountNumber: '20183444095',
            createdOn: "12-05-2018",
            owner: 1,
            type: 'current',
            status: 'active',
            balance: '2000',
        }
    ]
}

export default banka;