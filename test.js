const ManagementAPI = require('./index.js')('mgmt');

const mgmtApi = new ManagementAPI('Eyevinn', 'STSWE');

mgmtApi.getEndUsers().then(endUsers => {
  console.log(endUsers);
});