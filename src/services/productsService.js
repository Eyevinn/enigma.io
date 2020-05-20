const fetch = require("node-fetch").default;

const getProducts = async ({ url, bearerToken }) => {
  let records = [];
  let response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` },
  });
  let json = await response.json();
  if (response.ok) {
    await records.push.apply(records, json);
    return records;
  } else {
    throw json.message;
  }
};

const createProduct = async ({ url, bearerToken, product }) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(product),
  });
  const productResponse = await response.json();
  if (response.ok) {
    return productResponse;
  } else {
    throw productResponse.message;
  }
};

module.exports = {
  getProducts,
  createProduct,
};
