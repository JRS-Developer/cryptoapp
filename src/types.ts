export interface GetCryptoResponse {
  data: {
    stats: Stats;
    coins: Coin[];
  };
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

export interface Stats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}
