const fetch = require("node-fetch").default;
const uuid = require("uuid/v1");
const debug = require("debug")("ingest-service");
const templates = require("../utils/templates");
const utils = require("../utils/helpers");

const createAsset = async ({ url, title, bearerToken, metadata }) => {
  const id = uuid();
  const ingestRequestXML = templates.assetIngestXML({ id, title, metadata });
  debug(ingestRequestXML);

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/xml",
    },
    method: "POST",
    body: ingestRequestXML,
  });
  const ingestResponse = await response.json();
  if (response.ok) {
    debug(ingestResponse);
    return ingestResponse.internalAssetId;
  } else {
    debug(response.headers);
    throw ingestResponse.message;
  }
};

const linkAssets = async ({ url, srcAssetId, destAssetId, bearerToken }) => {
  const ingestRequestXML = templates.assetLinkXML({ srcAssetId, destAssetId });
  debug(ingestRequestXML);

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/xml",
    },
    method: "POST",
    body: ingestRequestXML,
  });
  const ingestResponse = await response.json();
  if (response.ok) {
    debug(ingestResponse);
    return ingestResponse.internalAssetId;
  } else {
    debug(response.headers);
    throw ingestResponse.message;
  }
};

const ingestVideo = async ({ url, assetId, videoUrl, bearerToken }) => {
  const id = uuid();
  const ingestRequestXML = templates.videoIngestXML({ id, videoUrl, assetId });

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/xml",
    },
    method: "POST",
    body: ingestRequestXML,
  });
  const ingestResponse = await response.json();
  if (response.ok) {
    debug(ingestResponse);
    return ingestResponse.internalMaterialId;
  } else {
    debug(response.headers);
    throw ingestResponse.message;
  }
};

const publishAsset = async ({
  url,
  assetId,
  productId,
  startDate,
  publicationDurationInYears,
  bearerToken,
}) => {
  const id = uuid();
  const endDate = utils.appendYearsToDate(
    startDate,
    publicationDurationInYears
  );
  const publicationXML = templates.publicationXML({
    id,
    assetId,
    productId,
    startDate,
    endDate,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
      "Content-Type": "application/xml",
    },
    method: "POST",
    body: publicationXML,
  });
  const publicationResponse = await response.json();
  if (response.ok) {
    debug(publicationResponse);
    return publicationResponse;
  } else {
    debug(response.headers);
    throw publicationResponse.message;
  }
};

const unpublishAsset = async ({ url, bearerToken }) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${bearerToken}`,
    },
    method: "DELETE",
  });
  const unpublishResponse = await response.json();
  if (response.ok) {
    debug(unpublishResponse);
    return unpublishResponse;
  } else {
    debug(response.headers);
    throw unpublishResponse.message;
  }
};

module.exports = {
  createAsset,
  linkAssets,
  ingestVideo,
  publishAsset,
  unpublishAsset,
};
