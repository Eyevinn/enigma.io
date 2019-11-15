const fetch = require("node-fetch");
const debug = require("debug")("product-offerings-service");

const getOfferings = async ({ url, bearerToken }) => {
  let records = [];
  let response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` }
  });
  let json = await response.json();
  if (response.ok) {
    await records.push.apply(records, json);
    return records;
  } else {
    throw json.message;
  }
};

module.exports = {
  getOfferings,
};