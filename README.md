An NPM library for integration with Red Bee Media Managed OTT platform.

## Installation

```
npm install enigma.io
```

## Authentication

Provide API key ID and secret with the environment variables `API_KEY_ID` and `API_KEY_SECRET`.

## API

### `mgmtApi.getEndUsers()`

Retrieve a list of end users.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const endUsers = await mgmtApi.getEndUsers();
console.log(endUsers);
```

### `mgmtApi.getProductOfferings()`

Get product offerings.

### `mgmtApi.getPurchases(accountId)`

Get end user account's active purchases.

### `mgmtApi.performPurchase(accountId, offeringId)`

Add a product offering to an account.

### `exposureApi.authenticate(username, password)`

Get an authentication response for a user.

## Run the tests

- create a `.env` file in the root of the project
- add `API_KEY_ID` and `API_KEY_SECRET` for the Management API
- add your `USERNAME` and `PASSWORD` to obtain session for the Exposure API
- run `npm test`
