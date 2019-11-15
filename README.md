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

### `mgmtApi.getProductOfferings()`

Get product offerings.

### `mgmtApi.getPurchases(accountId)`

Get end user account's active purchases.

### `mgmtApi.performPurchase(accountId, offeringId)`

Add a product offering to an account.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const endUsers = await mgmtApi.getEndUsers();
console.log(endUsers);
```

