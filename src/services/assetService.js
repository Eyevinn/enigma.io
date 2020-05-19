const fetch = require("node-fetch").default;
const constants = require("../utils/constants");

const getAsset = async (url) => {
  const response = await fetch(url);
  const asset = await response.json();
  if (response.ok) {
    return asset;
  } else {
    throw asset.message;
  }
};

const getAllAssets = async ({ url, onlyPublished, assetType }) => {
  let assetList = [];
  let keepGoing = true;
  let page = 1;
  while (keepGoing) {
    let response = await fetch(
      `${url}?pageNumber=${page}&pageSize=100&fieldSet=ALL&onlyPublished=${onlyPublished}${
        assetType ? "&assetType=" + assetType : ""
      }`,
      {
        headers: {
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
      }
    );
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

const resolveSerie = async (url) => {
  const tvShow = {};
  const serie = await getAsset(url);
  if (serie.type !== constants.AssetTypes.TV_SHOW) return;
  tvShow.info = serie;
  const seasonsUrl = `${url}/season`;
  const seasons = await getSeasonsForSerie(seasonsUrl);
  if (seasons.items.length === 0) return;
  tvShow.seasons = seasons.items;
  const episodesRequests = [];
  for (let i = 0; i < seasons.items.length; i++) {
    let episodesUrl = `${seasonsUrl}/${i + 1}/episode`;
    episodesRequests.push(getEpisodesForSeason(episodesUrl));
  }
  const seasonEpisodes = await Promise.all(episodesRequests);
  if (!seasonEpisodes.length === 0) return;
  for (let i = 0; i < seasonEpisodes.length; i++) {
    tvShow.seasons[0].episodes = seasonEpisodes[i].items;
  }
  return tvShow;
};

const getSeasonsForSerie = async (url) => {
  const response = await fetch(url);
  const seasons = await response.json();
  if (response.ok) {
    return seasons;
  } else {
    throw seasons.message;
  }
};

const getEpisodesForSeason = async (url) => {
  const response = await fetch(url);
  const episodes = await response.json();
  if (response.ok) {
    return episodes;
  } else {
    throw episodes.message;
  }
};

module.exports = {
  getAsset,
  getAllAssets,
  resolveSerie,
};
