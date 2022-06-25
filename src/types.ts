export type CoinId = string | number;

export type TimePeriod =
  | "1h"
  | "3h"
  | "12h"
  | "24h"
  | "7d"
  | "30d"
  | "3m"
  | "1y"
  | "3y"
  | "5y";

export interface GetCryptosResponse {
  data: {
    stats: Stats;
    coins: Coin[];
  };
}

export interface GetCryptoDetailsResponse {
  data: {
    coin: CoinDetail;
  };
}

export interface GetCryptoHistoryResponse {
  data: {
    change: string;
    history: CoinHistory[];
  };
}

export interface GetCryptoHistoryArgs {
  coinId: CoinId;
  timePeriod: TimePeriod;
}

export interface GetNewsResponse {
  value: NewArticle[];
}

export interface GetNewsArgs {
  count: number;
  newsCategory: string;
}

export interface NewArticle {
  name: string;
  url: string;
  image: ArticleImage;
  provider: ArticleProvider[];
  description: string;
  datePublished: string;
  category?: string;
}

export interface ArticleImage {
  thumbnail: {
    width: number;
    height: number;
    contentUrl: string;
  };
}

export interface ArticleProvider {
  name: string;
  image: {
    thumbnail: {
      contentUrl: string;
    };
  };
}

export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  coinrankingUrl: string;
  "24hVolume": string;
}

export interface CoinDetail {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  numberOfMarkets: number;
  numberOfExchanges: number;
  "24hVolume": string;
  marketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  coinrankingUrl: string;
  tier: number;
  lowVolume: boolean;
  listedAt: number;
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  supply: {
    confirmed: boolean;
    total: string;
    circulating: string;
  };
  links: {
    name: string;
    type: string;
    url: string;
  }[];
}

export interface CoinHistory {
  price: string;
  timestamp: number;
}

export interface Stats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}
