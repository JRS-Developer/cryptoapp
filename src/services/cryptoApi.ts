import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { GetCryptoResponse } from "../types";
const { VITE_RAPID_API_KEY: API_KEY, VITE_RAPID_API_COINR_HOST: API_HOST } =
  import.meta.env;

const baseUrl = "https://coinranking1.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST,
};

const createRequest = (url: string): FetchArgs => {
  return { url, headers };
};

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getCryptos: build.query<GetCryptoResponse, number>({
      query: (count: number) => createRequest(`/coins`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
