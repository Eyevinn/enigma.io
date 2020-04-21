// API_KEY_ID =
// API_KEY_SECRET =

const EnigmaManagementAPI = require("./src/api/mgmt");
const ExposureAPI = require("./src/api/exposure");

module.exports = {
  ManagementAPI: EnigmaManagementAPI,
  ExposureAPI
};

// function setup(api) {
//   const APIs = {
//     mgmt: "./src/api/mgmt.js",
//     exposure: "./src/api/exposure.js"
//   };
//   const sdk = require(APIs[api]);
//   return sdk;
// }

// module.exports = setup;
