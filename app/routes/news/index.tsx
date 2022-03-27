import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { cryptoAxios, newsAxios } from "~/axios/custAxios";
import { New } from "index";
import NewsComponent from "../../components/news";
import { Typography } from "antd";
import { useState } from "react";

function News() {
  const {
    newsData,
    data,
  }: {
    newsData: { value: New[] };
    data: { data: { stats: StatsInterface; coins: Coin[] } };
  } = useLoaderData();
  const { value: news } = newsData;
  const { coins } = data.data;
  const [category, setCategory] = useState("Cryptocurrencies");
  return (
    <>
      <div className="home-heading-container">
        <Typography.Title
          level={2}
          className="home-title"
          style={{ textAlign: "center" }}
        >
          News
        </Typography.Title>
      </div>
      <NewsComponent news={news} coins={coins} />
    </>
  );
}

export default News;

export const loader: LoaderFunction = async () => {
  const newsData = await newsAxios
    .get("news/search", { params: { q: "Cryptocurrencies" } })
    .then((res) => res.data);

  const data = await cryptoAxios.get("coins").then((res) => res.data);
  return { newsData, data };
};
