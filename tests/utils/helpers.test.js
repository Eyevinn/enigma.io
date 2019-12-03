const helpers = require("../../src/utils/helpers");

describe("helpers", () => {
  describe("generateId", () => {
    it("should return an ID with 7 chars", () => {
      const id = helpers.generateId();
      expect(id.length).toBe(10);
    });
    it("should start with an underscore", () => {
      const id = helpers.generateId();
      expect(id[0]).toBe("_");
    });
    it("should generate new ID each call", () => {
      const firstId = helpers.generateId();
      const secondId = helpers.generateId();
      expect(firstId).not.toEqual(secondId);
    });
  });
});
