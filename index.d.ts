export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: number;
  price: number;
  btcPrice: string;
  listedAt: number;
  change: number;
  rank: number;
  coinrankingUrl: string;
  "24hVolume": number;
  numberOfMarkets?: number;
  numberOfExchanges?: number;
  allTimeHigh?: { price: number; timestamp: number };
  supply?: { circulating: number; total: number };
  links: [Link];
  description: string;
}

export interface Stats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
}
interface Image {
  thumbnail: { contentUrl: string; height?: number; width?: number };
}

export interface New {
  datePublished: string;
  description: string;
  name: string;
  provider: { name: string; image: Image }[];
  image: Image;
  url: string;
}

interface Link {
  name: string;
  url: string;
  type: string;
}

export interface History {
  price: number;
  timestamp: number;
}
