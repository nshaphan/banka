const banka = {
    users: [
        {
            id: 1,
            email: 'user@banka.com',
            firstname: 'Shaphan',
            lastname: 'Nzabonimana',
            password: '12345@bk',
            type: 'client',
            isAdmin: false,
        },
        {
            id: 2,
            email: 'admin@banka.com',
            firstname: 'kwizera',
            lastname: 'Eric',
            password: '12345@bk',
            type: 'staff',
            isAdmin: true,
        },
        {
            id: 3,
            email: 'cashier@banka.com',
            firstname: 'Angel',
            lastname: 'Umutoni',
            password: '12345@bk',
            type: 'staff',
            isAdmin: true,
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
        },
        {
            id: 1,
            accountNumber: '20183444096',
            createdOn: "12-05-2018",
            owner: 1,
            type: 'current',
            status: 'active',
            balance: '2000',
        }
    ],

    transactions: [
        {
            id: 1,
            createdOn: '12-05-2018',
            type: 'debit',
            accountNumber: '20183444095',
            cashier: 1,
            amount: 3000,
            oldBalance: 5000,
            newBalance: 2000
        }
    ]
}

export default banka;