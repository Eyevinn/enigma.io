const fetch = require("node-fetch");

const getAsset = async url => {
  const response = await fetch(url);
  const asset = await response.json();
  if (response.ok) {
    return asset;
  } else {
    throw asset.message;
  }
};

const getAllAssets = async url => {
  let assetList = [];
  let keepGoing = true;
  let page = 1;
  while (keepGoing) {
    let response = await fetch(`${url}?pageNumber=${page}&pageSize=100`);
    let json = await response.json();
    if (response.ok) {
      await assetList.push.apply(assetList, json.items);
      page += 1;
      if (json.items.length === 0) {
        keepGoing = false;
        return assetList;
      }
    } else {
      throw json.message;
    }
  }
};

module.exports = {
  getAsset,
  getAllAssets
};
