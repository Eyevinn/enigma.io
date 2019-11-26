const authService = require("../../src/services/authService");

const EXPOSURE_API_ENDPOINT = "https://exposureapi.emp.ebsd.ericsson.net/v2";

describe("authService", () => {
  describe("authenticate", () => {
    const customerUnit = "Eyevinn";
    const businessUnit = "internal";
    let url = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/auth/login`;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    beforeEach(() => {
      url = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/auth/login`;
    });

    it("should give ok if correct login credentials", async () => {
      const result = await authService.authenticate({
        url,
        username,
        password
      });
      expect(result).not.toBeFalsy();
      expect(typeof result.sessionToken).toBe("string");
    });

    it("should give UNKNOWN_BUSINESS_UNIT if incorrect BU", async () => {
      url = `${EXPOSURE_API_ENDPOINT}/customer/${customerUnit}/businessunit/${customerUnit}/auth/login`;
      let errorThrown = false;
      try {
        await authService.authenticate({
          url,
          username,
          password
        });
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).toBeTruthy();
    });

    it("should throw error for incorrect credentials", async () => {
      let errorThrown = false;
      try {
        await authService.authenticate({
          url,
          username: password,
          password: username
        });
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).toBeTruthy();
    });
  });
});
