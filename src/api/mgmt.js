const debug = require("debug")("mgmt");
const base64 = require("base-64");

const endUserService = require("../services/endUserService");
const productOfferingsService = require("../services/productOfferingsService");
const ingestService = require("../services/ingestService");
const productsService = require("../services/productsService");

const BaseApi = require("../utils/baseApi");

const MGMT_API_ENDPOINT_PROD = "https://managementapi.emp.ebsd.ericsson.net";
const MGMT_API_ENDPOINT_STAGE =
  "https://psempempmanagementapi.ebsd.ericsson.net";
const env_apiKeyId = process.env.API_KEY_ID;
const env_apiKeySecret = process.env.API_KEY_SECRET;

class EnigmaManagementAPI extends BaseApi {
  constructor(customerUnit, businessUnit, options) {
    debug("API_KEY_ID=%s, API_KEY_SECRET=*****", env_apiKeyId);
    options = {
      environment: "production",
      ...options,
    };

    const url =
      options.environment === "stage"
        ? MGMT_API_ENDPOINT_STAGE
        : MGMT_API_ENDPOINT_PROD;

    const apiKeyId = options.API_KEY_ID ? options.API_KEY_ID : env_apiKeyId;

    const apiKeySecret = options.API_KEY_SECRET
      ? options.API_KEY_SECRET
      : env_apiKeySecret;

    super(url);
    this.customerUnit = customerUnit;
    this.businessUnit = businessUnit;
    this.bearerToken =
      apiKeyId && apiKeySecret
        ? base64.encode(`${apiKeyId}:${apiKeySecret}`)
        : null;
  }

  async getEndUsers(limit = undefined) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
    return await endUserService.getUsers({
      url,
      bearerToken: this.bearerToken,
      limit,
    });
  }

  async getEndUser(username) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user/${username}`;
    return await endUserService.getUser({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async getEndUserById(accountId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}`;
    return await endUserService.getUser({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async createUser(username, labels, authenticationType) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user`;
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
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/user/bulk`;
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
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/label`;
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
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering${query}`;
    return await productOfferingsService.getOfferings({
      url,
      bearerToken: this.bearerToken,
      onlyPurchasable,
    });
  }

  async getProductOffering(productOfferingId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering/${productOfferingId}`;
    return await productOfferingsService.getOffering({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async setLabelsForProductOffering(productOfferingId, keyValueLabel) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/productoffering/${productOfferingId}/labelrules`;
    return await productOfferingsService.setLabels({
      url,
      bearerToken: this.bearerToken,
      keyValueLabel,
    });
  }

  async getPurchases(accountId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase`;
    return await endUserService.getPurchases({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async performPurchase(accountId, offeringId, assetId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase/${offeringId}`;
    return await productOfferingsService.performPurchase({
      url,
      bearerToken: this.bearerToken,
      ...(assetId && { assetId }),
    });
  }

  async removePurchase(accountId, offeringId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v2/customer/${this.customerUnit}/businessunit/${this.businessUnit}/enduseraccount/account/${accountId}/purchase/${offeringId}`;
    return await productOfferingsService.removePurchase({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async createAsset(title, metadata) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/asset`;
    return await ingestService.createAsset({
      url,
      title,
      bearerToken: this.bearerToken,
      ...(metadata && { metadata }),
    });
  }

  async linkAssets(srcAssetId, destAssetId) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/asset`;
    return await ingestService.linkAssets({
      url,
      srcAssetId,
      destAssetId,
      bearerToken: this.bearerToken,
    });
  }

  async ingestVideo(assetId, videoUrl) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/material`;
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
    const url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/publication`;
    return await ingestService.publishAsset({
      url,
      assetId,
      productId,
      startDate,
      publicationDurationInYears,
      bearerToken: this.bearerToken,
    });
  }

  async unpublishAsset(
    assetId,
    publicationId = undefined,
    assetOnCustomerLevel = false
  ) {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    let url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/asset/${assetId}/publication`;
    if (publicationId) {
      url += `/${publicationId}`;
    }
    if (assetOnCustomerLevel) {
      url += "?level=CUSTOMER";
    }
    return await ingestService.unpublishAsset({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async createProduct(
    id,
    name,
    description = "",
    anonymousAllowed = false,
    entitlementRequired = true
  ) {
    const product = {
      id,
      externalId: id,
      name,
      description,
      anonymousAllowed,
      entitlementRequired,
    };
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/product`;
    return await productsService.createProduct({
      url,
      bearerToken: this.bearerToken,
      product,
    });
  }

  async getProducts() {
    if (!this.bearerToken || !this.customerUnit || !this.businessUnit) return;
    const url = `${this.baseUrl}/v1/customer/${this.customerUnit}/businessunit/${this.businessUnit}/product`;
    return await productsService.getProducts({
      url,
      bearerToken: this.bearerToken,
    });
  }

  async getProduct(productId) {
    const products = await this.getProducts();
    if (!products) return;
    return products.find((p) => p.externalId === productId);
  }
}

module.exports = EnigmaManagementAPI;
