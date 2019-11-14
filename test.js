const ManagementAPI = require('./index.js')('mgmt');

const mgmtApi = new ManagementAPI('Eyevinn', 'STSWE');

async function run() {
  const endUsers = await mgmtApi.getEndUsers();
  console.log(endUsers);
}

run();