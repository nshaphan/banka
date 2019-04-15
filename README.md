[![Coverage Status](https://coveralls.io/repos/github/chaphan/banka/badge.svg)](https://coveralls.io/github/chaphan/banka) [![Build Status](https://travis-ci.org/chaphan/banka.svg?branch=master)](https://travis-ci.org/chaphan/banka) [![Maintainability](https://api.codeclimate.com/v1/badges/ac136a7dbfdd7bce1962/maintainability)](https://codeclimate.com/github/chaphan/banka/maintainability)

# Banka

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.

## Getting Started
Get Banka project running on your PC you need to clone this repo, and make sure you have Latest Version of NodeJS Installed.

After you have to run the following npm commands to get the system up and running.

```
// installing required node modules
npm init

// running the server in development mode
npm run server:watch

// building the ploject for deployment
npm run build

// running the server in production mode
npm run start
```

## Testing the poject

```
// running test
npm run test
```

## API Documentation

all endpoint can be accessed from the following base url:
https://banka-ap.herokuapp.com/api/v1/

### POST /auth/signup
this endpoint is used to signup the user

example request body
```
{
	"email": "shaphan@banka.com",
	"firstname": "shaphan"
	"lastname": "nzabonimana"
	"password": "123@bk"
	"type": "client"
	"isadmin":false
}
```


### POST /auth/signin
this endpoint is used to signin the user
example request body
```
{
	"email": "shaphan@banka.com"
	"password": "123@bk"
}
```

### POST /accounts?token=<token>
this endpoint is used to create a new user, example token: 45erkjherht45495783

example url

```
/accounts?token=45erkjherht45495783
```

example request body

```
{
	"accountNumber": "20183444095",
    "type": "current",
    "balance": 2000,
}
```


### PATCH /account/<accountNumber>
this enpoint is used to activate/deactivate bank account

example request, example account number: 20183444095 
```
/account/20183444095
```

### DELETE /accounts/<accountNumber>
this endpoint is used to delete the account

example request, example account number: 20183444095
```
/accounts/20183444095
```

### POST /transactions/<accountNumber>/debit?token=<token>
this endpoint is used to debit an account

example account number: 20183444095
example token: 45erkjherht45495783

example request url, 
```
/accounts/20183444095/debit?token=45erkjherht45495783
```

request body
```
{
	amount: 400
}
```



### POST /transactions/<accountNumber>/credit
this endpoint is used to credit an account

example account number: 20183444095
example token: 45erkjherht45495783

example request url, 
```
/accounts/20183444095/debit?token=45erkjherht45495783
```

request body
```
{
	amount: 500
}
```
