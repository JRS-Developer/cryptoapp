import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { GetNewsArgs, GetNewsResponse } from "../types";

const { VITE_RAPID_API_KEY: API_KEY, VITE_RAPID_API_NEWS_HOST: API_HOST } =
  import.meta.env;

const headers = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST,
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news";

const createRequest = (url: string): FetchArgs => {
  return { url, headers };
};

export const cryptoNewApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getCryptoNews: build.query<GetNewsResponse, GetNewsArgs>({
      query: ({ count, newsCategory }) =>
        createRequest(
          `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewApi;
