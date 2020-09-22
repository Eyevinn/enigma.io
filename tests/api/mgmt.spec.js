const MgmtAPI = require("../../src/api/mgmt");

describe("MGMT api", () => {
  it("should use proper exposure url", async () => {
    const ProdMgmtApi = new MgmtAPI("Customer", "BusinessUnit");
    const StageMgmtApi = new MgmtAPI("Customer", "BusinessUnit", {
      environment: "stage"
    });
    expect(ProdMgmtApi.baseUrl).toBe(
      "https://managementapi.emp.ebsd.ericsson.net"
    );
    expect(StageMgmtApi.baseUrl).toBe(
      "https://psempempmanagementapi.ebsd.ericsson.net"
    );
  });
});
