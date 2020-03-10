const fetch = require("node-fetch").default;
const debug = require("debug")("entitlement-service");

const play = async ({ url, sessionToken }) => {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + sessionToken
    }
  });
  const playResponse = await response.json();
  if (response.ok) {
    return playResponse;
  } else {
    debug(playResponse);
    throw playResponse.message;
  }
};

module.exports = {
  play
};
