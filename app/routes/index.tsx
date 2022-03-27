import millify from "millify";
import { Row, Col, Statistic, Typography } from "antd";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { cryptoAxios, newsAxios } from "~/axios/custAxios";
import { Link } from "@remix-run/react";
import Stats from "~/components/home/Stats";
import Cryptocurrencies from "~/components/cryptocurrencies";
import News from "~/components/news";
import { Coin, New, Stats as StatsInterface } from "index";

const { Title } = Typography;

export default function Index() {
  const {
    cryptoCoins,
    newsData,
  }: {
    cryptoCoins: { data: { stats: StatsInterface; coins: Coin[] } };
    newsData: { value: New[] };
  } = useLoaderData();

  const { stats, coins } = cryptoCoins.data;
  const { value: news } = newsData;

  return (
    <>
      <Stats stats={stats} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies coins={coins} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News news={news} coins={coins} />
    </>
  );
}
export const loader: LoaderFunction = async () => {
  const cryptoCoins = await cryptoAxios
    .get("coins", { params: { limit: 10 } })
    .then((res) => res.data);

  const newsData = await newsAxios
    .get("news/search", { params: { q: "Cryptocurrencies", count: 6 } })
    .then((res) => res.data);

  return { cryptoCoins, newsData };
};
