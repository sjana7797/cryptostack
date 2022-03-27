import axios from "axios";

export const cryptoAxios = axios.create({
  baseURL: "https://coinranking1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    "X-RapidAPI-Key": "807c839306mshc47a32b37f22b64p1e432cjsn55752ca1ed51",
  },
});

export const newsAxios = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com",
  params: { safeSearch: "Off", textFormat: "Raw" },
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    "X-RapidAPI-Key": "807c839306mshc47a32b37f22b64p1e432cjsn55752ca1ed51",
  },
});
