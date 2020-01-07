const MgmtAPI = require("../../src/api/exposure");

describe("Exposure api", () => {
  it("should use proper exposure url", async () => {
    const ProdMgmtApi = new MgmtAPI("Customer", "BusinessUnit");
    const StageMgmtApi = new MgmtAPI("Customer", "BusinessUnit", {
      environment: "stage"
    });
    expect(ProdMgmtApi.baseUrl).toBe(
      "https://exposureapi.emp.ebsd.ericsson.net/v2"
    );
    expect(StageMgmtApi.baseUrl).toBe(
      "https://psempexposureapi.ebsd.ericsson.net/v2"
    );
  });
});
