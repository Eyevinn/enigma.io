const ManagementAPI = require("./index.js")("mgmt");
const ExposureAPI = require("./index.js")("exposure");

const mgmtApi = new ManagementAPI("Eyevinn", "STSWE");
const exposureApi = new ExposureAPI("Eyevinn", "STSWE");

async function go() {
  const endUsers = await mgmtApi.getEndUsers();
  if (!endUsers) return;
  endUsers.forEach(endUser => {
    console.log(`${endUser.accountId}: ${endUser.details.emailAddress}`);
  });
}

async function getAssets() {
  let assets;
  try {
    assets = await exposureApi.getAssets();
  } catch (err) {
    console.log(err);
  }
  if (!assets) return;
  assets.forEach(asset => {
    console.log(asset.localized[0].title);
  });
}

getAssets();
