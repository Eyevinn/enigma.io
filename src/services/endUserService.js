const fetch = require("node-fetch").default;
const helpers = require("../utils/helpers");

const getUsers = async ({ url, bearerToken, limit = undefined }) => {
  let records = [];
  let keepGoing = true;
  let page = 1;
  while (keepGoing) {
    let response = await fetch(
      `${url}?pageNumber=${page}` +
        (limit ? `&pageSize=${limit < 100 ? limit : 100}` : ""),
      {
        headers: { Authorization: `Basic ${bearerToken}` }
      }
    );
    let json = await response.json();
    if (response.ok) {
      await records.push.apply(records, json.endUsers);
      page += 1;
      if (json.endUsers.length === 0 || (limit && records.length >= limit)) {
        keepGoing = false;
        return records;
      }
    } else {
      throw json.message;
    }
  }
};

const getUser = async ({ url, bearerToken }) => {
  const response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` }
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user.message;
  }
};

const createUser = async ({
  url,
  bearerToken,
  username,
  labels,
  authenticationType = "DEFAULT"
}) => {
  const userObject = {
    authenticationType,
    referenceId: username + helpers.generateId(),
    username,
    ...(labels && { labels })
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${bearerToken}`
    },
    body: JSON.stringify(userObject)
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user.message;
  }
};

const createUsers = async ({ url, bearerToken, users }) => {
  const bulk = {
    requests: users
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${bearerToken}`
    },
    body: JSON.stringify(bulk)
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user.message;
  }
};

const setLabels = async ({ url, bearerToken, labels /* key-val array */ }) => {
  const requestBody = {
    accountLabels: labels
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

const getPurchases = async ({ url, bearerToken }) => {
  const response = await fetch(url, {
    headers: { Authorization: `Basic ${bearerToken}` }
  });
  const purchases = await response.json();
  if (response.ok) {
    return purchases;
  } else {
    throw purchases.message;
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  createUsers,
  setLabels,
  getPurchases
};
