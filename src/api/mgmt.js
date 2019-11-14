const debug = require('debug')('mgmt');
const fetch = require('node-fetch');
const base64 = require('base-64');

const MGMT_API_ENDPOINT = 'https://managementapi.emp.ebsd.ericsson.net/v2';
const apiKeyId = process.env.API_KEY_ID;
const apiKeySecret = process.env.API_KEY_SECRET;

class EnigmaManagementAPI {
  constructor(customerUnit, businessUnit) {
    debug('API_KEY_ID=%s, API_KEY_SECRET=*****', apiKeyId);
    this.customerUnit = customerUnit;
    this.businessUnit = businessUnit;

    this.bearerToken = base64.encode(`${apiKeyId}:${apiKeySecret}`);
  }

  getEndUsers() {
    return new Promise((resolve, reject) => {
      const url = `${MGMT_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
      fetch(url, { headers: { 'Authorization': 'Basic ' + this.bearerToken } })
      .then(resp => resp.json())
      .then(json => {
        debug(json);
        resolve(json.endUsers);
      });
    });
  }
}

module.exports = EnigmaManagementAPI;