import HTMLReactParser from "html-react-parser";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { LoaderFunction } from "remix";
import { cryptoAxios } from "~/axios/custAxios";
import { Coin, History } from "index";
import LineChart from "~/components/crpto/LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const {
    coinData,
    coinHistoryData,
  }: {
    coinData: { data: { coin: Coin } };
    coinHistoryData: { data: { change: string; history: [History] } };
  } = useLoaderData();

  const { coin } = coinData.data;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coin.price && millify(coin.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coin["24hVolume"] && millify(coin["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coin.marketCap && millify(coin.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(coin.allTimeHigh?.price || 0)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },

    {
      title: "Total Supply",
      value: `$ ${millify(coin.supply?.total || 0)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(coin.supply?.circulating || 0)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const navigate = useNavigate();

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coinData?.data?.coin.name} ({coinData?.data?.coin.uuid}) Price
        </Title>
        <p>
          {coin.name} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => {
          navigate(`/crypto/${coin.uuid}?timePeriod=${value}`);
        }}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistoryData}
        currentPrice={millify(coin.price)}
        coinName={coin.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coin.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {coin.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {coin.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coin.name}?
          </Title>
          {HTMLReactParser(coin.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coin.name} Links
          </Title>
          {coin.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetails;

export const loader: LoaderFunction = async ({
  params,
  request,
}: {
  params: { id: string };
  request: { url: any };
}) => {
  const id = params.id;
  const url = new URL(request.url);
  const timePeriod = url.searchParams.get("timePeriod") || "7d";
  const coinData = await cryptoAxios(`coin/${id}`).then((res) => res.data);

  const coinHistoryData = await cryptoAxios(`coin/${id}/history`, {
    params: { timePeriod },
  }).then((res) => res.data);

  return { coinData, coinHistoryData };
};
