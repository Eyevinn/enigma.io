const assetIngestXML = ({ id, title }) => {
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
