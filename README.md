An NPM library for integration with Red Bee Media Managed OTT platform.

## Installation

```
npm install @eyevinn/enigma.io
```

## Authentication

Provide API key ID and secret with the environment variables `API_KEY_ID` and `API_KEY_SECRET`.

## Management API

```js
const EnigmaIO = require("@eyevinn/enigma.io");
const managementApi = new EnigmaIO.ManagementAPI("Customer", "BusinessUnit");

// using red bee's stage environment

const managementApi = new EnigmaIO.ManagementAPI("Customer", "BusinessUnit", { environment: "stage"});
```

### Methods

#### Users

- [`getEndUsers`](src/api/mgmt.js#L37) Retrieve a list of end users.
- [`getEndUser`](src/api/mgmt.js#L47) Retrieve a specific end user.
- [`getEndUserById`](src/api/mgmt.js#l56) Retrieve a specific end user by their account id.
- [`createUser`](src/api/mgmt.js#65) Create a single end user.
- [`createUsers`](src/api/mgmt.js#L77) Bulk create users.
- [`setLabelsForUser`](src/api/mgmt.js#L87) Set labels on an existing user.

#### Products & Product Offerings

- [`getProductOfferings`](src/api/mgmt.js#L99) Retrieve a list of productOfferings.
- [`getProductOffering`](src/api/mgmt.js#L112) Retrieve a specific productOffering.
- [`setLabelsForProductOffering`](src/api/mgmt.js#L121) Set labels on an existing productOffering.

#### Purchases

- [`getPurchases`](src/api/mgmt.js#L131) Retrieve active purchases for an account.
- [`performPurchase`](src/api/mgmt.js#L140) Performs a purchase of a given productOffering for a given account.
- [`removePurchase`](src/api/mgmt.js#L150) Remove a purchased productOffering and its access from a given account.

#### Assets

- [`createAsset`](src/api/mgmt.js#L159) Create an asset

Where the metadata object should be constructed in the following format
```js
{
  "languages": [ "en" ],
  "en": {
    "description": "Walt rejects everyone who tries to help him with the cancer. Jesse tries his best to create Walt's meth, with the help of an old friend."
  },
  "studio": "Sony Pictures Television",
  "productionYear": "2019"
}
```

- [`linkAssets`](src/api/mgmt.js#L170) Create a link from srcAssetId to destAssetId.
- [`ingestVideo`](src/api/mgmt.js#L181) Ingest a video file to an asset. The URL to the video file must be accessible by the platform.
- [`publishAsset`](src/api/mgmt.js#L192) Add a product publication to an asset.
- [`unpublishAsset`](src/api/mgmt.js#210) Remove one single publication, or all publications, on an asset.
- [`createProduct`](src/api/mgmt.js#L222) Create a product in the platform
- [`getProducts`](src/api/mgmt.js#246) Get all products in the platform
- [`getProduct`](src/api/mgmt.js#255) Get a specific product in the platform

## Exposure API

```js
const EnigmaIO = require("@eyevinn/enigma.io");
const exposureApi = new EnigmaIO.ExposureAPI("Customer", "BusinessUnit");

// using red bee's stage environment

const exposureApi = new EnigmaIO.ExposureAPI("Customer", "BusinessUnit", { environment: "stage"});
```

### Methods

#### Authorization

- [`authenticate`](src/api/exposure.js#L28) Get an authenticated session for an end user

```js
const authResponse = await exposureApi.authenticate(username, password);
const sessionToken = authResponse.sessionToken;
```

#### Assets

- [`play`](src/api/exposure.js#L38) Get a medialocator, i.e. a manifest, to play the file

```js
const authResponse = await exposureApi.authenticate(username, password);
const sessionToken = authResponse.sessionToken;
const playResponse = await exposureApi.play(sessionToken, assetId);
const hlsFormat = playResponse.formats.find(a => a.format === "HLS");
if (hlsFormat) {
  const mediaLocator = hlsFormat.mediaLocator;
}
```

- [`getAssets`](src/api/exposure.js#L47) Get all assets of a specific asset type.
- [`getAsset`](src/api/exposure.js#L59) Get a specific asset by its asset ID.
- [`resolveSerie`](src/api/exposure.js#67) Get all assets for a serie and structured in a series/seasons/episodes structure.


## Run the tests

- create a `.env` file in the root of the project
- add `API_KEY_ID` and `API_KEY_SECRET` for the Management API
- add your `USERNAME` and `PASSWORD` to obtain session for the Exposure API
- run `npm test`
