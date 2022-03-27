import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { Coin, Stats as StatsInterface } from "index";
import { cryptoAxios } from "~/axios/custAxios";
import CryptocurrenciesComponent from "~/components/cryptocurrencies";
import { Typography } from "antd";
import { Link } from "@remix-run/react";

function Cryptocurrencies() {
  const data: { data: { stats: StatsInterface; coins: Coin[] } } =
    useLoaderData();
  const { coins } = data.data;
  return (
    <>
      <div className="home-heading-container">
        <Typography.Title
          level={2}
          className="home-title"
          style={{ textAlign: "center" }}
        >
          Cryptocurrencies in world
        </Typography.Title>
      </div>
      <CryptocurrenciesComponent coins={coins} />
    </>
  );
}

export default Cryptocurrencies;

export const loader: LoaderFunction = async () => {
  const data = await cryptoAxios.get("coins").then((res) => res.data);
  return data;
};
