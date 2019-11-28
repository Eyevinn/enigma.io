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

Get product offerings for a service.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const offerings = await mgmtApi.getProductOfferings();
console.log(offerings);
```

### `mgmtApi.getPurchases(accountId)`

Get end user account's active purchases.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const purchases = await mgmtApi.getPurchases(accountId);
console.log(purchases);
```

### `mgmtApi.performPurchase(accountId, offeringId)`

Add a product offering to an account.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const transaction = await mgmtApi.performPurchase(accountId, offeringId);
console.log(transaction);
```

### `mgmtApi.createUser(username, labels)`

Create a user with labels (optional).

### `mgmtApi.createUsers(users)`

Create a batch of users.

### `mgmtApi.createAsset(title, [metadata])`

Create an empty asset with title.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const assetId = await mgmtApi.createAsset("Title of an asset");
```

Create an empty asset with title and metadata.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const assetId = await mgmtApi.createAsset("Title of an asset", {
  "languages": [ "en" ],
  "en": {
    "description": "Walt rejects everyone who tries to help him with the cancer. Jesse tries his best to create Walt's meth, with the help of an old friend."
  },
  "studio": "Sony Pictures Television",
  "productionYear": "2019"
});
```

### `mgmtApi.linkAssets(srcAssetId, destAssetId)`

Create a link from `srcAssetId` to `destAssetId`.

const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const assetId = await mgmtApi.linkAssets(srcAssetId, destAssetId);

### `mgmtApi.ingestVideo(assetId, videoUrl)`

Ingest a video file to an asset. The URL to the video file must be accessible by the platform.

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
const materialId = await mgmtApi.ingestVideo(assetId, "https://this.is.where.my.video.is/video.mp4");
```

### `exposureApi.authenticate(username, password)`

Get an authentication response for a user.

## Run the tests

- create a `.env` file in the root of the project
- add `API_KEY_ID` and `API_KEY_SECRET` for the Management API
- add your `USERNAME` and `PASSWORD` to obtain session for the Exposure API
- run `npm test`
