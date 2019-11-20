const entitlementService = require("../../src/services/entitlementService");
const authService = require("../../src/services/authService");

const EXPOSURE_API_ENDPOINT = "https://bsbu.enigmatv.io/v2";
const ASSET = "complex_vod_enc_82162E";

describe("entitlementService", () => {
  describe("play", () => {
    const customerUnit = "BSCU";
    const businessUnit = "BSBU";
    const authUrl = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/auth/login`;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const playUrl = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/entitlement/${ASSET}/play`;
    let sessionToken = undefined;

    beforeAll(async () => {
      const authResponse = await authService.authenticate({
        url: authUrl,
        username,
        password
      });
      if (!authResponse || !authResponse.sessionToken)
        throw new Error("Couldn't authorize");
      sessionToken = authResponse.sessionToken;
    });

    it("should respond with a hls manifest included", async () => {
      const result = await entitlementService.play({
        url: playUrl,
        sessionToken
      });
      expect(result).not.toBeFalsy();
      expect(result).toHaveProperty("formats");
      const hlsExists = result.formats.find(f => f.format === "HLS");
      expect(hlsExists).toBeTruthy();
    });
  });
});
