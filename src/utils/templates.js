const assetIngestXML = ({ id, title, metadata }) => {
  let metadataXML = "";
  if (metadata) {
    if (metadata.languages) {
      if (metadata[metadata.languages[0]].description) {
        metadataXML += "<descriptionList>";
        metadata.languages.forEach(lang => {
          metadataXML += `<description language="${lang}" length="medium">${metadata[lang].description}</description>`;
        });
        metadataXML += "</descriptionList>";
      }
    }
    if (metadata.studio) {
      metadataXML += `<studio>${metadata.studio}</studio>`;
    }
    if (metadata.productionYear) {
      metadataXML += `<productionYear>${metadata.productionYear}</productionYear>`;
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
    <publish-metadata xmlns="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1/../xsd/publish-metadata.xsd">
    <data>
      <asset>
        <id>${id}</id>
        <titleList>
          <title language="en" >${title}</title>
        </titleList>
        ${metadataXML}
        <assetType>movie</assetType>
      </asset>
    </data>
    </publish-metadata>
  `;
};

const videoIngestXML = ({ id, videoUrl, assetId }) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <publish-metadata xmlns="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://video-metadata.emp.ebsd.ericsson.net/publish-metadata/v1/../xsd/publish-metadata.xsd">
    <data>
      <material>
        <id>${id}</id>
        <materialRef>${videoUrl}</materialRef>
        <assetIdRef>${assetId}</assetIdRef>
        <DRMEnabled>false</DRMEnabled>
      </material>
    </data>
    </publish-metadata>
  `;
};

module.exports = {
  assetIngestXML,
  videoIngestXML
};
