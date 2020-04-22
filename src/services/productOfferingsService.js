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

const setLabels = async ({ url, bearerToken, keyValueLabel }) => {
  const [key, value] = keyValueLabel.split(",");
  const requestBody = {
    eq: {
      key: key,
      value: value
    }
  };
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${bearerToken}`
    },
    body: JSON.stringify(requestBody)
  });
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody;
  } else {
    throw responseBody.message;
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

const removePurchase = async ({ url, bearerToken }) => {
  let response = await fetch(url, {
    method: "DELETE",
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
  setLabels,
  performPurchase,
  removePurchase
};
