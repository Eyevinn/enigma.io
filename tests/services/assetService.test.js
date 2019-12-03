const assetService = require("../../src/services/assetService");
const constants = require("../../src/utils/constants");

const EXPOSURE_API_ENDPOINT = "https://exposureapi.emp.ebsd.ericsson.net/v1";
const customerUnit = "Eyevinn";
const businessUnit = "STSWE";

describe("assetService", () => {
  describe("getAsset", () => {
    it("should return an asset if valid id", async () => {
      const assetId = "8cf36a3a-8a89-4e00-a502-c497d8ad9e8d_29C72F";
      const url = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/content/asset/${assetId}`;
      const asset = await assetService.getAsset(url);
      expect(asset).toBeTruthy();
      expect(typeof asset).toBe("object");
    });

    it("should return error if invalid id", async () => {
      const assetId = "error-id-not-valid-id";
      const url = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/content/asset/${assetId}`;
      try {
        await assetService.getAsset(url);
      } catch (error) {
        expect(error).toEqual("UNKNOWN_ASSET");
      }
    });
  });

  describe("getAllAssets", () => {
    it("should return a list of assets", async () => {

      const url = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/content/asset`;
      const assets = await assetService.getAllAssets({ url });
      expect(assets).toBeTruthy();
      expect(Array.isArray(assets)).toBe(true);
    });
  });
});
