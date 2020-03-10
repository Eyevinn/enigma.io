const fetch = require("node-fetch").default;

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

const getOffering = async ({ url, bearerToken }) => {
  let response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` }
  });
  let json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw json.message;
  }
};

const performPurchase = async ({ url, bearerToken }) => {
  let response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Basic ${bearerToken}` }
  });
  let json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw json.message;
  }
};

module.exports = {
  getOfferings,
  getOffering,
  performPurchase
};
