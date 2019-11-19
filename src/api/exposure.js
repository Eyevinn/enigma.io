//const debug = require("debug")("mgmt");

const EXPOSURE_API_ENDPOINT = "https://exposureapi.emp.ebsd.ericsson.net/v2";

const authService = require("../services/authService");
const entitlementService = require("../services/entitlementService");

class ExposureAPI {
  constructor(customerUnit, businessUnit) {
    this.customerUnit = customerUnit;
    this.businessUnit = businessUnit;
  }

  async authenticate(username, password) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${EXPOSURE_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/auth/login`;
    return await authService.authenticate({
      url,
      username,
      password
    });
  }

  async play(sessionToken, assetId) {
    if (!this.customerUnit || !this.businessUnit) return;
    const url = `${EXPOSURE_API_ENDPOINT}/customer/${this.customerUnit}/businessunit/${this.businessUnit}/entitlement/${assetId}/play`;
    return await entitlementService.play({
      url,
      sessionToken
    });
  }
}

module.exports = ExposureAPI;
