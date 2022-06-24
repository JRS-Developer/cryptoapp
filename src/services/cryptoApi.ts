import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { GetCryptoResponse } from "../types";

const baseUrl = "https://coinranking1.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "1507a2c8b4msh46eeba1afb45bb0p17841bjsna51bf80112b5",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
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
    getCryptos: build.query<GetCryptoResponse, void>({
      query: () => createRequest("/coins"),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
