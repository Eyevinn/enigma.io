const debug = require("debug")("mgmt");
const base64 = require("base-64");

const endUserService = require("../services/endUserService");
const productOfferingsService = require("../services/productOfferingsService");

const MGMT_API_ENDPOINT = "https://managementapi.emp.ebsd.ericsson.net/v2";
const apiKeyId = process.env.API_KEY_ID;
const apiKeySecret = process.env.API_KEY_SECRET;

class EnigmaManagementAPI {
  constructor(customerUnit, businessUnit) {
    debug("API_KEY_ID=%s, API_KEY_SECRET=*****", apiKeyId);
    this.customerUnit = customerUnit;
    this.businessUnit = businessUnit;

    this.bearerToken =
      apiKeyId && apiKeySecret
        ? base64.encode(`${apiKeyId}:${apiKeySecret}`)
        : null;
  }

  async getEndUsers(limit = undefined) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
    return await endUserService.getUsers({
      url,
      bearerToken: this.bearerToken,
      limit
    });
  }

  async getEndUser(username) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user/${username}`;
    return await endUserService.getUser({
      url,
      bearerToken: this.bearerToken
    });
  }

  async getProductOfferings() {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering`;
    return await productOfferingsService.getOfferings({
      url,
      bearerToken: this.bearerToken
    });
  }
}

module.exports = EnigmaManagementAPI;
