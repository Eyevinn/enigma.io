// API_KEY_ID =
// API_KEY_SECRET =

function setup(api) {
  const APIs = {
    mgmt: "./src/api/mgmt.js"
  };
  const sdk = require(APIs[api]);
  return sdk;
}

module.exports = setup;
