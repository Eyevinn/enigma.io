const fetch = require("node-fetch").default;

const getOfferings = async ({ url, bearerToken, onlyPurchasable }) => {
  let records = [];
  let response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` },
  });
  let json = await response.json();
  if (response.ok) {
    await records.push.apply(records, json);
    if (!onlyPurchasable) return records;
    return records.filter((p) => p.offeringPrice);
  } else {
    throw json.message;
  }
};

const getOffering = async ({ url, bearerToken }) => {
  let response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` },
  });
  let json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw json.message;
  }
};

const setLabels = async ({ url, bearerToken, keyValueLabel }) => {
  const [key, value] = keyValueLabel.split(",");
  const requestBody = {
    eq: {
      key: key,
      value: value,
    },
  };
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${bearerToken}`,
    },
    body: JSON.stringify(requestBody),
  });
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody;
  } else {
    throw responseBody.message;
  }
};

const performPurchase = async ({ url, bearerToken, assetId }) => {
  const conf = {
    method: "POST",
    headers: {
      ...(assetId && { "Content-Type": "application/json" }),
      Authorization: `Basic ${bearerToken}`,
    },
    ...(assetId && { body: JSON.stringify({ assetId }) }),
  };

  let response = await fetch(url, conf);
  let json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw json.message;
  }
};

const removePurchase = async ({ url, bearerToken }) => {
  let response = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Basic ${bearerToken}` },
  });
  if (response.ok) {
    return "ok";
  } else {
    throw "couldn't remove purchase";
  }
};

module.exports = {
  getOfferings,
  getOffering,
  setLabels,
  performPurchase,
  removePurchase,
};
