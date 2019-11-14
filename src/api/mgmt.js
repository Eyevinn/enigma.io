const debug = require("debug")("mgmt");
const fetch = require("node-fetch");
const base64 = require("base-64");

const MGMT_API_ENDPOINT = "https://managementapi.emp.ebsd.ericsson.net/v2";
const apiKeyId = process.env.API_KEY_ID;
const apiKeySecret = process.env.API_KEY_SECRET;

class EnigmaManagementAPI {
  constructor(customerUnit, businessUnit) {
    debug("API_KEY_ID=%s, API_KEY_SECRET=*****", apiKeyId);
    this.customerUnit = customerUnit;
    this.businessUnit = businessUnit;

    this.bearerToken = base64.encode(`${apiKeyId}:${apiKeySecret}`);
  }

  async getEndUsers() {
    const url = `${MGMT_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
    const resp = await fetch(url, {
      headers: { Authorization: "Basic " + this.bearerToken }
    });
    const json = await resp.json();
    debug(json.totalCount);

    return json.endUsers;
  }
}

module.exports = EnigmaManagementAPI;
