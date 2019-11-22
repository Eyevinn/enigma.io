const debug = require("debug")("mgmt");
const base64 = require("base-64");

const endUserService = require("../services/endUserService");
const productOfferingsService = require("../services/productOfferingsService");
const ingestService = require("../services/ingestService");

const MGMT_API_ENDPOINT = "https://managementapi.emp.ebsd.ericsson.net";
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
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
    return await endUserService.getUsers({
      url,
      bearerToken: this.bearerToken,
      limit
    });
  }

  async getEndUser(username) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user/${username}`;
    return await endUserService.getUser({
      url,
      bearerToken: this.bearerToken
    });
  }

  async getProductOfferings() {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering`;
    return await productOfferingsService.getOfferings({
      url,
      bearerToken: this.bearerToken
    });
  }

  async getPurchases(accountId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase`;
    return await endUserService.getPurchases({
      url,
      bearerToken: this.bearerToken
    });
  }

  async performPurchase(accountId, offeringId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase/${offeringId}`;
    return await productOfferingsService.performPurchase({
      url,
      bearerToken: this.bearerToken
    });
  }

  async createAsset(title) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/asset`;
    return await ingestService.createAsset({
      url,
      title,
      bearerToken: this.bearerToken
    });
  }

  async ingestVideo(assetId, videoUrl) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/material`;
    return await ingestService.ingestVideo({
      url,
      assetId,
      videoUrl,
      bearerToken: this.bearerToken
    });
  }
}

module.exports = EnigmaManagementAPI;
