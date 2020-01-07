const ExposureAPI = require("../../src/api/exposure");

describe("Exposure api", () => {
  it("should use proper exposure url", async () => {
    const ProdExposureApi = new ExposureAPI("Customer", "BusinessUnit");
    const StageExposureApi = new ExposureAPI("Customer", "BusinessUnit", {
      environment: "stage"
    });
    expect(ProdExposureApi.baseUrl).toBe(
      "https://exposureapi.emp.ebsd.ericsson.net/v2"
    );
    expect(StageExposureApi.baseUrl).toBe(
      "https://psempexposureapi.ebsd.ericsson.net/v2"
    );
  });
});
