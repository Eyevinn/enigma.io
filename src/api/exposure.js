//const debug = require("debug")("mgmt");

const EXPOSURE_API_ENDPOINT_PROD =
  "https://exposureapi.emp.ebsd.ericsson.net/v2";
const EXPOSURE_API_ENDPOINT_STAGE =
  "https://psempexposureapi.ebsd.ericsson.net/v2";
const authService = require("../services/authService");
const entitlementService = require("../services/entitlementService");
const assetService = require("../services/assetService");

class ExposureAPI {
  constructor(customerUnit, businessUnit, options) {
    this.customerUnit = customerUnit;
    this.businessUnit = businessUnit;
    options = {
      environment: "production",
      ...options
    };
    this.EXPOSURE_API_ENDPOINT =
      options.environment === "stage"
        ? EXPOSURE_API_ENDPOINT_STAGE
        : EXPOSURE_API_ENDPOINT_PROD;
  }

  async authenticate(username, password) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${this.EXPOSURE_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/auth/login`;
    return await authService.authenticate({
      url,
      username,
      password
    });
  }

  async play(sessionToken, assetId) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${this.EXPOSURE_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/entitlement/${assetId}/play`;
    return await entitlementService.play({
      url,
      sessionToken
    });
  }

  async getAssets(assetType = undefined) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${this.EXPOSURE_API_ENDPOINT.replace("v2", "v1")}/customer/${
      this.customerUnit
    }/businessunit/${this.businessUnit}/content/asset`;
    return await assetService.getAllAssets({
      url,
      ...(assetType && { assetType })
    });
  }

  async getAsset(assetId) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${this.EXPOSURE_API_ENDPOINT.replace("v2", "v1")}/customer/${
      this.customerUnit
    }/businessunit/${this.businessUnit}/content/asset/${assetId}`;
    return await assetService.getAsset(url);
  }

  async resolveSerie(serieId) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${this.EXPOSURE_API_ENDPOINT.replace("v2", "v1")}/customer/${
      this.customerUnit
    }/businessunit/${this.businessUnit}/content/asset/${serieId}`;
    return await assetService.resolveSerie(url);
  }
}

module.exports = ExposureAPI;
