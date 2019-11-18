const fetch = require("node-fetch");
const { machineId } = require("node-machine-id");
const debug = require("debug")("auth-service");

const authenticate = async ({ url, username, password }) => {
  const deviceId = await machineId();
  const authRequest = {
    username: username,
    credentials: {
      passwordTuples: [
        {
          algorithm: {
            algorithmName: "CLEAR"
          },
          value: password
        }
      ]
    },
    device: {
      deviceId: deviceId,
      name: "enigma.io CLI"
    }
  };
  debug(authRequest);
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(authRequest),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const auth = await response.json();
  if (response.ok) {
    return auth;
  } else {
    debug(auth);
    throw auth.message;
  }
};

module.exports = {
  authenticate
};
