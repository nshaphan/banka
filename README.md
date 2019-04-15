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

### POST /auth/signin
this endpoint is used to signin the user

### POST /accounts
this endpoint is used to create a new user

### PATCH /account/<accountNumber>
this enpoint is used to activate/deactivate bank account

### DELETE /accounts/<accountNumber>
this endpoint is used to delete the account

### POST /transactions/<accountNumber>/debit
this endpoint is used to debit an account

### POST /transactions/<accountNumber>/credit
this endpoint is used to credit an account

