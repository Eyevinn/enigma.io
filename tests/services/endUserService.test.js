const endUserService = require("../../src/services/endUserService");
const base64 = require("base-64");

const MGMT_API_ENDPOINT = "https://managementapi.emp.ebsd.ericsson.net/v2";
const customerUnit = "Eyevinn";
const businessUnit = "STSWE";
const apiKeyId = process.env.API_KEY_ID;
const apiKeySecret = process.env.API_KEY_SECRET;
const bearerToken =
  apiKeyId && apiKeySecret
    ? base64.encode(`${apiKeyId}:${apiKeySecret}`)
    : null;

describe("endUserService", () => {
  describe("getUsers", () => {
    it("should respond with a list of 5 users with limit 5", async () => {
      if (!bearerToken || !customerUnit || !businessUnit) return;
      const url = `${MGMT_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/enduseraccount/user`;
      const limit = 5;
      const usersResponse = await endUserService.getUsers({
        url,
        bearerToken,
        limit,
      });
      expect(usersResponse).toBeTruthy();
      expect(usersResponse.length).toBe(5);
    });

    it("should give UNKNOWN_BUSINESS_UNIT if incorrect BU", async () => {
      if (!bearerToken || !customerUnit || !businessUnit) return;
      const url = `${MGMT_API_ENDPOINT}/customer/${customerUnit}/businessunit/${customerUnit}/enduseraccount/user`;
      const limit = 5;
      let errorThrown = false;
      try {
        await endUserService.getUsers({
          url,
          bearerToken,
          limit,
        });
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).toBeTruthy();
    });

    it("should throw error for incorrect credentials", async () => {
      if (!bearerToken || !customerUnit || !businessUnit) return;
      const url = `${MGMT_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/enduseraccount/user`;
      const limit = 5;
      let errorThrown = false;
      try {
        await endUserService.getUsers({
          url,
          bearerToken: "12345",
          limit,
        });
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).toBeTruthy();
    });
  });
  describe("getUser", () => {
    it("should respond with a user object", async () => {
      if (!bearerToken || !customerUnit || !businessUnit) return;
      const username = "erik.hoffman@eyevinn.se";
      const url = `${MGMT_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/enduseraccount/user/${username}`;
      const singleUser = await endUserService.getUser({
        url,
        bearerToken: bearerToken,
      });
      expect(singleUser).toBeTruthy();
      expect(singleUser.details.username).toEqual(username);
      expect(singleUser.customer).toEqual(customerUnit);
      expect(singleUser.businessUnit).toEqual(businessUnit);
    });

    it("should give UNKNOWN_BUSINESS_UNIT if incorrect BU", async () => {
      if (!bearerToken || !customerUnit || !businessUnit) return;
      const username = "erik.hoffman@eyevinn.se";
      const url = `${MGMT_API_ENDPOINT}/customer/${customerUnit}/businessunit/${customerUnit}/enduseraccount/user/${username}`;
      let errorThrown = false;
      try {
        await endUserService.getUser({
          url,
          bearerToken: bearerToken,
        });
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).toBeTruthy();
    });

    it("should throw error for incorrect credentials", async () => {
      if (!bearerToken || !customerUnit || !businessUnit) return;
      const username = "erik.hoffman@eyevinn.se";
      const url = `${MGMT_API_ENDPOINT}/customer/${customerUnit}/businessunit/${businessUnit}/enduseraccount/user/${username}`;
      let errorThrown = false;
      try {
        await endUserService.getUser({
          url,
          bearerToken: "1234",
        });
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).toBeTruthy();
    });
  });
});
