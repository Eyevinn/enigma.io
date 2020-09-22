const entitlementService = require("../../src/services/entitlementService");
const authService = require("../../src/services/authService");

const EXPOSURE_API_ENDPOINT = "https://exposureapi.emp.ebsd.ericsson.net/v2";
const ASSET = "51c2496e-1fff-4932-9cfb-553d4bfe104f_5F75E2";

describe("entitlementService", () => {
  describe("play", () => {
    const customerUnit = "Eyevinn";
    const businessUnit = "internal";
    const authUrl = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/auth/login`;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const playUrl = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/entitlement/${ASSET}/play`;
    let sessionToken = undefined;

    beforeAll(async () => {
      const authResponse = await authService.authenticate({
        url: authUrl,
        username,
        password,
      });
      if (!authResponse || !authResponse.sessionToken)
        throw new Error("Couldn't authorize");
      sessionToken = authResponse.sessionToken;
    });

    it("should respond with a hls manifest included", async () => {
      const result = await entitlementService.play({
        url: playUrl,
        sessionToken,
      });
      expect(result).not.toBeFalsy();
      expect(result).toHaveProperty("formats");
      const hlsExists = result.formats.find((f) => f.format === "HLS");
      expect(hlsExists).toBeTruthy();
    });
  });
});
