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
      limit,
    });
  }

  async getEndUser(username) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user/${username}`;
    return await endUserService.getUser({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async createUser(username, labels, authenticationType) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
    return await endUserService.createUser({
      url,
      bearerToken: this.bearerToken,
      username,
      ...(labels && { labels }),
      ...(authenticationType && { authenticationType }),
    });
  }

  async createUsers(users) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user/bulk`;
    return await endUserService.createUsers({
      url,
      bearerToken: this.bearerToken,
      users,
    });
  }

  async setLabelsForUser(username, labels) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const user = await this.getEndUser(username);
    const accountId = user.accountId;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/label`;
    return await endUserService.setLabels({
      url,
      bearerToken: this.bearerToken,
      labels,
    });
  }

  async getProductOfferings(labelRule = undefined, onlyPurchasable = false) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const query = labelRule
      ? `?labelFiltering=true&labelFilter=${labelRule}`
      : `?labelFiltering=false`;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering${query}`;
    return await productOfferingsService.getOfferings({
      url,
      bearerToken: this.bearerToken,
      onlyPurchasable,
    });
  }

  async getProductOffering(productOfferingId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering/${productOfferingId}`;
    return await productOfferingsService.getOffering({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async setLabelsForProductOffering(productOfferingId, keyValueLabel) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering/${productOfferingId}/labelRules`;
    return await productOfferingsService.setLabels({
      url,
      bearerToken: this.bearerToken,
      keyValueLabel,
    });
  }

  async getPurchases(accountId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase`;
    return await endUserService.getPurchases({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async performPurchase(accountId, offeringId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase/${offeringId}`;
    return await productOfferingsService.performPurchase({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async removePurchase(accountId, offeringId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase/${offeringId}`;
    return await productOfferingsService.removePurchase({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async createAsset(title, metadata) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/asset`;
    return await ingestService.createAsset({
      url,
      title,
      bearerToken: this.bearerToken,
      ...(metadata && { metadata }),
    });
  }

  async linkAssets(srcAssetId, destAssetId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/asset`;
    return await ingestService.linkAssets({
      url,
      srcAssetId,
      destAssetId,
      bearerToken: this.bearerToken,
    });
  }

  async ingestVideo(assetId, videoUrl) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/material`;
    return await ingestService.ingestVideo({
      url,
      assetId,
      videoUrl,
      bearerToken: this.bearerToken,
    });
  }

  async publishAsset(
    assetId,
    productId,
    startDate = new Date(),
    publicationDurationInYears = 1
  ) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${MGMT_API_ENDPOINT}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/publication`;
    return await ingestService.publishAsset({
      url,
      assetId,
      productId,
      startDate,
      publicationDurationInYears,
      bearerToken: this.bearerToken,
    });
  }
}

module.exports = EnigmaManagementAPI;
