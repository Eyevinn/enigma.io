const fetch = require("node-fetch");
const uuid = require("uuid/v1");
const debug = require("debug")("ingest-service");
const templates = require("../utils/templates");

const createAsset = async ({ url, title, bearerToken }) => {
  const id = uuid();
  const ingestRequestXML = templates.assetIngestXML({ id, title });

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/xml"
    },
    method: "POST",
    body: ingestRequestXML
  });
  const ingestResponse = await response.json();
  if (ingestResponse.internalAssetId) {
    return ingestResponse.internalAssetId;
  } else {
    throw ingestResponse.message;
  }
};

const ingestVideo = async ({ url, assetId, videoUrl, bearerToken }) => {
  const id = uuid();
  const ingestRequestXML = templates.videoIngestXML({ id, videoUrl, assetId });

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/xml"
    },
    method: "POST",
    body: ingestRequestXML
  });
  const ingestResponse = await response.json();
  if (ingestResponse.internalAssetId) {
    return ingestResponse.internalAssetId;
  } else {
    throw ingestResponse.message;
  }
};

module.exports = {
  createAsset,
  ingestVideo
};
