const ManagementAPI = require("./index.js")("mgmt");

const mgmtApi = new ManagementAPI("Eyevinn", "STSWE");

async function go() {
  const endUsers = await mgmtApi.getEndUsers();
  endUsers.forEach(endUser => {
    console.log(`${endUser.accountId}: ${endUser.details.emailAddress}`);
  });
}

go();
