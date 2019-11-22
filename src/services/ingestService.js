const fetch = require("node-fetch");
const uuid = require("uuid/v1");
const debug = require("debug")("ingest-service");

const createAsset = async ({ url, title, bearerToken }) => {
  const id = uuid();
  const ingestRequestXML = 
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<publish-metadata xmlns="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1"' +
    '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    '  xsi:schemaLocation="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1/../xsd/publish-metadata.xsd">' +
    '<data>' +
    '  <asset>' +
    `    <id>${id}</id>` +
    '    <titleList>' +
    `      <title language="en">${title}</title>` +
    '    </titleList>' +
    '    <assetType>movie</assetType>' +
    '  </asset>' +
    '</data>' +
    '</publish-metadata>';

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
  const ingestRequestXML =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<publish-metadata xmlns="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1"' +
    '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    '  xsi:schemaLocation="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1/../xsd/publish-metadata.xsd">' +
    '<data>' +
    '  <material>' +
    `    <id>${id}</id>` +
    `    <materialRef>${videoUrl}</materialRef>` +
    `    <assetIdRef>${assetId}</assetIdRef>` +
    '    <DRMEnabled>false</DRMEnabled>' +
    '  </material>' +
    '</data>' +
    '</publish-metadata>';

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
