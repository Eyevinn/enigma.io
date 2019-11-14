An NPM library for integration with Red Bee Media Managed OTT platform.

## Installation

```
npm install enigma.io
```

## API

### `mgmtApi.getEndUsers()`

Retrieve a list of end users

```
const ManagementAPI = require('enigma.io')('mgmt');
const mgmtApi = new ManagementAPI('Customer', 'BusinessUnit');
mgmtApi.getEndUsers().then(endUsers => {
  console.log(endUsers);
});
```

